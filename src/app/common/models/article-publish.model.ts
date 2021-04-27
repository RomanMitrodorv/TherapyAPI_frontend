import { ArticleModerationStatus } from '../enums';
import { Article } from './article.model';

export class ArticlePublish {
    public id: number;
    public article: Article;
    public status: ArticleModerationStatus;
    public message: string;
}