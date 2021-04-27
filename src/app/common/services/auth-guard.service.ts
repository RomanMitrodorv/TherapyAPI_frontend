import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

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

        return true;
    }
}