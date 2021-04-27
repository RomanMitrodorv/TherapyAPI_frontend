import { Injectable } from '@angular/core';
import { BaseHttpService } from './base-http.service';
import { HttpClient } from '@angular/common/http';
import { CreatePaymentRequest } from '../models/request';
import { CreatePaymentResponse } from '../models/response';

@Injectable()
export class PaymentsService extends BaseHttpService {
    constructor (http: HttpClient) {
        super(http);
    }

    public createPayment(request: CreatePaymentRequest) {
        return this.post<CreatePaymentResponse>(`/payments`, request);
    }
}