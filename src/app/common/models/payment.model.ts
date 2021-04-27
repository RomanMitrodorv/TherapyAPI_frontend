import { User } from './user.model';
import { PaymentType, PaymentStatus } from '../enums';

export class Payment {
    public id: number;
    public user: User;
    public amount: number;
    public orderID: string;
    public type: PaymentType;
    public status: PaymentStatus;
}