import { Problem } from './problem.model';
import { Specialist } from './specialist.model';
import { SessionStatus } from '../enums';

export class Session {
    public id: number;
    public problem: Problem;
    public specialist: Specialist;
    public status: SessionStatus;
    public reward: number;
    public date: Date;
    public reviewScore: number;
    public isSpecialistClose: boolean;
    public isClientClose: boolean;
    public specialistCloseDate: Date;
    public clientCloseDate: Date;
}