import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService, PatientService } from 'src/app/common/services';
import { Problem } from 'src/app/common/models';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

    public problems: Problem[];
    public isAlertShow = false;
    public alertText: string;
    
    constructor(
        private authService: AuthService,
        private patientService: PatientService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.route.queryParams
            .subscribe(params => {
                const deposit = params['deposit'];

                if (deposit) {
                    if (deposit == "success") {
                        this.showAlert("Счёт успешно пополнен");
                    }
                }
            });
    }

    ngOnInit(): void {
        this.authService.isLoggedIn
            .subscribe(logged => {
                if (!logged) {
                    this.router.navigate(['/sign-in']);

                    return;
                }

                this.loadProblems();
            });
    }

    private loadProblems() {
        this.patientService.getProblems()
            .subscribe(res => {
                if (!res.success) {
                    return;
                }

                this.problems = res.data;
            });
    }

    showAlert(text: string) {
        this.alertText = text;
        this.isAlertShow = true;

        setTimeout(() => {
            this.hideAlert()
        }, 2000);
    }

    hideAlert() {
        this.isAlertShow = false;
        this.alertText = "";
    }
}