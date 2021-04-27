import { NgModule, Injectable } from '@angular/core';
import { Routes, RouterModule, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { SignInComponent } from './auth/components/sign-in/sign-in.component';
import { ConfirmationComponent } from './auth/components/confirmation/confirmation.component';
import { SignUpComponent } from './auth/components/sign-up/sign-up.component';
import { ProfileComponent } from './cabinet/components/profile/profile.component';
import { LandingComponent } from './main/components/landing/landing.component';
import { MainComponent } from './main/components/main/main.component';
import { SpecialistsComponent } from './specialists/components/specialists/specialists.component';
import { SpecialistComponent } from './specialists/components/specialist/specialist.component';
import { ArticlesComponent } from './articles/components/articles/articles.component';
import { ArticleComponent } from './articles/components/article/article.component';
import { ProfileSpecialistArticlesComponent } from './cabinet-specialist/components/profile-specialist-articles/profile-specialist-articles.component';
import { ProfileSpecialistComponent } from './cabinet-specialist/components/profile-specialist/profile-specialist.component';
import { ProfileSpecialistCreateArticleComponent } from './cabinet-specialist/components/profile-specialist-create-article/profile-specialist-create-article.component';
import { ProfileSpecialistEditArticleComponent } from './cabinet-specialist/components/profile-specialist-edit-article/profile-specialist-edit-article.component';
import { ChooseSpecialistComponent } from './cabinet/components/choose-specialist/choose-specialist.component';
import { CreateProblemComponent } from './cabinet/components/create-problem/create-problem.component';
import { CabinetDepositComponent } from './cabinet/components/deposit/deposit.component';
import { ProblemAssetsComponent } from './cabinet/components/problem-assets/problem-assets.component';
import { CabinetPaySpecialistComponent } from './cabinet/components/pay-specialist/pay-specialist.component';
import { CabinetSessionSuccessComponent } from './cabinet/components/session-success/session-success.component';
import { ProfileSpecialistClientsComponent } from './cabinet-specialist/components/profile-specialist-clients/profile-specialist-clients.component';
import { ProfileSpecialistClientComponent } from './cabinet-specialist/components/profile-specialist-client/profile-specialist-client.component';
import { ProfileSpecialistSessionsComponent } from './cabinet-specialist/components/profile-specialist-sessions/profile-specialist-sessions.component';
import { ProfileSpecialistReviewsComponent } from './cabinet-specialist/components/profile-specialist-reviews/profile-specialist-reviews.component';
import { ProfileSpecialistProblemAssetsComponent } from './cabinet-specialist/components/profile-specialist-problem-assets/profile-specialist-problem-assets.component';
import { RefundComponent } from './cabinet/components/refund/refund.component';
import { NotFoundComponent } from './layout/not-found/not-found.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { OfferComponent } from './offer/offer.component';
import { AuthGuardService as AuthGuard } from './common/services';
import { LoggedGuardService as LoggedGuard } from './common/services';
import { RoleGuardService as RoleGuard } from './common/services';
import { SettingsComponent } from './cabinet/components/settings/settings.component';
import { DashboardComponent } from './superadmin/components/dashboard/dashboard.component';
import { SuperadminGuardService as SuperadminGuard } from './common/services';
import { CustomersComponent } from './superadmin/components/customers/customers.component';
import { CustomerComponent } from './superadmin/components/customer/customer.component';
import { SuperadminReviewsComponent } from './superadmin/components/reviews/reviews.component';
import { SignUpSpecialistComponent } from './auth/components/sign-up-specialist/sign-up-specialist.component';
import { FilesComponent } from './superadmin/components/files/components/files/files.component';
import { SuperadminVideoReviewsCreateComponent } from './superadmin/components/video-reviews/components/create-edit-review/video-reviews-create.component';
import { SuperadminVideoReviewsComponent } from './superadmin/components/video-reviews/components/reviews-list/video-reviews.component';
import { ArticlesListComponent } from './superadmin/components/articles/components/articles-list/articles-list.component';
import { ArticleViewComponent } from './superadmin/components/articles/components/article-view/article-view.component';
import { CabinetSessionVerificationComponent } from './cabinet/components/session-verification/session-verification.component';

const routes: Routes = [
	{
		path: '',
		component: MainComponent
	},

	{
		path: 'sign-up',
		component: SignUpComponent,
		canActivate: [LoggedGuard]
	},

	{
		path: 'sign-up/specialist',
		component: SignUpSpecialistComponent,
		canActivate: [LoggedGuard]
	},

	{
		path: 'sign-in',
		component: SignInComponent,
		canActivate: [LoggedGuard]
	},

	{
		path: 'sign-in/confirm',
		component: ConfirmationComponent,
		canActivate: [LoggedGuard]
	},

	{
		path: 'landing',
		component: LandingComponent
	},

	{
		path: 'articles',
		component: ArticlesComponent
	},

	{
		path: 'articles/:id',
		component: ArticleComponent
	},

	{
		path: 'specialists',
		component: SpecialistsComponent
	},

	{
		path: 'specialists/:id',
		component: SpecialistComponent
	},

	{
		path: 'profile',
		component: ProfileComponent,
		canActivate: [AuthGuard]
	},

	{
		path: 'profile/settings',
		component: SettingsComponent,
		canActivate: [AuthGuard]
	},

	{
		path: 'profile/deposit', 
		component: CabinetDepositComponent, 
		canActivate: [AuthGuard]
	},

	{
		path: 'profile/problems/:id/choose-specialist', 
		component: ChooseSpecialistComponent, 
		canActivate: [AuthGuard]
	},

	{
		path: 'profile/problems/:id/choose-specialist/:specialistID/pay', 
		component: CabinetPaySpecialistComponent, 
		canActivate: [AuthGuard]
	},
	
	{
		path: 'profile/problems/:id/assets', 
		component: ProblemAssetsComponent, 
		canActivate: [AuthGuard]
	},
	
	{
		path: 'profile/problems/:id/sessions/:sessionID/review', 
		component: CabinetSessionSuccessComponent, 
		canActivate: [AuthGuard]
	},

	{
		path: 'profile/problems/:problemID/sessions/:sessionID/refund',
		component: RefundComponent,
		canActivate: [AuthGuard]
	},

	{
		path: 'profile/problems/:id/sessions/:sessionID/refund/review',
		component: CabinetSessionVerificationComponent,
		canActivate: [AuthGuard]
	},
	
	{ 
		path: 'profile/problems/add', 
		component: CreateProblemComponent, 
		canActivate: [AuthGuard]
	},

	{ 
		path: 'profile-specialist', 
		component: ProfileSpecialistComponent, 
		canActivate: [RoleGuard]
	},
	
	{ 
		path: 'profile-specialist/articles', 
		component: ProfileSpecialistArticlesComponent, 
		canActivate: [RoleGuard]
	},
	
	{ 
		path: 'profile-specialist/articles/create', 
		component: ProfileSpecialistCreateArticleComponent, 
		canActivate: [RoleGuard]
	},
	
	{ 
		path: 'profile-specialist/articles/:id', 
		component: ProfileSpecialistEditArticleComponent, 
		canActivate: [RoleGuard]
	},

	{ 
		path: 'profile-specialist/clients', 
		component: ProfileSpecialistClientsComponent, 
		canActivate: [RoleGuard]
	},

	{ 
		path: 'profile-specialist/clients/:id', 
		component: ProfileSpecialistClientComponent, 
		canActivate: [RoleGuard]
	},

	{ 
		path: 'profile-specialist/sessions', 
		component: ProfileSpecialistSessionsComponent, 
		canActivate: [RoleGuard]
	},
	
	{ 
		path: 'profile-specialist/reviews', 
		component: ProfileSpecialistReviewsComponent, 
		canActivate: [RoleGuard]
	},

	{ 
		path: 'profile-specialist/clients/:clientID/problems/:problemID/assets', 
		component: ProfileSpecialistProblemAssetsComponent, 
		canActivate: [RoleGuard]
	},

	{
		path: 'privacy',
		component: PrivacyComponent
	},

	{
		path: 'offer',
		component: OfferComponent
	},

	{ 
		path: 'superadmin/customers', 
		component: CustomersComponent, 
		canActivate: [SuperadminGuard]
	},

	{ 
		path: 'superadmin/customers/:customerID', 
		component: CustomerComponent, 
		canActivate: [SuperadminGuard]
	},

	{ 
		path: 'superadmin/files', 
		component: FilesComponent, 
		canActivate: [SuperadminGuard]
	},

	{ 
		path: 'superadmin/articles', 
		component: ArticlesListComponent, 
		canActivate: [SuperadminGuard]
	},

	{ 
		path: 'superadmin/articles/:id', 
		component: ArticleViewComponent, 
		canActivate: [SuperadminGuard]
	},

	{ 
		path: 'superadmin/reviews/video', 
		component: SuperadminVideoReviewsComponent, 
		canActivate: [SuperadminGuard]
	},

	{ 
		path: 'superadmin/reviews/video/:id', 
		component: SuperadminVideoReviewsCreateComponent, 
		canActivate: [SuperadminGuard]
	},

	{ 
		path: 'superadmin/reviews/video/create', 
		component: SuperadminVideoReviewsCreateComponent, 
		canActivate: [SuperadminGuard]
	},

	{
		path: '404',
		component: NotFoundComponent
	},

	{
		path: '**', 
		redirectTo: '/404'
	}
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, {
			onSameUrlNavigation: 'reload',
			scrollPositionRestoration: 'disabled',
			anchorScrolling: 'enabled'
		})
	],
	exports: [RouterModule]
})
export class AppRoutingModule { }
