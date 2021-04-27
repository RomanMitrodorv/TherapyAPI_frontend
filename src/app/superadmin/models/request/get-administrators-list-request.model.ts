import { SortBy } from 'src/app/common/enums';
import { GetList } from 'src/app/common/models/request';

export class GetAdministratorsListRequest extends GetList {
    public orderBy: SortBy;
    public searchQuery: string;
}