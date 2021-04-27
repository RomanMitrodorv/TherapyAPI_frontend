import { Component, OnInit, ViewChild } from '@angular/core';
import { SpecialistsService, ArticlesService, AuthService, UsersService } from 'src/app/common/services';
import { Specialist, Article } from 'src/app/common/models';
import { SpecialistsCarouselComponent } from '../specialists-carousel/specialists-carousel.component';
import { UserRole } from 'src/app/common/enums';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

    public isSpecialist = false;

    public specialists: Specialist[];
    public articles: Article[];

    @ViewChild(SpecialistsCarouselComponent) specialistsCarousel: SpecialistsCarouselComponent;

    constructor(
        private specialistsService: SpecialistsService,
        private articlesService: ArticlesService,
        private authService: AuthService,
        private usersService: UsersService
    ) {
        this.authService.isLoggedIn
            .subscribe(logged => {
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

    ngOnInit(): void {
        this.loadSpecialists();
        this.loadArticles();
    }

    private loadSpecialists() {
        this.specialistsService.getSpecialists({
            pageNumber: 1,
            pageSize: 100000
        })
        .subscribe(res => {
            if (!res.success) {
                return;
            }

            this.specialists = res.data;
        });
    }

    private loadArticles() {
        this.articlesService.getArticles({
            pageNumber: 1,
            pageSize: 100000
        })
        .subscribe(res => {
            if (!res.success) {
                return;
            }

            this.articles = res.data;
        });
    }

    specialistsCarouselPrevSlide() {
        this.specialistsCarousel.prevSlide();
    }

    specialistsCarouselNextSlide() {
        this.specialistsCarousel.nextSlide();
    }

    scrollToElement(elementID: string) {
        const element = document.getElementById(elementID);

        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });

            return true;
        }

        return false;
    }
}