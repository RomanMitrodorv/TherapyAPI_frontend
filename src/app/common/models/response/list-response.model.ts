import { ArticlesSorter } from 'src/app/articles/components/articles/articles-sorter.enum';
import { SpecialistsSorter } from 'src/app/specialists/components/specialists/specialists-sorter.enum';
import { SortBy } from '../../enums';
import { Article } from '../article.model';
import { Specialist } from '../specialist.model';
import { ResponseModel } from './response.model';

export class ListResponse<T> extends ResponseModel {
    public data: T[];
    public pageSize: number;
    public currentPage: number;
    public totalPages: number;
    public totalItems: number;
}

export class SpecialistsListResponse extends ListResponse<Specialist> {
    public sortBy: SpecialistsSorter;
    public orderBy: SortBy;
}

export class ArticlesListResponse extends ListResponse<Article> {
    public sortBy: ArticlesSorter;
    public orderBy: SortBy;
}