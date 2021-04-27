import { Pipe, PipeTransform } from '@angular/core';
import { Article } from '../models';

@Pipe({
    name: 'filterArticles',
    pure: false
})
export class FilterArticlesPipe implements PipeTransform {
    transform(articles: Article[], activeIndex: number) {
        if (!articles || !articles.length || activeIndex === -1) {
            return articles;
        }

        let result = [...articles];

        if (activeIndex === 0) {
            result.splice(0, 1);
            
            return result;
        }

        //result.splice(activeIndex - 1, 2);
        
        result.splice(0, activeIndex + 1);

        return result;
    }
}