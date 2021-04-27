import { GetList } from './get-list.model';
import { ReviewType } from '../../enums';

export class GetReviews extends GetList {
    public type: string;
}