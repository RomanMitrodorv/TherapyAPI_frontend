import { SortBy } from 'src/app/common/enums';
import { GetList } from 'src/app/common/models/request';
import { SpecialistsSorter } from '../../components/customers/customers.sorters';

export class GetSpecialistsListRequest extends GetList {
    public sortBy: SpecialistsSorter;
    public orderBy: SortBy;
    public searchQuery: string;
}