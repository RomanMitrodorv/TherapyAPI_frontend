import { ArticleModerationStatus } from '../../enums';

export class UpdateArticlePublishRequest {
    public status: ArticleModerationStatus;
    public message: string;
}