import { Injectable } from '@angular/core';
import { BaseHttpService } from './base-http.service';
import { HttpClient } from '@angular/common/http';
import { DataResponse, ListResponse, SpecialistsListResponse } from '../models/response';
import { Specialist, Review } from '../models';
import { GetList, GetReviews, GetSpecialistsList } from '../models/request';

@Injectable()
export class SpecialistsService extends BaseHttpService {
    constructor (http: HttpClient) {
        super(http);
    }

    public getSpecialists(query: GetList) {
        return this.get<ListResponse<Specialist>>(`/specialists?pageSize=${query.pageSize}&pageNumber=${query.pageNumber}`);
    }

    public getSpecialistsSorted(query: GetSpecialistsList) {
        return this.get<SpecialistsListResponse>(`/specialists/sorted?pageSize=${query.pageSize}&pageNumber=${query.pageNumber}&sortBy=${query.sortBy}&orderBy=${query.orderBy}`);
    }

    public getSpecialist(specialistID: number) {
        return this.get<DataResponse<Specialist>>(`/specialists/${specialistID}`);
    }

    public getSpecialistReviews(query: GetReviews, specialistID: number) {
        return this.get<ListResponse<Review>>(`/specialists/${specialistID}/reviews?type=${query.type}&pageSize=${query.pageSize}&pageNumber=${query.pageNumber}`);
    }
}