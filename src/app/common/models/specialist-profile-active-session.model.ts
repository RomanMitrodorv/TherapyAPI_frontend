import { Session } from './session.model';
import { ClientCard } from './client-card.model';

export class SpecialistProfileActiveSession {
    public session: Session;
    public client: ClientCard;
    public imagesCount: number;
    public resourcesCount: number;
}