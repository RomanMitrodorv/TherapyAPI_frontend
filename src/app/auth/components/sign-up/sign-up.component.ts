import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/common/services';
import { Router, ActivatedRoute } from '@angular/router';
import { SignUpRequest } from 'src/app/common/models/request';

@Component({
	selector: 'app-signup',
	templateUrl: './sign-up.component.html',
	styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

    public isLoading = false;
    public isError = false;
    public errorText: string;

    public signUpForm: FormGroup;

    @ViewChild("firstName") firstName: ElementRef;
    @ViewChild("lastName") lastName: ElementRef;
    @ViewChild("phoneNumber") phoneNumber: ElementRef;
    @ViewChild("email") email: ElementRef;
    @ViewChild("problem") problem: ElementRef;
    @ViewChild("privacy") privacy: ElementRef;

    constructor(
        private authService: AuthService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.authService.isLoggedIn
            .subscribe(logged => {
                if (logged) {
                    this.router.navigate(['/']);
                }
            });
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

        this.createSignUpForm();
    }

    private createSignUpForm(): void {
        this.signUpForm = new FormGroup({
            firstName: new FormControl(null, [Validators.required]),
            lastName: new FormControl(null, [Validators.required]),
            phoneNumber: new FormControl(null, [Validators.required]),
            email: new FormControl(null, [Validators.required]),
            problem: new FormControl(null, [Validators.required]),
            privacy: new FormControl(false, [Validators.required]),
            captchaValid: new FormControl(false)
        });

        this.signUpForm.controls["firstName"]
            .valueChanges
            .subscribe(value => {
                if (!value || value == "") {
                    this.signUpForm.controls["firstName"].reset();
                }
            });

        this.signUpForm.controls["lastName"]
            .valueChanges
            .subscribe(value => {
                if (!value || value == "") {
                    this.signUpForm.controls["lastName"].reset();
                }
            });
    }

    public inputEvent(control: string ,event) {
        if (control == "phoneNumber") {
            this.signUpForm.controls['phoneNumber'].setValue(event.target.value);
            
            const phone = this.normalizePhoneNumber(this.signUpForm.value['phoneNumber']);
        }

        this.isError = false;

        setTimeout(() => {
            this.errorText = null;
        }, 300);
    }

    public togglePrivacy() {
        this.privacy.nativeElement.click();

        this.isError = false;

        setTimeout(() => {
            this.errorText = null;
        }, 300);
    }

    private normalizePhoneNumber(value: string): string {
        if (!value) return value;

        return value.replace(/-/g, "").replace(/ /g, "").replace("(", "").replace(")", "");
    }

    isFormValid() {
        const phone = this.normalizePhoneNumber(this.signUpForm.value['phoneNumber']);

        if (!phone) {
            return false;
        }

        if (phone.includes('_')) {
            return false;
        }


        if  (!this.signUpForm.value['captchaValid']) {
            return false;
        }

        if (this.signUpForm.invalid) {
            return false;
        }

        return true;
    }

    public submit(form: FormGroup) {
        if (this.isLoading) {
            return;
        }

        this.isError = false;
        this.isLoading = true;

        const phone = this.normalizePhoneNumber(form.value['phoneNumber']);

        if (!phone) {
            this.isLoading = false;
            return;
        }

        if (phone.includes('_')) {
            this.isLoading = false;
            return;
        }

        const request: SignUpRequest = form.value;
        request.phoneNumber = phone;

        this.authService.signUp(request)
            .subscribe(data => {
                this.isLoading = false;
                
                this.router.navigate(['/sign-in/confirm'], {
                    queryParams: {
                        id: data.userID
                    },
                    state: {
                        isReg: true
                    }
                });
            },
            fail => {
                this.errorText = fail.error.message;
                this.isError = true;
                this.isLoading = false;
            });
    }

    public labelClick(elem) {
        this[elem].nativeElement.focus();
    }

    public captchaResolved(event) {
        if (event) {
            this.signUpForm.controls['captchaValid'].setValue(true);
        }
    }
}