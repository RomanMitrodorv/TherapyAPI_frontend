import { Injectable } from '@angular/core';
import { BaseHttpService } from './base-http.service';
import { HttpClient } from '@angular/common/http';
import { UploadFileRequest, UploadFileFormRequest, GetFileByUrlRequest } from '../models/request';
import { DataResponse } from '../models/response';
import { File } from '../models';
import { LocalStorageHelper } from '../helpers';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable()
export class FilesService extends BaseHttpService {
    constructor (http: HttpClient, private sanitizer: DomSanitizer) {
        super(http);
    }

    public getFile(fileID: number) {
        return this.get<DataResponse<File>>(`/files/${fileID}`);
    }

    public getInternalFileByUrl(url: string) {
        const req: GetFileByUrlRequest = { url };

        return this.post<DataResponse<File>>('/files/url/get', req)
            .map(response => response.data);
    }

    public getFileFromUrl(url: string) {
        return this.getFileByUrl(url);
    }

    public uploadFile(request: UploadFileRequest) {
        return this.post<DataResponse<File>>('/files', request);
    }

    public uploadFileForm(request: UploadFileFormRequest) {
        const formData: FormData = new FormData();
        formData.append('file', request.file);

        return this.post<DataResponse<File>>('/files/form', formData);
    }
}