import { Session } from './session.model';

export class Review {
    public id: number;
    public score: number;
    public text: string;
    public session: Session;
}