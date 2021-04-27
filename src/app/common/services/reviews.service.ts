import { Injectable } from '@angular/core';
import { BaseHttpService } from './base-http.service';
import { HttpClient } from '@angular/common/http';
import { ArticlesListResponse, DataResponse, ListResponse, ResponseModel } from '../models/response';
import { Article, ArticleComment, ClientVideoReview } from '../models';
import { CreateUpdateArticleRequest, GetList, CreateArticleCommentRequest, GetArticlesList } from '../models/request';

@Injectable()
export class ReviewsService extends BaseHttpService {
    constructor(http: HttpClient) {
        super(http);
    }

    public getAllVideoReviews() {
        return this.get<DataResponse<ClientVideoReview[]>>(`/reviews/video`)
            .map(response => response.data);
    }
}