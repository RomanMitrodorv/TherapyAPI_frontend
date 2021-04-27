import { UserRole } from '../enums';
import { File } from './file.model';

export class User {
    public id: number;
    public firstName: string;
    public lastName: string;
    public phoneNumber: string;
    public email: string;
    public photo: File;
    public role: UserRole;
    public registeredAt: Date;
}