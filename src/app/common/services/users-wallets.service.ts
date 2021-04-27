import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseHttpService } from './base-http.service';
import { DataResponse } from '../models/response';
import { UserWallet } from '../models';

@Injectable()
export class UsersWalletsService extends BaseHttpService {

    constructor (http: HttpClient) {
        super(http);
    }

    public getMyWallet() {
        return this.get<DataResponse<UserWallet>>(`/wallet`);
    }
}