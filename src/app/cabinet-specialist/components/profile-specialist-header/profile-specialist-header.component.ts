import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { AuthService, UsersService, SpecialistService } from 'src/app/common/services';
import { User, Specialist, File } from 'src/app/common/models';
import { StringHelper } from 'src/app/common/helpers';
import { Router } from '@angular/router';
import { UserRole } from 'src/app/common/enums';
import { Subject } from 'rxjs';

@Component({
	selector: 'profile-specialist-header',
	templateUrl: './profile-specialist-header.component.html',
	styleUrls: ['./profile-specialist-header.component.scss']
})
export class ProfileSpecialistHeaderComponent implements OnInit, OnDestroy {
	
    public isLoggedIn: boolean;
    public isMobileNavExpanden = false;
    
	public user: User;
    public specialist: Specialist;
    
    @Input()
    public avatarChanged: Subject<File>;
	
    constructor(
		private authService: AuthService,
		private usersService: UsersService,
		private specialistService: SpecialistService,
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
            
        if (this.avatarChanged) {
            this.avatarChanged.subscribe(avatar => {
                this.user.photo = avatar;
            });
        }
    }

    ngOnDestroy() {
        if (this.avatarChanged) {
            this.avatarChanged.unsubscribe();
        }
	}
	
	logout() {
        this.authService.logout().subscribe();
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

	scrollToElement(elementID: string) {
		const element = document.querySelector(elementID);

		if (element) {
			element.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}

		this.toggleMobileNav();
    }
}