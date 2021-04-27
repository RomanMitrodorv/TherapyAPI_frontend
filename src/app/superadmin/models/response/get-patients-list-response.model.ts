import { SortBy } from 'src/app/common/enums';
import { ListResponse } from 'src/app/common/models/response';
import { PatientsSorter } from '../../components/customers/customers.sorters';
import { SuperadminPatient } from '../superadmin-patient.model';

export class GetPatientListResponse extends ListResponse<SuperadminPatient> {
    public sortBy: PatientsSorter;
    public orderBy: SortBy;
    public searchQuery: string;
}