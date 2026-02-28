import { CommonModule } from '@angular/common';
import { Component, input, output, computed, signal } from '@angular/core';

export interface Column<T = unknown> {
    key: keyof T | string;
    header: string;
    sortable?: boolean;
    width?: string;
    cell?: (row: T) => string;
}

export interface Sort {
    column: string;
    direction: 'asc' | 'desc';
}

@Component({
    selector: 'app-data-table',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="card">
      <div class="table-responsive">
        <table class="table table-hover mb-0">
          <thead>
            <tr>
              @if (selectable()) {
                <th class="text-center" style="width: 40px;">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      [checked]="isAllSelected()"
                      (change)="toggleSelectAll()"
                    />
                  </div>
                </th>
              }
              @for (column of columns(); track column.key) {
                <th
                  [style.width]="column.width"
                  [class.cursor-pointer]="column.sortable"
                  (click)="column.sortable && sort(column.key.toString())"
                >
                  <div class="d-flex align-items-center gap-1">
                    {{ column.header }}
                    @if (column.sortable) {
                      <i class="bi small" [class]="getSortIcon(column.key.toString())"></i>
                    }
                  </div>
                </th>
              }
              @if (actions()) {
                <th class="text-end" style="width: 100px;">Actions</th>
              }
            </tr>
          </thead>
          <tbody>
            @for (row of paginatedData(); track $index) {
              <tr
                [class.table-active]="isSelected(row)"
                (click)="rowClick.emit(row)"
              >
                @if (selectable()) {
                  <td class="text-center" (click)="$event.stopPropagation()">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        [checked]="isSelected(row)"
                        (change)="toggleSelect(row)"
                      />
                    </div>
                  </td>
                }
                @for (column of columns(); track column.key) {
                  <td>
                    @if (column.cell) {
                      {{ column.cell(row) }}
                    } @else {
                      {{ getCellValue(row, column.key) }}
                    }
                  </td>
                }
                @if (actions()) {
                  <td class="text-end" (click)="$event.stopPropagation()">
                    <ng-content select="[actions]"></ng-content>
                  </td>
                }
              </tr>
            } @empty {
              <tr>
                <td
                  [attr.colspan]="totalColumns()"
                  class="text-center text-muted py-4"
                >
                  <i class="bi bi-inbox fs-4 d-block mb-2"></i>
                  {{ emptyMessage() }}
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      @if (showPagination() && totalPages() > 1) {
        <div class="card-footer d-flex justify-content-between align-items-center">
          <div class="text-muted small">
            Showing {{ startItem() }} to {{ endItem() }} of {{ data().length }} entries
          </div>
          <nav aria-label="Table pagination">
            <ul class="pagination pagination-sm mb-0">
              <li class="page-item" [class.disabled]="currentPage() === 1">
                <button class="page-link" (click)="goToPage(currentPage() - 1)">
                  <i class="bi bi-chevron-left"></i>
                </button>
              </li>
              @for (page of visiblePages(); track page) {
                <li class="page-item" [class.active]="page === currentPage()">
                  <button class="page-link" (click)="goToPage(page)">{{ page }}</button>
                </li>
              }
              <li class="page-item" [class.disabled]="currentPage() === totalPages()">
                <button class="page-link" (click)="goToPage(currentPage() + 1)">
                  <i class="bi bi-chevron-right"></i>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      }
    </div>
  `,
    styles: [`
    .cursor-pointer {
      cursor: pointer;
    }
    
    .table th {
      font-weight: 600;
      text-transform: uppercase;
      font-size: 0.75rem;
      letter-spacing: 0.5px;
    }
    
    .table tbody tr {
      cursor: pointer;
    }
  `]
})
export class DataTableComponent<T extends Record<string, unknown>> {
    // Inputs
    data = input<T[]>([]);
    columns = input<Column<T>[]>([]);
    selectable = input(false);
    actions = input(false);
    showPagination = input(true);
    pageSize = input(10);
    emptyMessage = input('No data available');
    trackByFn = input<(index: number, item: T) => unknown>((index, item) => index);

    // Outputs
    rowClick = output<T>();
    selectionChange = output<T[]>();
    sortChange = output<Sort>();

    // State
    readonly currentPage = signal(1);
    readonly sortState = signal<Sort | null>(null);
    readonly selectedItems = signal<Set<T>>(new Set());

    // Computed
    readonly sortedData = computed(() => {
        let data = [...this.data()];
        const sort = this.sortState();

        if (sort) {
            data.sort((a, b) => {
                const aVal = String(this.getCellValue(a, sort.column));
                const bVal = String(this.getCellValue(b, sort.column));

                if (aVal < bVal) return sort.direction === 'asc' ? -1 : 1;
                if (aVal > bVal) return sort.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }

        return data;
    });

    readonly paginatedData = computed(() => {
        if (!this.showPagination()) return this.sortedData();

        const start = (this.currentPage() - 1) * this.pageSize();
        const end = start + this.pageSize();
        return this.sortedData().slice(start, end);
    });

    readonly totalPages = computed(() =>
        Math.ceil(this.data().length / this.pageSize())
    );

    readonly visiblePages = computed(() => {
        const total = this.totalPages();
        const current = this.currentPage();
        const pages: number[] = [];

        let start = Math.max(1, current - 2);
        let end = Math.min(total, start + 4);

        if (end - start < 4) {
            start = Math.max(1, end - 4);
        }

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        return pages;
    });

    readonly startItem = computed(() =>
        this.data().length === 0 ? 0 : (this.currentPage() - 1) * this.pageSize() + 1
    );

    readonly endItem = computed(() =>
        Math.min(this.currentPage() * this.pageSize(), this.data().length)
    );

    readonly totalColumns = computed(() => {
        let count = this.columns().length;
        if (this.selectable()) count++;
        if (this.actions()) count++;
        return count;
    });

    readonly isAllSelected = computed(() => {
        const data = this.paginatedData();
        return data.length > 0 && data.every(row => this.selectedItems().has(row));
    });

    // Methods
    getCellValue(row: T, key: keyof T | string): unknown {
        return row[key as keyof T];
    }

    sort(column: string): void {
        const current = this.sortState();
        let direction: 'asc' | 'desc' = 'asc';

        if (current?.column === column) {
            direction = current.direction === 'asc' ? 'desc' : 'asc';
        }

        this.sortState.set({ column, direction });
        this.sortChange.emit({ column, direction });
    }

    getSortIcon(column: string): string {
        const sort = this.sortState();
        if (sort?.column !== column) return 'bi-arrow-down-up text-muted';
        return sort.direction === 'asc' ? 'bi-arrow-up' : 'bi-arrow-down';
    }

    goToPage(page: number): void {
        if (page >= 1 && page <= this.totalPages()) {
            this.currentPage.set(page);
        }
    }

    isSelected(row: T): boolean {
        return this.selectedItems().has(row);
    }

    toggleSelect(row: T): void {
        const selected = new Set(this.selectedItems());
        if (selected.has(row)) {
            selected.delete(row);
        } else {
            selected.add(row);
        }
        this.selectedItems.set(selected);
        this.selectionChange.emit(Array.from(selected));
    }

    toggleSelectAll(): void {
        const data = this.paginatedData();
        const selected = new Set(this.selectedItems());
        const allSelected = this.isAllSelected();

        data.forEach(row => {
            if (allSelected) {
                selected.delete(row);
            } else {
                selected.add(row);
            }
        });

        this.selectedItems.set(selected);
        this.selectionChange.emit(Array.from(selected));
    }
}
