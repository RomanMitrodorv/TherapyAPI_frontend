import { User } from './user.model';
import { Session } from './session.model';
import { SpecialistSession } from './specialist-session.model';

export class ClientCard {
    public id: number;
    public user: User;
    public sessions: SpecialistSession[];
    public problemsCount: number;
    public paid: number;
    public refundsCount: number;
    public averageScore: number;
}