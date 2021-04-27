import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BaseHttpService } from './base-http.service';

import { 
    ChangeSpecialistPriceRequest,
    GetList, 
    CreateUpdateProblemImageRequest, 
    CreateUpdateProblemResourceRequest
} from '../models/request';

import { 
    DataResponse, 
    ResponseModel, 
    ListResponse, 
    ReviewsResponse 
} from '../models/response';

import { 
    Specialist, 
    SpecialistProfile,
    SpecialistProfileActiveSession,
    ClientCard, 
    SpecialistSession, 
    ProblemAssets, 
    ProblemImage, 
    ProblemResource,
    ArticlePublish
} from '../models';

@Injectable()
export class SpecialistService extends BaseHttpService {
    constructor (http: HttpClient) {
        super(http);
    }

    public getSpecialistInfo() {
        return this.get<DataResponse<Specialist>>(`/specialist/info`);
    }
    
    public getSpecialistProfile() {
        return this.get<DataResponse<SpecialistProfile>>(`/specialist/profile`)
            .map(response => response.data);
    }

    public changeSpecialistPrice(request: ChangeSpecialistPriceRequest) {
        return this.post<ResponseModel>(`/specialist/price`, request);
    }

    public getActiveSessions() {
        return this.get<DataResponse<SpecialistProfileActiveSession[]>>(`/specialist/sessions/active`)
            .map(response => response.data);
    }

    public getClients(query: GetList) {
        return this.get<ListResponse<ClientCard>>(`/specialist/clients?pageNumber=${query.pageNumber}&pageSize=${query.pageSize}`);
    }

    public getClient(clientID: number) {
        return this.get<DataResponse<ClientCard>>(`/specialist/clients/${clientID}`)
            .map(response => response.data);
    }

    public getSessions(query: GetList) {
        return this.get<ListResponse<SpecialistSession>>(`/specialist/sessions?pageNumber=${query.pageNumber}&pageSize=${query.pageSize}`);
    }

    public getSession(sessionID: number) {
        return this.get<DataResponse<SpecialistSession>>(`/specialist/sessions/${sessionID}`)
            .map(response => response.data);
    }

    public getReviews() {
        return this.get<ReviewsResponse>(`/specialist/reviews`);
    }

    public getArticles(query: GetList) {
        return this.get<ListResponse<ArticlePublish>>(`/specialist/articles?pageNumber=${query.pageNumber}&pageSize=${query.pageSize}`);
    }

    public getClientAssets(clientID: number, problemID: number) {
        return this.get<DataResponse<ProblemAssets>>(`/specialist/clients/${clientID}/problems/${problemID}/assets`)
            .map(response => response.data);
    }

    public createClientProblemImage(request: CreateUpdateProblemImageRequest, clientID: number, problemID: number) {
        return this.post<DataResponse<ProblemImage[]>>(`/specialist/clients/${clientID}/problems/${problemID}/images`, request)
            .map(response => response.data);
    }

    public updateClientProblemImage(request: CreateUpdateProblemImageRequest, clientID: number, problemID: number, imageID: number) {
        return this.put<DataResponse<ProblemImage[]>>(`/specialist/clients/${clientID}/problems/${problemID}/images/${imageID}`, request)
            .map(response => response.data);
    }

    public hideClientProblemImage(clientID: number, problemID: number, imageID: number) {
        return this.delete<DataResponse<ProblemImage[]>>(`/specialist/clients/${clientID}/problems/${problemID}/images/${imageID}`)
            .map(response => response.data);
    }

    public reloadClientProblemImage(clientID: number, problemID: number, imageID: number) {
        return this.patch<DataResponse<ProblemImage[]>>(`/specialist/clients/${clientID}/problems/${problemID}/images/${imageID}`, {})
            .map(response => response.data);
    }

    public createClientProblemResource(request: CreateUpdateProblemResourceRequest, clientID: number, problemID: number) {
        return this.post<DataResponse<ProblemResource[]>>(`/specialist/clients/${clientID}/problems/${problemID}/resources`, request)
            .map(response => response.data);
    }

    public editClientProblemResource(request: CreateUpdateProblemResourceRequest, clientID: number, problemID: number, resourceID: number) {
        return this.put<DataResponse<ProblemResource[]>>(`/specialist/clients/${clientID}/problems/${problemID}/resources/${resourceID}`, request)
            .map(response => response.data);
    }

    public closeClientSession(clientID: number, problemID: number, sessionID: number) {
        return this.post<DataResponse<SpecialistProfileActiveSession[]>>(`/specialist/clients/${clientID}/problems/${problemID}/sessions/${sessionID}/close`, {});
    }
}