import { User } from './user.model';
import { Article } from './article.model';

export class ArticleLike {
    public id: number;
    public author: User;
}