import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SpecialistService, AuthService, RouterExtService } from 'src/app/common/services';
import { ClientCard, SpecialistSession } from 'src/app/common/models';
import { StringHelper } from 'src/app/common/helpers';
import { Location } from '@angular/common';

@Component({
	selector: 'app-profile-specialist-client',
	templateUrl: './profile-specialist-client.component.html',
	styleUrls: ['./profile-specialist-client.component.scss']
})
export class ProfileSpecialistClientComponent implements OnInit {

    public client: ClientCard;

    constructor(
        private authService: AuthService,
        private specialistService: SpecialistService,
        private router: Router,
        private route: ActivatedRoute,
        private location: Location
    ) {

    }

    closeSession(session: SpecialistSession) {
        this.specialistService
            .closeClientSession(session.client.id, session.problem.id, session.sessionID)
            .subscribe(response => {
                if (response.success) {
                    this.loadClient(session.client.id);
                }
            });
    }

    routeToImages(session: SpecialistSession) {
        const path = `/profile-specialist/clients/${session.client.id}/problems/${session.problem.id}/assets?tab=images`;

        this.router.navigateByUrl(path);
    }

    routeToResources(session: SpecialistSession) {
        const path = `/profile-specialist/clients/${session.client.id}/problems/${session.problem.id}/assets?tab=resources`;

        this.router.navigateByUrl(path);
    }

    prevRoute() {
		this.location.back();
	}

    private loadClient(clientID: number) {
        this.specialistService.getClient(clientID)
            .subscribe(client => {
                this.client = client;
            });
    }

    ngOnInit(): void {
        this.route.params
            .subscribe(params => {
                if (!params['id']) {
                    return;
                }

                this.loadClient(params['id']);
            });
    }

    getPhone() {
		return StringHelper.formatPhone(this.client.user.phoneNumber);
    }
    
    normalizeMonth(monthStr: string) {
        return monthStr.replace(".", "").substr(0, 3);
    }

    getEndDate(date: Date) {
        const result = new Date(date);
        result.setDate(result.getDate() + 1);

        return result;
    }

    reloadData(event) {
        this.loadClient(this.client.id);
    }
}