import { SortBy } from 'src/app/common/enums';
import { ListResponse } from 'src/app/common/models/response';
import { Superadmin } from '../superadmin.model';

export class GetAdministratorsListResponse extends ListResponse<Superadmin> {
    public orderBy: SortBy;
    public searchQuery: string;
}