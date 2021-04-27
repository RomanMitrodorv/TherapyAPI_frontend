import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpecialistsService, StorageService, RouterExtService, AuthService, UsersService } from 'src/app/common/services';
import { Specialist, Review } from 'src/app/common/models';
import { ReviewType, UserRole } from 'src/app/common/enums';
import { Location } from '@angular/common';
import { LocalStorageHelper } from 'src/app/common/helpers';

type ReviewTab = 'positive' | 'neutral' | 'negative';

@Component({
	selector: 'app-specialist',
	templateUrl: './specialist.component.html',
	styleUrls: ['./specialist.component.scss']
})
export class SpecialistComponent implements OnInit {

	public isLoggedIn = false;
	public isSpecialist = false;

	public specialist: Specialist;
	public activeReviewsTab: ReviewTab = 'positive';

	public positiveReviews: Review[] = [];
    public neutralReviews: Review[] = [];
	public negativeReviews: Review[] = [];
	
	public pageSize = 4;
	public pageNumber = 1;
	public totalPages = 1;

	@ViewChild('reviewsTabs') private reviewsTabs: ElementRef<HTMLUListElement>;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private location: Location,
		private specialistsService: SpecialistsService,
		private storageService: StorageService,
		private authService: AuthService,
		private usersService: UsersService
	) {
		this.authService.isLoggedIn
			.subscribe(logged => {
				this.isLoggedIn = logged;
				
				if (logged) {
					this.usersService.getUserInfo()
						.subscribe(user => {
							if (user.role == UserRole.Specialist) {
								this.isSpecialist = true;

								return;
							}

							this.isSpecialist = false;
						});
				}
			});
	}

	prevRoute() {
		this.location.back();
	}

	ngOnInit() {
		this.route.params
			.subscribe(params => {
				const id = params['id'];

				if (!id) {
					this.router.navigate(['/specialists']);

					return;
				}

				this.loadSpecialist(id);
			});
	}

	async changeReviewsTab(tab: ReviewTab) {
		this.activeReviewsTab = tab;
		const reviews = await this.loadReviews(tab, this.pageNumber);

		switch (tab) {
			case "positive":
				this.positiveReviews = reviews.data;
				break;

			case "neutral":
				this.neutralReviews = reviews.data;
				break;

			case "negative":
				this.negativeReviews = reviews.data;
				break;
		}

		this.pageNumber = reviews.currentPage;
		this.totalPages = reviews.totalPages;

        const item = this.reviewsTabs.nativeElement.getElementsByTagName('li').namedItem(tab);
        const margin = parseInt(window.getComputedStyle(item).marginLeft);
        
        const scrollTo = (margin / 2) + (item.offsetLeft - item.offsetWidth);

        this.reviewsTabs.nativeElement.scrollTo({
            left: scrollTo,
            behavior: 'smooth'
        });
    }

	async setPageNumber(value: number) {
		const reviews = await this.loadReviews(this.activeReviewsTab, value);

		switch (this.activeReviewsTab) {
			case "positive":
				this.positiveReviews = reviews.data;
				break;

			case "neutral":
				this.neutralReviews = reviews.data;
				break;

			case "negative":
				this.negativeReviews = reviews.data;
				break;
		}

		this.pageNumber = reviews.currentPage;
		this.totalPages = reviews.totalPages;
	}

	private loadSpecialist(id: number) {
		this.specialistsService.getSpecialist(id)
			.subscribe(res => {
				if (!res.success) {
					return;
				}

				this.specialist = res.data;
				this.positiveReviews = this.specialist.reviews.filter(x => x.score > 3);
				this.neutralReviews = this.specialist.reviews.filter(x => x.score == 3);
				this.negativeReviews = this.specialist.reviews.filter(x => x.score < 3);

				this.route.queryParams
					.subscribe(params => {
						const reviewTab: ReviewTab = params['reviews'];
						const reviewID = params['review'];

						if (reviewTab) {
							//this.loadReviews(this.activeReviewsTab, this.pageNumber);
							this.changeReviewsTab(params['reviews'] as ReviewTab);
						}

						if (reviewID) {
							let review = this.specialist.reviews.find(x => x.id == Number(reviewID));

							if (review.score > 3) {
								this.changeReviewsTab("positive")
									.then(() => {
										let element = document.querySelector(`[review-id="${reviewID}"]`) as HTMLElement;
										element.scrollIntoView({ behavior: 'smooth', block: 'start' });
									});
							} else if (review.score == 3) {
								this.changeReviewsTab("neutral")
									.then(() => {
										let element = document.querySelector(`[review-id="${reviewID}"]`) as HTMLElement;
										element.scrollIntoView({ behavior: 'smooth', block: 'start' });
									})
							} else if (review.score < 3) {
								this.changeReviewsTab("negative")
									.then(() => {
										let element = document.querySelector(`[review-id="${reviewID}"]`) as HTMLElement;
										element.scrollIntoView({ behavior: 'smooth', block: 'start' });
									});
							}
						}
					});
			});
	}

	private loadReviews(type: ReviewTab, pageNumber: number) {
		return this.specialistsService.getSpecialistReviews({
			pageNumber: pageNumber,
			pageSize: this.pageSize,
			type: this.toTitleCase(type)
		}, this.specialist.id)
		.toPromise();
	}

	showSpecialistDialog(specialist: Specialist) {
		if (!this.isLoggedIn) {
			LocalStorageHelper.saveSpecialist(specialist);

            this.router.navigate(['/sign-up']);

            return;
		}

        let dialog = document.querySelector('.choose-specialist-dialog');
        dialog.classList.remove('hidden');
        dialog.classList.add('show');
        
        this.storageService.setSpecialist(specialist);
	}
	
	toTitleCase(value: string) {
		return value.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()});
	}
}