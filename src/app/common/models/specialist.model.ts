import { User } from './user.model';
import { Review } from './review.model';

export class Specialist {
    public id: number;
    public price: number;
    public rating: number;
    public description: string;
    public reviews: Review[];
    public user: User;
}

export class SpecialistView extends Specialist {
    public positiveReviews: Review[];
    public neutralReviews: Review[];
    public negativeReviews: Review[];
}