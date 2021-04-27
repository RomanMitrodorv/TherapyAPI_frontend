import { Component, OnInit } from '@angular/core';
import { AuthService, UsersService } from 'src/app/common/services';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Session } from 'src/app/common/models';

@Component({
	selector: 'app-refund',
	templateUrl: './refund.component.html',
	styleUrls: ['./refund.component.scss']
})
export class RefundComponent implements OnInit {
    
    public problemID: number;
    public sessionID: number;

    public refundForm: FormGroup;
    
    public documentFile: File;
    public selfieFile: File;

    constructor(
        private authService: AuthService,
        private usersService: UsersService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        
    }

    private initRefundForm() {
        this.refundForm = new FormGroup({
            document: new FormControl(null, [Validators.required]),
            selfie: new FormControl(null, [Validators.required])
        });
    }

    ngOnInit(): void {
        this.authService.isLoggedIn
            .subscribe(logged => {
                if (!logged) {
                    this.router.navigate(['/sign-in']);

                    return;
                }

                this.route.params
                    .subscribe(params => {
                        this.problemID = params['problemID'];
                        this.sessionID = params['sessionID'];

                        this.initRefundForm();
                    });
            });
    }

    valueChanged(file: File, control: string) {
        this[control] = file;
    }

    valueClear(control: string) {
        this[`${control}File`] = null;

        this.refundForm.controls[control].setValue(null);
    }

    submitRefundForm(form: FormGroup) {
        if (form.invalid) {
            return;
        }

        this.usersService.userVerification({
            document: this.documentFile,
            selfie: this.selfieFile
        }).subscribe(response => {
            if (response.success) {
                this.router.navigate([`profile/problems/${this.problemID}/sessions/${this.sessionID}/refund/review`]);
            }
        });
    }

    cancelRefund() {
        this.router.navigate(['/profile']);
    }

    normalizeMonth(monthStr: string) {
        return monthStr.replace(".", "").substr(0, 3);
    }
}