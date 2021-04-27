import { UserRole } from 'src/app/common/enums';
import { SpecialistSession } from 'src/app/common/models';

export class SuperadminCustomerCard {
    public userID: number;
    public fullName: string;
    public phoneNumber: string;
    public role: UserRole;
    public sessions: SpecialistSession[];
    public problemsCount: number;
    public refundsCount: number;
    public spendOrEarned: number;
}