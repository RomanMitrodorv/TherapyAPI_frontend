import { Injectable } from '@angular/core';
import { BaseHttpService } from './base-http.service';
import { HttpClient } from '@angular/common/http';
import { CreatePaymentRequest, RegisterDOWebhookRequest } from '../models/request';
import { CreatePaymentResponse, ResponseModel } from '../models/response';
import { SuccessPaymentResponse } from '../models/response/success-payment-response';

@Injectable()
export class PaymentsService extends BaseHttpService {
    constructor (http: HttpClient) {
        super(http);    
    }

    public createPayment(request: CreatePaymentRequest) {
        return this.post<CreatePaymentResponse>(`/payments`, request);
    }

    public successPayment(request: RegisterDOWebhookRequest) {
        return this.post<SuccessPaymentResponse>(`/payments/success`, request);
    }

    public failPayments(orderId: string) {
        return this.post(`/payments/fail/${orderId}`, {});
    }
}