import { SortBy } from 'src/app/common/enums';
import { ListResponse } from 'src/app/common/models/response';
import { SpecialistsSorter } from '../../components/customers/customers.sorters';
import { SuperadminSpecialist } from '../superadmin-specialist.model';

export class GetSpecialistsListResponse extends ListResponse<SuperadminSpecialist> {
    public sortBy: SpecialistsSorter;
    public orderBy: SortBy;
    public searchQuery: string;
}