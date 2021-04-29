import { ResponseModel } from './response.model';

export class SuccessPaymentResponse extends ResponseModel {
    public RedirectUrl: string;
}