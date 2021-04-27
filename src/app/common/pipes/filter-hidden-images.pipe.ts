import { Pipe, PipeTransform } from '@angular/core';
import { ProblemImage } from '../models';

@Pipe({
    name: 'filterHiddenImages',
    pure: false
})
export class FilterHiddenImagesPipe implements PipeTransform {
    transform(items: ProblemImage[]) {
        if (!items) {
            return items;
        }

        return items.filter((item) => !item.isHidden);
    }
}