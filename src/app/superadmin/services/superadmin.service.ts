import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseHttpService } from 'src/app/common/services';
import { ChangeCustomerRoleRequest, CreateVideoReviewRequest, GetAdministratorsListRequest, GetPatientsListRequest, GetSearchListRequest, GetSpecialistsListRequest } from '../models/request';
import { GetAdministratorsListResponse, GetPatientListResponse, GetSearchListResponse, GetSpecialistsListResponse } from '../models/response';
import { DataResponse, ListResponse, ResponseModel } from 'src/app/common/models/response';
import { SuperadminCustomerCard } from '../models';
import { Article, ArticlePublish, ClientVideoReview, File } from 'src/app/common/models';
import { GetList, UpdateArticlePublishRequest } from 'src/app/common/models/request';

@Injectable()
export class SuperadminService extends BaseHttpService {
    constructor(http: HttpClient) {
        super(http);
    }

    public getPatientsList(query: GetPatientsListRequest) {
        const url = `/superadmin/customers/patients?pageSize=${query.pageSize}&pageNumber=${query.pageNumber}&sortBy=${query.sortBy}&orderBy=${query.orderBy}&searchQuery=${query.searchQuery}`;
        return this.get<GetPatientListResponse>(url);
    }

    public getSpecialistsList(query: GetSpecialistsListRequest) {
        const url = `/superadmin/customers/specialists?pageSize=${query.pageSize}&pageNumber=${query.pageNumber}&sortBy=${query.sortBy}&orderBy=${query.orderBy}&searchQuery=${query.searchQuery}`;
        return this.get<GetSpecialistsListResponse>(url);
    }

    public getAdministratorsList(query: GetAdministratorsListRequest) {
        const url = `/superadmin/customers/administrators?pageSize=${query.pageSize}&pageNumber=${query.pageNumber}&orderBy=${query.orderBy}&searchQuery=${query.searchQuery}`;
        return this.get<GetAdministratorsListResponse>(url);
    }

    public getCustomer(customerID: number) {
        return this.get<DataResponse<SuperadminCustomerCard>>(`/superadmin/customers/${customerID}`)
            .map(response => response.data);
    }

    public changeCustomerRole(request: ChangeCustomerRoleRequest, customerID: number) {
        return this.put<DataResponse<SuperadminCustomerCard>>(`/superadmin/customers/${customerID}/role`, request)
            .map(response => response.data);
    }

    public getVideoReviews(query: GetList) {
        return this.get<ListResponse<ClientVideoReview>>('/superadmin/reviews/video');
    }

    public createVideoReview(request: CreateVideoReviewRequest) {
        return this.post<DataResponse<ClientVideoReview>>('/superadmin/reviews/video', request)
            .map(response => response.data);
    }

    public editVideoReview(request: CreateVideoReviewRequest, reviewID: number) {
        return this.put<DataResponse<ClientVideoReview>>(`/superadmin/reviews/video/${reviewID}`, request)
            .map(response => response.data);
    }

    public deleteVideoReview(reviewID: number) {
        return this.delete<ResponseModel>(`/superadmin/reviews/video/${reviewID}`);
    }

    public getVideoFiles(query: GetSearchListRequest) {
        return this.get<GetSearchListResponse<File>>(`/superadmin/files/video?pageSize=${query.pageSize}&pageNumber=${query.pageNumber}&searchQuery=${query.searchQuery}`);
    }

    public getImageFiles(query: GetSearchListRequest) {
        return this.get<GetSearchListResponse<File>>(`/superadmin/files/image?pageSize=${query.pageSize}&pageNumber=${query.pageNumber}&searchQuery=${query.searchQuery}`);
    }

    public deleteFile(fileID: number) {
        return this.delete<ResponseModel>(`/superadmin/files/${fileID}`);
    }

    public getArticles(query: GetList) {
        return this.get<ListResponse<ArticlePublish>>(`/superadmin/articles/publish?pageSize=${query.pageSize}&pageNumber=${query.pageNumber}`);
    }

    public getArticle(publishID: number) {
        return this.get<DataResponse<ArticlePublish>>(`/superadmin/articles/publish/${publishID}`);
    }

    public updateArticlePublish(request: UpdateArticlePublishRequest, publishID: number) {
        return this.patch<DataResponse<ArticlePublish>>(`/superadmin/articles/publish/${publishID}`, request);
    }
}