import { User } from 'src/app/common/models';

export class SuperadminPatient {
    public user: User;
    public totalSessionsCount: number;
    public totalRefunds: number;
    public totalPaid: number;
    public averageScore: number;
}