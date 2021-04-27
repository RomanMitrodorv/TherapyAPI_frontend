import { ArticlesSorter } from 'src/app/articles/components/articles/articles-sorter.enum';
import { SpecialistsSorter } from 'src/app/specialists/components/specialists/specialists-sorter.enum';
import { SortBy } from '../../enums';

export class GetList {
    public pageNumber: number;
    public pageSize: number;
}

export class GetSpecialistsList extends GetList {
    public sortBy: SpecialistsSorter;
    public orderBy: SortBy;
}

export class GetArticlesList extends GetList {
    public sortBy: ArticlesSorter;
    public orderBy: SortBy;
}