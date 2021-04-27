import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '../layout/layout.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CustomersComponent } from './components/customers/customers.component';
import { SuperadminService } from './services';
import { CustomerComponent } from './components/customer/customer.component';
import { CountdownModule } from '../common/modules';
import { SuperadminReviewsComponent } from './components/reviews/reviews.component';
import { FilesComponent } from './components/files/components/files/files.component';
import { UploadFileDialogComponent } from './components/files/components/upload-file-dialog/upload-file-dialog.component';
import { SuperadminVideoReviewsCreateComponent } from './components/video-reviews/components/create-edit-review/video-reviews-create.component';
import { SuperadminVideoReviewsComponent } from './components/video-reviews/components/reviews-list/video-reviews.component';
import { ChooseReviewDialogComponent } from './components/video-reviews/components/choose-review-dialog/choose-review-dialog.component';
import { ArticlesListComponent } from './components/articles/components/articles-list/articles-list.component';
import { ArticleViewComponent } from './components/articles/components/article-view/article-view.component';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

@NgModule({
    declarations: [
        DashboardComponent,
        SidebarComponent,
        CustomersComponent,
        CustomerComponent,
        FilesComponent,
        UploadFileDialogComponent,
        ChooseReviewDialogComponent,
        SuperadminReviewsComponent,
        SuperadminVideoReviewsComponent,
        SuperadminVideoReviewsCreateComponent,
        ArticlesListComponent,
        ArticleViewComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        LayoutModule,
        CountdownModule,
        FroalaEditorModule.forRoot(),
        FroalaViewModule.forRoot()
    ],
    providers: [
        SuperadminService
    ]
})
export class SuperAdminModule { }