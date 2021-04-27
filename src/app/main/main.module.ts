import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { LandingHeaderComponent } from './components/landing-header/landing-header.component';
import { LandingFooterComponent } from './components/landing-footer/landing-footer.component';
import { ModalComponent } from '../layout/modal/modal.component';
import { WebinarModalComponent } from './components/webinar-modal/webinar-modal.component';
import { SafePipe, FilterArticlesPipe } from '../common/pipes';
import { MainComponent } from './components/main/main.component';
import { LayoutModule } from '../layout/layout.module';
//import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { VideoReviewsComponent } from './components/video-reviews/video-reviews.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { SpecialistsCarouselComponent } from './components/specialists-carousel/specialists-carousel.component';
import { ArticlesCarouselComponent } from './components/articles-carousel/articles-carousel.component';
import { ArticlesCarouselItemComponent } from './components/articles-carousel-item/articles-carousel-item.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ChooseSpecialistDialogComponent } from '../choose-specialist-dialog/choose-specialist-dialog.component';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
    direction: 'horizontal',
    slidesPerView: 'auto'
};

@NgModule({
    declarations: [
        MainComponent,
        LandingComponent,
        LandingHeaderComponent,
        LandingFooterComponent,
        ModalComponent,
        WebinarModalComponent,
        VideoReviewsComponent,
        SpecialistsCarouselComponent,
        ArticlesCarouselComponent,
        ArticlesCarouselItemComponent,
        SafePipe,
        FilterArticlesPipe,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        LayoutModule,
        BrowserAnimationsModule,
        SwiperModule,
        NgxSpinnerModule
    ],
    exports: [
        
    ],
    providers: [
        {
            provide: SWIPER_CONFIG,
            useValue: DEFAULT_SWIPER_CONFIG
        }
    ]
})
export class MainModule { }