import { Component, AfterViewInit, Input, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { UserRole } from 'src/app/common/enums';
import { LocalStorageHelper } from 'src/app/common/helpers';
import { Specialist, SpecialistView } from 'src/app/common/models';
import { AuthService, StorageService, UsersService } from 'src/app/common/services';

@Component({
    selector: 'specialists-carousel',
	templateUrl: './specialists-carousel.component.html',
	styleUrls: ['./specialists-carousel.component.scss']
})
export class SpecialistsCarouselComponent implements OnInit, AfterViewInit {

    public isLoggedIn = false;
    public isSpecialist = false;

    @Input('specialists') specialists: SpecialistView[];

    config = {
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0
    };

    currentSlide = 0;

    constructor(
        private authService: AuthService,
        private usersService: UsersService,
        private storageService: StorageService,
        private router: Router
    ) {
        this.authService.isLoggedIn
            .subscribe(logged => {
                if(logged) {
                    this.isLoggedIn = logged;

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

    private sortReviews() {
        this.specialists.map(specialist => {
            specialist.positiveReviews = specialist.reviews.filter(x => x.score > 3);
            specialist.neutralReviews = specialist.reviews.filter(x => x.score == 3);
            specialist.negativeReviews = specialist.reviews.filter(x => x.score < 3);
        });
    }

    ngOnInit() {
        this.sortReviews();
    }

    ngAfterViewInit() {
        this.setSliderOffset();

        window.onresize = () => this.setSliderOffset();
    }

    setSliderOffset() {
        let element = document.querySelector("section.specialists .container");
        
        try {
            let style = window.getComputedStyle(element);

            let marginLeft = 0;
            let marginRight = 0;

            if (window.innerWidth > 991) {
                marginLeft = parseFloat(style.marginLeft);
                marginRight = parseFloat(style.marginRight);
            } else {
                marginLeft = parseFloat(style.paddingLeft);
                marginRight = parseFloat(style.paddingRight);
            }
            
            this.config.slidesOffsetBefore = marginLeft;
            this.config.slidesOffsetAfter = marginRight;
        } catch (e) {
            //alert(e);
        }
    }

    nextSlide() {
        if (this.currentSlide == (this.specialists.length - 1)) {
            this.currentSlide = 0;

            return;
        }

        this.currentSlide++;
    }

    prevSlide() {
        if (this.currentSlide == 0) {
            this.currentSlide = this.specialists.length - 1;

            return;
        }

        this.currentSlide--;
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
}
