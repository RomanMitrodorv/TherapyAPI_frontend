import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { AuthService, UsersService } from 'src/app/common/services';
import { User, File } from 'src/app/common/models';
import { StringHelper } from 'src/app/common/helpers';
import { Router } from '@angular/router';
import { UserRole } from 'src/app/common/enums';
import { Subject } from 'rxjs';

@Component({
	selector: 'profile-header',
	templateUrl: './profile-header.component.html',
	styleUrls: ['./profile-header.component.scss']
})
export class ProfileHeaderComponent implements OnInit {
	
    public isLoggedIn: boolean;
    public isMobileNavExpanden = false;
    
	public user: User;

	@Input()
    public userChanged: Subject<User>;
	
    constructor(
		private authService: AuthService,
		private usersService: UsersService,
		private router: Router
	) {
        
    }
    
    ngOnInit() {
        this.authService.isLoggedIn
			.subscribe(logged => {
				this.isLoggedIn = logged;

				if (logged) {
					this.loadUserInfo();
				}
			});
			
		if (this.userChanged) {
            this.userChanged.subscribe(user => {
                this.user = user;
            });
        }
    }
	
	logout() {
        this.authService.logout().subscribe();
    }
	
	private loadUserInfo() {
		this.usersService.getUserInfo()
			.subscribe(user => {
				this.user = user;
			});
	}

	getCabinetRoute(user: User) {
		if (user.role == UserRole.Client) {
			return '/profile';
		}

		if (user.role == UserRole.Specialist) {
			return '/profile-specialist';
		}

		if (user.role == UserRole.Administrator) {
			return '/superadmin/customers';
		}
	}

	getAvatar() {
		return StringHelper.getFirstLetter(this.user.lastName);
	}

	getPhone() {
		return StringHelper.formatPhone(this.user.phoneNumber);
	}

	isCabinetRoute() {
		if (this.router.url.includes('profile')) {
			return true;
		}

		return false;
	}

	toggleMobileNav() {
		this.isMobileNavExpanden = !this.isMobileNavExpanden;
	}

	scrollToElement(elementID: string) {
		const element = document.querySelector(elementID);

		if (element) {
			element.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}

		this.toggleMobileNav();
    }
}