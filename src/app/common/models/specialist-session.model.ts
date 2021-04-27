import { User } from './user.model';
import { SessionStatus } from '../enums';
import { Specialist } from './specialist.model';
import { Problem } from './problem.model';
import { Review } from './review.model';

export class SpecialistSession {
    public specialist: Specialist;
    public sessionID: number;
    public sessionDate: Date;
    public sessionStatus: SessionStatus;
    public client: User;
    public problem: Problem;
    public review: Review;
    public problemText: string;
    public reviewScore: number;
    public reward: number;
    public isSpecialistClose: boolean;
    public isClientClose: boolean;
    public specialistCloseDate: Date;
    public clientCloseDate: Date;
    public sessionImagesCount: number;
    public totalImagesCount: number;
    public sessionResourcesCount: number;
    public totalResourcesCount: number;
    public isAllImagesFromOneSpecialist: boolean;
    public isAllResourcesFromOneSpecialist: boolean;
}