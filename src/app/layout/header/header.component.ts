import { Component } from '@angular/core';
import { AuthService, UsersService, SpecialistService } from 'src/app/common/services';
import { User, Specialist } from 'src/app/common/models';
import { StringHelper } from 'src/app/common/helpers';
import { Router, NavigationEnd } from '@angular/router';
import { UserRole } from 'src/app/common/enums';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

	public isLoggedIn: boolean;
	public user: User;
	public specialist: Specialist;

	public isMobileNavExpanden = false;

	constructor(
		private authService: AuthService,
		private usersService: UsersService,
		private specialistService: SpecialistService,
		private router: Router
	) {
		this.authService.isLoggedIn
			.subscribe(logged => {
				this.isLoggedIn = logged;

				if (logged) {
					this.loadUserInfo();
				}
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

	private loadUserInfo() {
		this.usersService.getUserInfo()
			.subscribe(user => {
				this.user = user;

				if (user.role == UserRole.Specialist) {
					this.loadSpecialist();
				}
			});
	}

	private loadSpecialist() {
		this.specialistService.getSpecialistInfo()
			.subscribe(specialistInfoResponse => {
				this.specialist = specialistInfoResponse.data;
			});
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

	routeToFragment(fragmentID: string) {
		if (this.router.url == '/') {
			this.scrollToElement(fragmentID);

			return;
		}

		this.router.navigate(['/'], { fragment: fragmentID });
	}

	scrollToElement(elementID: string) {
        const element = document.getElementById(elementID);

        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });

            return true;
        }

        return false;
    }
}