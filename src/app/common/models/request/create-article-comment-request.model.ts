export class CreateArticleCommentRequest {
    public isReply: boolean;
    public parentCommentID: number;
    public text: string;
}