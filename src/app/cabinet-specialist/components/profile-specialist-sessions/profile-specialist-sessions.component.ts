import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SpecialistService, AuthService } from 'src/app/common/services';
import { SpecialistSession } from 'src/app/common/models';
import { PaginationComponent } from 'src/app/layout/pagination/pagination.component';
import { DateTimeHelper } from 'src/app/common/helpers';

@Component({
	selector: 'app-profile-specialist-sessions',
	templateUrl: './profile-specialist-sessions.component.html',
	styleUrls: ['./profile-specialist-sessions.component.scss']
})
export class ProfileSpecialistSessionsComponent implements OnInit {

    public sessions: SpecialistSession[];

    public pageSize = 10;
    public pageNumber = 1;
    public totalPages = 1;

    @ViewChild(PaginationComponent) pagination: PaginationComponent;

    constructor(
        private authService: AuthService,
        private specialistService: SpecialistService,
        private router: Router
    ) {

    }

    private loadSessions(pageNumber: number, pageSize: number) {
        this.specialistService.getSessions({ pageNumber, pageSize })
            .subscribe(sessionsResponse => {
                this.pageSize = sessionsResponse.pageSize;
                this.pageNumber = sessionsResponse.currentPage;
                this.totalPages = sessionsResponse.totalPages;

                this.sessions = sessionsResponse.data.map(session => {
                    session.sessionDate = DateTimeHelper.toLocalDateTime(session.sessionDate);
                    session.specialistCloseDate = DateTimeHelper.toLocalDateTime(session.specialistCloseDate);
                    return session;
                });
            });
    }

    closeSession(session: SpecialistSession) {
        this.specialistService
            .closeClientSession(session.client.id, session.problem.id, session.sessionID)
            .subscribe(response => {
                if (response.success) {
                    this.loadSessions(this.pageNumber, this.pageSize);
                }
            });
    }

    ngOnInit(): void {
        this.authService.isLoggedIn
            .subscribe(logged => {
                if (!logged) {
                    this.router.navigate(['/']);

                    return;
                }

                this.loadSessions(1, 10);
            });
    }

    routeToClient(session: SpecialistSession) {
        this.router.navigate([`/profile-specialist/clients/${session.client.id}`]);
    }

    routeToImages(session: SpecialistSession) {
        const path = `/profile-specialist/clients/${session.client.id}/problems/${session.problem.id}/assets?tab=images`;

        this.router.navigateByUrl(path);
    }

    routeToResources(session: SpecialistSession) {
        const path = `/profile-specialist/clients/${session.client.id}/problems/${session.problem.id}/assets?tab=resources`;

        this.router.navigateByUrl(path);
    }

    setPageSize(value: number) {
		this.loadSessions(1, Number(value));
	}

	setPageNumber(value: number) {
		window.scroll(0,0);
		this.loadSessions(value, this.pageSize);
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
        console.log(event)
    }
}