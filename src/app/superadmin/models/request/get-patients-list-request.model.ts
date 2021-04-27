import { SortBy } from 'src/app/common/enums';
import { GetList } from 'src/app/common/models/request';
import { PatientsSorter } from '../../components/customers/customers.sorters';

export class GetPatientsListRequest extends GetList {
    public sortBy: PatientsSorter;
    public orderBy: SortBy;
    public searchQuery: string;
}