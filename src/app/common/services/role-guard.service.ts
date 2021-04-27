import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { take } from 'rxjs/operators';
import { UserRole } from '../enums';
import { User } from '../models';
import { AuthService } from './auth.service';
import decode from 'jwt-decode';
import { LocalStorageHelper } from '../helpers';

@Injectable()
export class RoleGuardService implements CanActivate {

    constructor(
        public authService: AuthService,
        public router: Router
    ) {

    }

    canActivate(): boolean {
        if (!this.authService.isLoggedInNow) {
            this.router.navigate(['/sign-in']);

            return false;
        }

        const token = LocalStorageHelper.getToken();

        if (!token) {
            return false;
        }

        // decode the token to get its payload
        const tokenPayload = decode(token);
        const role = Number(UserRole[tokenPayload.role]);

        if (role == UserRole.Specialist) {
            return true;
        }

        if (role == UserRole.Administrator) {
            return true;
        }

        return false;
    }

    
}