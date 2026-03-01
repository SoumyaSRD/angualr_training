import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { AuthService, ToastService } from '@app/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  styleUrl: './dashboard.scss',
  templateUrl: './dashboard.html',
})
export class Dashboard implements OnInit {
  readonly authService = inject(AuthService);
  private readonly toastService = inject(ToastService);

  ngOnInit(): void {
    this.toastService.success('Welcome to your dashboard!');
  }
}