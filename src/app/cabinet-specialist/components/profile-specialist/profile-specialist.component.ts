import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { SpecialistService, AuthService, FilesService, UsersService } from 'src/app/common/services';
import { SpecialistProfile, Problem, SpecialistProfileActiveSession, File, Session, SpecialistSession } from 'src/app/common/models';
import { StringHelper } from 'src/app/common/helpers';
import { Subject } from 'rxjs';

@Component({
	selector: 'app-profile-specialist',
	templateUrl: './profile-specialist.component.html',
	styleUrls: ['./profile-specialist.component.scss']
})
export class ProfileSpecialistComponent implements OnInit {

    public uploadAvatarSubject = new Subject<File>();

    public profile: SpecialistProfile;
    public activeSessions: SpecialistProfileActiveSession[];

    constructor(
        private usersService: UsersService,
        private specialistService: SpecialistService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.loadProfile();
        this.loadActiveSessions();
    }

    private loadProfile() {
        this.specialistService.getSpecialistProfile()
            .subscribe(profile => {
                this.profile = profile;
            });
    }

    private loadActiveSessions() {
        this.specialistService.getActiveSessions()
            .subscribe(sessions => {
                this.activeSessions = sessions;
            });
    }

    closeSession(session: Session) {
        this.specialistService
            .closeClientSession(session.problem.user.id, session.problem.id, session.id)
            .subscribe(response => {
                this.activeSessions = response.data;
            });
    }

    priceStepMinus() {
        if (this.profile.price > 100) {
            this.profile.price -= 100;

            this.specialistService.changeSpecialistPrice({
                price: this.profile.price
            })
            .subscribe(res => {
                if (!res.success) {
                    this.profile.price += 100;
                }
            });
        }
    }

    priceStepPlus() {
        this.profile.price += 100;

        this.specialistService.changeSpecialistPrice({
            price: this.profile.price
        })
        .subscribe(res => {
            if (!res.success) {
                this.profile.price -= 100;
            }
        });
    }

    getPhone(phoneStr: string) {
		return StringHelper.formatPhone(phoneStr);
    }
    
    normalizeMonth(monthStr: string) {
        return monthStr.replace(".", "").substr(0, 3);
    }

    routeToImages(problem: Problem) {
        this.router.navigate([`/profile-specialist/clients/${problem.user.id}/problems/${problem.id}/assets`], {
            queryParams: {
                tab: 'images'
            }
        });
    }

    routeToResources(problem: Problem) {
        this.router.navigate([`/profile-specialist/clients/${problem.user.id}/problems/${problem.id}/assets`], {
            queryParams: {
                tab: 'resources'
            }
        });
    }

    getAvatar() {
		return StringHelper.getFirstLetter(this.profile.lastName);
    }
    
    uploadFile(files: FileList) {
        const file = files.item(0);

        this.usersService.uploadAvatarImage(file)
            .subscribe(response => {
                this.profile.photoUrl = response.url;
                this.uploadAvatarSubject.next(response);
            });
    }

    filterClosedSessions(list: SpecialistSession[]) {
        return list.filter(session => session.isSpecialistClose && session.isClientClose);
    }
}