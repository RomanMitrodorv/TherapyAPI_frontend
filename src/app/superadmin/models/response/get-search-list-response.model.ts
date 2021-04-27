import { ListResponse } from 'src/app/common/models/response';

export class GetSearchListResponse<T> extends ListResponse<T> {
    public searchQuery: string;
}