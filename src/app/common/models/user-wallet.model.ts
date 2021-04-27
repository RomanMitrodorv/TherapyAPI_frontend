import { User } from './user.model';

export class UserWallet {
    public id: number;
    public user: User;
    public balance: number;
    public lockedBalance: number;
}