import { Injectable } from '@angular/core';
import { BaseHttpService } from './base-http.service';
import { HttpClient } from '@angular/common/http';
import { DataResponse, ResponseModel, GetVerificationResponse } from '../models/response';
import { User, UserVerificationRequest, File } from '../models';
import { ChangeSettingsRequest, VerificationRequest } from '../models/request';

@Injectable()
export class UsersService extends BaseHttpService {
    constructor (http: HttpClient) {
        super(http);
    }

    public getUserInfo() {
        return this.get<DataResponse<User>>('/users/info')
            .map(response => response.data);
    }

    public getUserVerification() {
        return this.get<GetVerificationResponse>('/users/verification')
            .map(response => response.isVerified);
    }

    public getUserVerificationRequest() {
        return this.get<DataResponse<UserVerificationRequest>>('/users/verification/request')
            .map(response => response.data);
    }

    public userVerification(request: VerificationRequest) {
        const formData: FormData = new FormData();
        formData.append('document', request.document);
        formData.append('selfie', request.selfie);

        return this.post<ResponseModel>('/users/verification/request', formData);
    }

    public uploadAvatarImage(file: globalThis.File) {
        const formData = new FormData();
        formData.append('file', file);

        return this.put<DataResponse<File>>(`/users/avatar`, formData)
            .map(response => response.data);
    }

    public changeUserSettings(request: ChangeSettingsRequest) {
        const formData = new FormData();
        formData.append('firstName', request.firstName);
        formData.append('lastName', request.lastName);
        formData.append('avatar', request.avatar);

        return this.put<DataResponse<User>>('/users/settings', formData)
            .map(response => response.data);
    }
}