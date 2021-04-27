import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService, PatientService } from 'src/app/common/services';
import { Session } from 'src/app/common/models';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
	selector: 'cabinet-session-verification',
	templateUrl: './session-verification.component.html',
	styleUrls: ['./session-verification.component.scss']
})
export class CabinetSessionVerificationComponent implements OnInit {
    
    public reviewForm: FormGroup;

    public reviewScore = 0;
    public session: Session;

    constructor(
        private authService: AuthService,
        private patientService: PatientService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        
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
                        this.loadSession(params['id'], params['sessionID']);
                        this.initReviewForm();
                    });
            });
    }

    private initReviewForm() {
        this.reviewForm = new FormGroup({
            reviewText: new FormControl(null, [Validators.required]),
            score: new FormControl(0, [Validators.required])
        });
    }

    private loadSession(problemID: number ,sessionID: number) {
        this.patientService.getSession(problemID, sessionID)
            .subscribe(res => {
                if (!res.success) {
                    return;
                }

                this.session = res.data;
            });
    }

    setReviewScore(score: number) {
        this.reviewScore = score;

        this.reviewForm.controls['score'].setValue(score);
    }

    normalizeMonth(monthStr: string) {
        return monthStr.replace(".", "").substr(0, 3);
    }

    submit(form: FormGroup) {
        if (form.invalid) {
            return;
        }

        // TODO Если отзыв уже оставлен

        this.patientService
            .createReview(form.value, this.session.problem.id, this.session.id)
            .subscribe(res => {
                if (!res.success) {
                    return;
                }

                this.router.navigate(['/profile']);
            });
    }
}