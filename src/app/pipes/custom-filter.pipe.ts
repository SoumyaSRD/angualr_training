import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'customFilter',
    pure: false,
    standalone: true
})
export class CustomFilterPipe implements PipeTransform {
    transform(data: any, searchTerms: string, keys: string[] = []) {
        if (!data) return [];
        if (!searchTerms) return data;

        searchTerms = searchTerms.toLowerCase();
        if (keys.length === 0) {
            return data.filter((item: any) => {
                return JSON.stringify(item).toLowerCase().includes(searchTerms);
            });
        } else {
            return data.filter((eachItem: any) => {
                return keys.some(key => {
                    const value = eachItem[key];
                    return value && value.toString().toLowerCase().includes(searchTerms);
                });
            });
        }
    }
}