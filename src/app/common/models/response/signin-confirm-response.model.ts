import { ResponseModel } from './response.model';
import { UserRole } from '../../enums';

export class SignInConfirmResponse extends ResponseModel {
    public token: string;
    public role: UserRole;
}