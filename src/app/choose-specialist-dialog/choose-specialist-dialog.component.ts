import { Component, OnInit } from '@angular/core';
import { PatientService, StorageService, UsersWalletsService, AuthService } from 'src/app/common/services';
import { Problem, Specialist, UserWallet } from '../common/models';
import { Router } from '@angular/router';

declare var $: any;

@Component({
    selector: 'choose-specialist-dialog',
    templateUrl: './choose-specialist-dialog.component.html',
    styleUrls: ['./choose-specialist-dialog.component.scss']
})
export class ChooseSpecialistDialogComponent implements OnInit {

    public specialist: Specialist;
    public problems: Problem[];
    public wallet: UserWallet;

    public selectedProblem: Problem;
    public isNewProblem = false;
    public newProblemText: string;

    constructor(
        private authService: AuthService,
        private patientService: PatientService,
        private storageService: StorageService,
        private walletsService: UsersWalletsService,
        private router: Router
    ) { }

    ngOnInit(): void {
        document.body.onclick = (event: any) => {
            if (!event) {
                return;
            }
            
            if (!event.target) {
                return;
            }

            if (!event.target.classList.contains('modal-button')) {
                if (!event.target.parentNode) {
                    return;
                }

                if (event.target.parentNode.classList.contains('show')) {
                    this.close();
                }
            }
        }

        this.loadSpecialist();
        
        this.authService.isLoggedIn
            .subscribe(logged => {
                if (logged) {
                    this.loadProblems();
                    this.loadWallet();
                }
            });
    }

    public selectProblem(problem?: Problem) {
        if (problem) {
            this.isNewProblem = false;
            this.selectedProblem = problem;

            return;
        }

        this.selectedProblem = null;
        this.isNewProblem = true;
    }

    private loadSpecialist() {
        this.storageService.getSpecialist()
            .subscribe((specialist: Specialist) => {
                this.specialist = specialist;
            });
    }

    private loadProblems() {
        this.patientService.getAvailableProblems()
            .subscribe(res => {
                this.problems = res.data;
                this.selectProblem(this.problems[0]);
            });
    }

    private loadWallet() {
        this.walletsService.getMyWallet()
            .subscribe(res => {
                this.wallet = res.data;
            });
    }

    close() {
        let dialog = document.querySelector('.choose-specialist-dialog');
        dialog.classList.remove('show');
        dialog.classList.add('hidden');
        this.storageService.resetSpecialist();
    }
    
    labelClick(inputName: string) {
        this[inputName].nativeElement.focus();
    }
    
    createProblem() {
        if (!this.newProblemText || this.newProblemText == '') {
            return;
        }

        this.patientService.createProblem({ problemText: this.newProblemText })
            .subscribe(problemResponse => {
                this.patientService.createProblemSession({ specialistID: this.specialist.id }, problemResponse.data.id)
                    .subscribe(sessionResponse => {
                        if ((this.wallet.balance - this.wallet.lockedBalance) < this.specialist.price) {
                            this.router.navigate([`/profile/problems/${problemResponse.data.id}/choose-specialist/${this.specialist.id}/pay`]);
                
                            return;
                        }

                        this.patientService.startSession(problemResponse.data.id, sessionResponse.sessionID)
                            .subscribe(res => {
                                if (!res.success) {
                                    return;
                                }

                                this.router.navigate(['/profile']);
                            });
                    });
            });
    }

    private createSession() {
        this.patientService.createProblemSession({ specialistID: this.specialist.id }, this.selectedProblem.id)
            .subscribe(sessionResponse => {
                if (sessionResponse.success) {
                    if ((this.wallet.balance - this.wallet.lockedBalance) < this.specialist.price) {
                        this.router.navigate([`/profile/problems/${this.selectedProblem.id}/choose-specialist/${this.specialist.id}/pay`]);
            
                        return;
                    }

                    this.patientService.startSession(this.selectedProblem.id, sessionResponse.sessionID)
                        .subscribe(res => {
                            if (!res.success) {
                                return;
                            }

                            this.router.navigate(['/profile']);
                        });
                }
            });
    }
    
    async startSession() {
        if (!this.selectedProblem) {
            return;
        }

        const problemSessions = await this.patientService.getSessions(this.selectedProblem.id).toPromise().then(res => res.data);

        if (!problemSessions.length) {
            this.createSession();

            return;
        }

        const activeSession = await this.patientService.getActiveSession(this.selectedProblem.id).toPromise().then(res => {
            if (!res.success) {
                return null;
            }

            return res.data;
        });

        if (activeSession) {
            const changedSpecialist = await this.patientService
                .changeSessionSpecialist({ specialistID: this.specialist.id }, this.selectedProblem.id, activeSession.id)
                .toPromise()
                .then(res => res.success);

            if (!changedSpecialist) {
                return;
            }

            if ((this.wallet.balance - this.wallet.lockedBalance) < this.specialist.price) {
                this.router.navigate([`/profile/problems/${this.selectedProblem.id}/choose-specialist/${this.specialist.id}/pay`]);
    
                return;
            }

            this.patientService.startSession(this.selectedProblem.id, activeSession.id)
                .subscribe(res => {
                    if (!res.success) {
                        return;
                    }

                    this.router.navigate(['/profile']);
                });

            return;
        }

        this.createSession();
    }

    submit() {
        if (this.isNewProblem) {
            this.createProblem();

            return;
        }

        this.startSession();
    }
}