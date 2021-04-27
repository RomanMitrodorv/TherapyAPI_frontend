import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, PatientService, PaymentsService, RouterExtService } from 'src/app/common/services';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CreatePaymentRequest } from 'src/app/common/models/request';
import { PaymentType } from 'src/app/common/enums';
import { Location } from '@angular/common';

@Component({
	selector: 'cabinet-deposit',
	templateUrl: './deposit.component.html',
	styleUrls: ['./deposit.component.scss']
})
export class CabinetDepositComponent implements OnInit {

    public isLoading = false;

    public depositForm: FormGroup;
    
    constructor(
        private authService: AuthService,
        private paymentsService: PaymentsService,
        private router: Router,
        private location: Location
    ) {
        
    }

    ngOnInit(): void {
        this.authService.isLoggedIn
            .subscribe(logged => {
                if (!logged) {
                    this.router.navigate(['/sign-in']);
                }

                this.initDepositForm();
            });
    }

    prevRoute() {
		this.location.back();
	}

    private initDepositForm() {
        this.depositForm = new FormGroup({
            amount: new FormControl(null, [Validators.required])
        });
    }

    submit() {
        if (this.isLoading) {
            return;
        }

        if (this.depositForm.invalid) {
            return;
        }

        this.isLoading = true;

        const request: CreatePaymentRequest = {
            amount: parseInt(this.depositForm.value['amount']),
            type: PaymentType.Deposit
        };

        this.paymentsService.createPayment(request)
            .subscribe(res => {
                if (!res.success) {
                    return;
                }

                window.location.href = res.redirectUrl;
            });
    }
}