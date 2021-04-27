import { ResponseModel } from './response.model';
import { Review } from '../review.model';

export class ReviewsResponse extends ResponseModel {
    public positiveReviews: Review[];
    public neutralReviews: Review[];
    public negativeReviews: Review[];
    public rating: number;
}