import { Component, Input, OnInit } from '@angular/core';
import { Problem, Session, UserWallet, ProblemImage, ProblemResource } from 'src/app/common/models';
import { PatientService, UsersWalletsService } from 'src/app/common/services';
import { SessionStatus } from 'src/app/common/enums';
import { Router } from '@angular/router';
import { DateTimeHelper } from 'src/app/common/helpers';

type AssetTab = "images" | "resources" | "sessions";

@Component({
	selector: 'app-problem',
	templateUrl: './problem.component.html',
	styleUrls: ['./problem.component.scss']
})
export class ProblemComponent implements OnInit {

    @Input('problem') public problem: Problem;

    public sessions: Session[];
    public activeSession: Session;
    public lastSession: Session;
    public wallet: UserWallet;

    public images: ProblemImage[];
    public resources: ProblemResource[];

    constructor(
        private patientService: PatientService,
        private usersWalletsService: UsersWalletsService,
        private router: Router
    ) {
        
    }

    ngOnInit() {
        this.loadSessions();
        this.loadAssets();
        this.loadWallet();
    }

    private loadWallet() {
        this.usersWalletsService.getMyWallet()
            .subscribe(response => {
                this.wallet = response.data;
            });
    }

    private loadSessions() {
        this.patientService.getSessions(this.problem.id)
            .subscribe(res => {
                if (!res.success) {
                    return;
                }

                this.sessions = res.data.map(session => {
                    session.date = DateTimeHelper.toLocalDateTime(session.date);
                    session.specialistCloseDate = DateTimeHelper.toLocalDateTime(session.specialistCloseDate);
                    return session;
                });

                this.activeSession = this.sessions.find(x => !x.isClientClose);
                
                if (this.sessions.length && (this.sessions[0].status == SessionStatus.Success || this.sessions[0].status == SessionStatus.Refund)) {
                    this.lastSession = this.sessions[this.sessions.length - 1];
                }
            });
    }

    private loadAssets() {
        this.patientService.getProblemAssets(this.problem.id)
            .subscribe(assets => {
                this.images = assets.images;
                this.resources = assets.resources;
            });
    }

    get closedSessions() {
        if (!this.sessions) {
            return [];
        }

        return this.sessions.filter(session => session.isClientClose && session.isSpecialistClose);
    }

    getEndDate(date: Date) {
        const result = new Date(date);
        result.setDate(result.getDate() + 1);

        return result;
    }

    createNewSession() {
        this.patientService.createProblemSession({ specialistID: this.lastSession.specialist.id }, this.problem.id)
            .subscribe(createSessionResponse => {
                if (!createSessionResponse.success) {
                    return;
                }

                if ((this.wallet.balance - this.wallet.lockedBalance) < this.lastSession.specialist.price) {
                    this.router.navigate([`/profile/problems/${this.problem.id}/choose-specialist/${this.lastSession.specialist.id}/pay`]);
        
                    return;
                }

                this.patientService.startSession(this.problem.id, createSessionResponse.sessionID)
                    .subscribe(startSessionResponse => {
                        if (!startSessionResponse.success) {
                            return;
                        }

                        this.router.navigate(['/profile']);
                    });
            });
    }

    routeToChooseSpecialist() {
        if (this.activeSession) {
            this.router.navigate([`/profile/problems/${this.problem.id}/choose-specialist`], {
                queryParams: {
                    activeSession: this.activeSession.id
                }
            });

            return;
        }

        this.router.navigate([`/profile/problems/${this.problem.id}/choose-specialist`]);
    }

    routeToPay() {
        this.router.navigate([`/profile/problems/${this.problem.id}/choose-specialist/${this.activeSession.specialist.id}/pay`]);
    }

    routeToAssets(tab: AssetTab) {
        if (tab == 'sessions' && !this.closedSessions.length) {
            return;
        }

        if (tab == 'resources' && !this.resources.length) {
            return;
        }

        if (tab == 'images' && !this.filterHiddenImages(this.images).length) {
            return;
        }

        this.router.navigate(['/profile/problems', this.problem.id, 'assets'], {
            queryParams: {
                tab: tab
            }
        });
    }

    closeSession() {
        this.patientService
            .getSession(this.activeSession.problem.id, this.activeSession.id)
            .subscribe(response => {
                if (!response.data.isSpecialistClose) {
                    return;
                }

                this.patientService.closeSession(this.problem.id, this.activeSession.id)
                    .subscribe(res => {
                        if (!res.success) {
                            return;
                        }

                        this.router.navigate([`profile/problems/${this.problem.id}/sessions/${this.activeSession.id}/review`]);
                    });
            });
    }

    refundSession() {
        this.patientService
            .getSession(this.activeSession.problem.id, this.activeSession.id)
            .subscribe(response => {
                if (!response.data.isSpecialistClose) {
                    return;
                }

                if (!response.data.isClientClose) {
                    this.router.navigate([`profile/problems/${this.problem.id}/sessions/${this.activeSession.id}/refund`]);

                    return;
                }
            });
    }

    normalizeMonth(monthStr: string) {
        return monthStr.replace(".", "").substr(0, 3);
    }

    reloadData(event) {
        this.loadSessions();
        this.loadAssets();
        this.loadWallet();
    }

    filterHiddenImages(images: ProblemImage[]) {
        return images.filter(x => !x.isHidden);
    }
}