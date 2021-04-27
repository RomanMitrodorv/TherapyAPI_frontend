import { User } from './user.model';
import { Article } from './article.model';

export class ArticleComment {
    public id: number;
    public author: User;
    public text: string;
    public isReply: boolean;
    public date: Date;
    public parentComment: ArticleComment;
}