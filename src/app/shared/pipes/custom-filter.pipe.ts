import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customFilter',
  pure: false,
  standalone: true,
})
export class CustomFilterPipe implements PipeTransform {
  transform(data: any, searchTerms: string, keys: string[] = []): any {
    if (!data) return [];
    if (!searchTerms) return data;
    const terms = searchTerms.toLowerCase();
    if (keys.length === 0) {
      return data.filter((item: any) =>
        JSON.stringify(item).toLowerCase().includes(terms)
      );
    }
    return data.filter((item: any) =>
      keys.some((key) => {
        const value = item[key];
        return value != null && String(value).toLowerCase().includes(terms);
      })
    );
  }
}
