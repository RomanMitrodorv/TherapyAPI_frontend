import { Injectable } from '@angular/core';
import { BaseHttpService } from './base-http.service';
import { HttpClient } from '@angular/common/http';
import { DataResponse, WebinarResponse } from '../models/response';

@Injectable()
export class PublicService extends BaseHttpService {
    constructor (http: HttpClient) {
        super(http);
    }

    public sendWebinarForm(request: FormData) {
        return this.post<DataResponse<WebinarResponse>>('/webinarForm', request);
    } 
}