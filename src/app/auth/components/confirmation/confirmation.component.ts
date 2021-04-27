import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, AfterContentChecked, AfterViewChecked, AfterContentInit, QueryList, ViewChildren, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/common/services/auth.service';
import { UserRole } from 'src/app/common/enums';
import { CodeInputComponent } from 'angular-code-input';
import { Specialist } from 'src/app/common/models';
import { PatientService, SpecialistsService, UsersWalletsService } from 'src/app/common/services';
import { LocalStorageHelper } from 'src/app/common/helpers';

@Component({
    selector: 'app-auth-confirmation',
    templateUrl: './confirmation.component.html',
    styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit, AfterContentChecked {

    public isLoading = false;
    public isError = false;
    public errorText: string;
    public secondsToResend = 30;
    public isResendAllowed = false;
    public isReg: boolean;

    @ViewChildren("codeInput") list: QueryList<CodeInputComponent>
    codeInput: CodeInputComponent;

    public confirmAuthForm: FormGroup;
    public userID: number;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private authService: AuthService,
        private patientService: PatientService,
        private walletsService: UsersWalletsService,
        private specialistsService: SpecialistsService
    ) {
        this.authService.isLoggedIn
            .subscribe(logged => {
                if (logged) {
                    this.router.navigate(['/']);

                    return;
                }

                this.isReg = history.state.isReg;
            });

        this.activatedRoute.queryParams
            .subscribe(params => {
                if (!params['id']) {
                    this.router.navigate(['/']);

                    return;
                }

                this.userID = Number(params['id']);
                this.updateTimer();
            });
    }

    // this called every time when user changed the code
    onCodeChanged(code: string) {
        
    }

    // this called only if user entered full code
    onCodeCompleted(code: string) {
        this.confirmAuthForm.setValue({ code });
        this.submit(this.confirmAuthForm);
    }

    updateTimer() {
        setInterval(() => {
            if (this.secondsToResend != 0) {
                this.secondsToResend -= 1;
            }

            if (this.secondsToResend > 0) {
                this.isResendAllowed = false;

                return;
            }

            if (this.secondsToResend == 0) {
                this.isResendAllowed = true;

                return;
            }
        }, 1000);
    }

    ngOnInit(): void {
        if (window.innerWidth <= 450) {
            document.documentElement.style.background = "#335C65";
        } else {
            document.documentElement.style.background = "#254951";
        }

        window.onresize = () => {
            if (window.innerWidth <= 450) {
                document.documentElement.style.background = "#335C65";
            } else {
                document.documentElement.style.background = "#254951";
            }
        }

        this.createConfirmAuthForm();
    }

    ngAfterContentChecked() {

        if (!this.codeInput) {
            try {
                this.codeInput = this.list.first;
            } catch (e) {}
        }

        if (this.codeInput) {
            this.codeInput.inputsList
                .map(item => {
                    item.nativeElement.placeholder = '0';

                    return item;
                });
        }
    }

    private createConfirmAuthForm(): void {
        this.confirmAuthForm = new FormGroup({
            code: new FormControl(null, [Validators.required])
        });
    }

    public resendConfirmation() {
        this.authService.resendConfirmCode({ userID: this.userID })
            .subscribe(() => {
                this.isResendAllowed = false;
                this.secondsToResend = 30;
            });
    }

    public submit(form: FormGroup) {
        if (this.isLoading) {
            return;
        }

        this.isLoading = true;

        if (form.invalid) {
            this.isLoading = false;

            return;
        }

        this.authService.signInConfirm({
            userID: this.userID,
            code: form.value['code']
        })
        .subscribe((data) => {
            this.isError = false;
            this.isLoading = false;

            if (data.role == UserRole.Specialist) {
                this.router.navigate(['/profile-specialist']);

                return;
            }

            if (this.isReg) {
                const specialistID = LocalStorageHelper.getSpecialist();
                
                if (specialistID) {
                    this.specialistsService.getSpecialist(specialistID)
                        .subscribe(specialistResponse => {
                            this.createSession(specialistResponse.data);
                        });
                }
            }

        }, (fail) => {
            this.errorText = fail.error.message;
            this.isError = true;
            this.isLoading = false;
        });
    }

    private createSession(specialist: Specialist) {
        this.patientService.getProblems()
            .subscribe(problemsResponse => {
                const problem = problemsResponse.data[0];

                this.patientService.createProblemSession({ specialistID: specialist.id }, problem.id)
                    .subscribe(createSessionResponse => {
                        this.walletsService.getMyWallet()
                            .subscribe(walletResponse => {
                                if ((walletResponse.data.balance - walletResponse.data.lockedBalance) < specialist.price) {
                                    this.router.navigate([`/profile/problems/${problem.id}/choose-specialist/${specialist.id}/pay`]);
                        
                                    return;
                                }

                                this.patientService.startSession(problem.id, createSessionResponse.sessionID)
                                    .subscribe(startSessionResponse => {
                                        if (startSessionResponse.success) {
                                            this.router.navigate(['/profile']);
                                        }
                                    });
                            });
                    });
            });
    }

    public backToAuth() {
        this.router.navigate(['/sign-in']);
    }
}