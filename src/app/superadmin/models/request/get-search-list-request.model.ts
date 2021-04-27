import { GetList } from 'src/app/common/models/request';

export class GetSearchListRequest extends GetList {
    public searchQuery: string;
}