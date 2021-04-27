import { User } from './user.model';
import { File } from './file.model';
import { UserVerificationRequestStatus } from '../enums';

export class UserVerificationRequest {
    public id: number;
    public user: User;
    public document: File;
    public selfie: File;
    public status: UserVerificationRequestStatus;
    public createdAt: Date;
    public updatedAt: Date;
}