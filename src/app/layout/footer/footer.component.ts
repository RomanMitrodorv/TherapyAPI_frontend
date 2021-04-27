import { Component, Input, OnInit } from '@angular/core';
import { UsersService, AuthService, SpecialistService } from 'src/app/common/services';
import { User, Specialist } from 'src/app/common/models';
import { UserRole } from 'src/app/common/enums';
import { StringHelper } from 'src/app/common/helpers';
import { Subject } from 'rxjs';

@Component({
	selector: 'app-footer',
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

	public user: User;
	public specialist: Specialist;

	@Input()
    public userChanged: Subject<User>;

	constructor(
		private authService: AuthService,
		private usersService: UsersService,
		private specialistService: SpecialistService
	) {
		this.authService.isLoggedIn
			.subscribe(logged => {
				if (logged) {
					this.loadUserInfo();
				}
			});
	}

	ngOnInit(): void {
		if (this.userChanged) {
            this.userChanged.subscribe(user => {
                this.user = user;
            });
        }
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
				if (user.role == UserRole.Specialist) {
					this.loadSpecialistInfo();
				}

				this.user = user;
			});
	}

	private loadSpecialistInfo() {
		this.specialistService.getSpecialistInfo()
			.subscribe(specialist => this.specialist = specialist.data);
	}

	scrollTop(): void {
		window.scroll({
			left: 0,
			top: 0,
			behavior: "smooth"
		});
	}

	getAvatar() {
		return StringHelper.getFirstLetter(this.user.lastName);
	}
}