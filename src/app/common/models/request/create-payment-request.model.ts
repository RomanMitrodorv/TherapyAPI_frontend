import { PaymentType } from '../../enums';

export class CreatePaymentRequest {
    public amount: number;
    public type: PaymentType;
    public sessionID?: number;
}
