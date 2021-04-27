import { Injectable } from '@angular/core';
import { BaseHttpService } from './base-http.service';
import { HttpClient } from '@angular/common/http';
import { DataResponse, ResponseModel, CreateSessionResponse } from '../models/response';
import { Problem, Session, ClientProblemAssets } from '../models';
import { CreateProblemRequest, CreateSessionRequest, CreateReviewRequest } from '../models/request';

@Injectable()
export class PatientService extends BaseHttpService {
    constructor (http: HttpClient) {
        super(http);
    }

    public getProblems() {
        return this.get<DataResponse<Problem[]>>(`/patient/problems`);
    }

    public getAvailableProblems() {
        return this.get<DataResponse<Problem[]>>(`/patient/problems/available`);
    }

    public getProblem(problemID: number) {
        return this.get<DataResponse<Problem>>(`/patient/problems/${problemID}`);
    }

    public getSessions(problemID: number) {
        return this.get<DataResponse<Session[]>>(`/patient/problems/${problemID}/sessions`);
    }

    public getSession(problemID: number, sessionID: number) {
        return this.get<DataResponse<Session>>(`/patient/problems/${problemID}/sessions/${sessionID}`);
    }

    public getActiveSession(problemID: number) {
        return this.get<DataResponse<Session>>(`/patient/problems/${problemID}/activeSession`);
    }

    public getProblemAssets(problemID: number) {
        return this.get<DataResponse<ClientProblemAssets>>(`/patient/problems/${problemID}/assets`)
            .map(response => response.data);
    }

    public createProblem(request: CreateProblemRequest) {
        return this.post<DataResponse<Problem>>(`/patient/problems`, request);
    }

    public createProblemSession(request: CreateSessionRequest, problemID: number) {
        return this.post<CreateSessionResponse>(`/patient/problems/${problemID}/sessions`, request);
    }

    public startSession(problemID: number, sessionID: number) {
        return this.post<ResponseModel>(`/patient/problems/${problemID}/sessions/${sessionID}/start`, {});
    }

    public closeSession(problemID: number, sessionID: number) {
        return this.post<ResponseModel>(`/patient/problems/${problemID}/sessions/${sessionID}/close`, {});
    }

    public createReview(request: CreateReviewRequest, problemID: number, sessionID: number) {
        return this.post<ResponseModel>(`/patient/problems/${problemID}/sessions/${sessionID}/review`, request);
    }

    public changeSessionSpecialist(request: CreateSessionRequest, problemID: number, sessionID: number) {
        return this.put<ResponseModel>(`/patient/problems/${problemID}/sessions/${sessionID}`, request);
    }
}