import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/common/services/auth.service';
import { Location } from '@angular/common';
import { UserRole } from 'src/app/common/enums';

@Component({
	selector: 'app-signin',
	templateUrl: './sign-in.component.html',
	styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

    public isLoading = false;
    public isPhoneValid = false;

    @ViewChild("phone") phone: ElementRef;

    public signInForm: FormGroup;
    public isError = false;
    public errorText: string;

    constructor(
        private authService: AuthService,
        private router: Router
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

        this.createSignInForm();
    }

    private createSignInForm(): void {
        this.signInForm = new FormGroup({
            phone: new FormControl(null, [Validators.required]),
            captchaValid: new FormControl(false)
        });
    }

    public inputEvent(event) {
        this.isError = false;

        setTimeout(() => {
            this.errorText = null;
        }, 300);

        this.signInForm.controls['phone'].setValue(event.target.value);

        if (this.isValidPhoneNumber(this.normalizePhoneNumber(this.signInForm.value['phone']))) {
            this.isPhoneValid = true;
        } else {
            this.isPhoneValid = false;
        }
    }

    isValidPhoneNumber(value: string) {
        if (!value)
            return false;

        if (value.includes('_'))
            return false;

        return true;
    }

    public submit(form: FormGroup): void {
        if (this.isLoading) {
            return;
        }

        this.isError = false;
        this.isLoading = true;
        
        const phoneNumber = this.normalizePhoneNumber(form.value['phone']);

        if (!this.isValidPhoneNumber(phoneNumber)) {
            this.isLoading = false;
            return;
        }

        this.authService.signIn({ phoneNumber })
            .subscribe(
                (data) => {
                    this.router.navigate(['/sign-in/confirm'], {
                        queryParams: {
                            id: data.userID
                        },
                        state: {
                            isReg: false
                        }
                    });

                    return;
                },
                (fail) => {
                    this.errorText = fail.error.message;
                    this.isError = true;
                    this.isLoading = false;

                    return;
                }
            );
    }

    private normalizePhoneNumber(value: string): string {
        if (!value) return value;

        return value.replace(/-/g, "").replace(/ /g, "").replace("(", "").replace(")", "");
    }

    public labelClick() {
        this.phone.nativeElement.focus();
    }

    public captchaResolved(event) {
        if (event) {
            this.signInForm.controls['captchaValid'].setValue(true);
        }
    }
}
