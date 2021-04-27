import { Component, OnInit, Input, ViewChild, AfterViewChecked } from '@angular/core';
import { Article } from 'src/app/common/models';
import { SwiperComponent, SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { AuthService, StorageService, UsersService } from 'src/app/common/services';
import { UserRole } from 'src/app/common/enums';

@Component({
    selector: 'articles-carousel',
    templateUrl: './articles-carousel.component.html',
    styleUrls: ['./articles-carousel.component.scss']
})
export class ArticlesCarouselComponent implements OnInit, AfterViewChecked {

    public isSpecialist = false;

    @Input('articles') articles: Article[];
    @ViewChild('articlesSwitcherMobile') articlesSwitcherMobile: SwiperComponent;

    public activeArticle: Article;
    public prevArticle: Article;

    public isLoading = false;

    articlesSwitcherConfig: SwiperConfigInterface = {
        centeredSlides: true
    }

    articlesSwitcherCurrentSlide = 0;

    constructor(
        private authService: AuthService,
        private usersService: UsersService
    ) {
        this.authService.isLoggedIn
            .subscribe(logged => {
                if(logged) {
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

    public setActiveArticle(article: Article) {
        this.activeArticle = article;

        let activeIndex = this.articles.indexOf(this.activeArticle);

        if (activeIndex != 0) {
            this.prevArticle = this.articles[activeIndex - 1];
        } else {
            this.prevArticle = null;
        }

        this.articlesSwitcherCurrentSlide = activeIndex;
    }

    public toggleNextArticle() {
        let activeIndex = this.articles.indexOf(this.activeArticle);

        if (activeIndex == (this.articles.length - 1)) {
            return;
        }

        let timeout = setTimeout(() => {
            this.setActiveArticle(this.articles[activeIndex + 1]);
        }, 100);
    }

    public togglePrevArticle() {
        let activeIndex = this.articles.indexOf(this.activeArticle);

        if (activeIndex == 0) {
            return;
        }

        let timeout = setTimeout(() => {
            this.setActiveArticle(this.articles[activeIndex - 1]);
        }, 100);
    }

    ngOnInit() {
        this.setActiveArticle(this.articles[0]);
    }

    ngAfterViewChecked() {
        if (!this.articlesSwitcherMobile) {
            return;
        }
        
        this.articlesSwitcherMobile.indexChange
            .subscribe(slide => {

                let timeout = setTimeout(() => {
                    this.setActiveArticle(this.articles[slide]);
                }, 100);
            });
    }
}