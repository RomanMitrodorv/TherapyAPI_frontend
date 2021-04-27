import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { PaginationComponent } from './pagination/pagination.component';
import { AlertComponent } from './alert/alert.component';
import { ReviewScoreComponent } from './review-score/review-score.component';
import { RatingComponent } from './rating/rating.component';

import { NgxMaskModule } from 'ngx-mask';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NotFoundComponent } from './not-found/not-found.component';
import { ChooseSpecialistDialogComponent } from '../choose-specialist-dialog/choose-specialist-dialog.component';
import { FormsModule } from '@angular/forms';

@NgModule({
	declarations: [
		HeaderComponent,
		FooterComponent,
		PaginationComponent,
		AlertComponent,
		ReviewScoreComponent,
		RatingComponent,
		NotFoundComponent,
		ChooseSpecialistDialogComponent
	],
	imports: [
        BrowserModule,
		RouterModule,
		FormsModule,
		MatProgressSpinnerModule,
		NgxMaskModule.forRoot()
	],
	exports: [
		HeaderComponent,
		FooterComponent,
		PaginationComponent,
		AlertComponent,
		ReviewScoreComponent,
		RatingComponent,
		NotFoundComponent,
		MatProgressSpinnerModule,
		NgxMaskModule,
		ChooseSpecialistDialogComponent
	],
	providers: [
		
	],
})
export class LayoutModule { }
