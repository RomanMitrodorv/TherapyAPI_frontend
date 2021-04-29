import { PaymentType } from '../../enums';

export class CreatePaymentRequest {
    public amount: number;
    public type: PaymentType;
    public sessionID?: number;
}

export class RegisterDOWebhookRequest {
    public sessionId?: number;
    public orderId: string;
}
