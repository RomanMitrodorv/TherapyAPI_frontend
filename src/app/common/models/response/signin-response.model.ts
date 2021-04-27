import { ResponseModel } from './response.model';
import { UserRole } from '../../enums';

export class SignInResponse extends ResponseModel {
    public userID: number;
}