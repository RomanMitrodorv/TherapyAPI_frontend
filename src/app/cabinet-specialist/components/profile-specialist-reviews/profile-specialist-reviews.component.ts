import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SpecialistService, AuthService } from 'src/app/common/services';
import { Specialist, SpecialistProfile, Session, Review } from 'src/app/common/models';

type ReviewTab = 'Positive' | 'Neutral' | 'Negative';

@Component({
	selector: 'app-profile-specialist-reviews',
	templateUrl: './profile-specialist-reviews.component.html',
	styleUrls: ['./profile-specialist-reviews.component.scss']
})
export class ProfileSpecialistReviewsComponent implements OnInit {

    public activeTab: ReviewTab = 'Positive';
    
    public positiveReviews: Review[] = [];
    public neutralReviews: Review[] = [];
    public negativeReviews: Review[] = [];
    
    @ViewChild('reviewsTabs') private reviewsTabs: ElementRef<HTMLUListElement>;

    constructor(
        private authService: AuthService,
        private specialistService: SpecialistService,
        private router: Router,
        private route: ActivatedRoute
    ) {

    }

    private loadReviews() {
        this.specialistService.getReviews()
            .subscribe(response => {
                this.positiveReviews = response.positiveReviews;
                this.neutralReviews = response.neutralReviews;
                this.negativeReviews = response.negativeReviews;
            });
    }

    ngOnInit(): void {
        this.authService.isLoggedIn
            .subscribe(logged => {
                if (!logged) {
                    this.router.navigate(['/']);

                    return;
                }

                this.route.queryParams
                    .subscribe(params => {
                        const tab = params['tab'];

                        if (!tab) {
                            return;
                        }

                        this.setActiveTab(tab);
                    });

                this.loadReviews();
            });
    }

    setActiveTab(tab: ReviewTab) {
        this.activeTab = tab;

        if (!this.reviewsTabs) {
            return;
        }

        const item = this.reviewsTabs.nativeElement.getElementsByTagName('li').namedItem(tab);
        const margin = parseInt(window.getComputedStyle(item).marginLeft);
        
        const scrollTo = (margin / 2) + (item.offsetLeft - item.offsetWidth);

        this.reviewsTabs.nativeElement.scrollTo({
            left: scrollTo,
            behavior: 'smooth'
        });
    }
}