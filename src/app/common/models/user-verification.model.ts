import { User } from './user.model';
import { File } from './file.model';
import { UserVerificationRequest } from './user-verification-request.model';

export class UserVerification {
    public id: number;
    public user: User;
    public verificationRequest: UserVerificationRequest;
    public document: File;
    public selfie: File;
}