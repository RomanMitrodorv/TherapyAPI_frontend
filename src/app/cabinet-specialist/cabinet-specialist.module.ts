import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '../layout/layout.module';
import { ProfileSpecialistComponent } from './components/profile-specialist/profile-specialist.component';
import { ProfileSpecialistSidebarComponent } from './components/profile-specialist-sidebar/profile-specialist-sidebar.component';
import { ProfileSpecialistArticlesComponent } from './components/profile-specialist-articles/profile-specialist-articles.component';
import { ProfileSpecialistCreateArticleComponent } from './components/profile-specialist-create-article/profile-specialist-create-article.component';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { ProfileSpecialistEditArticleComponent } from './components/profile-specialist-edit-article/profile-specialist-edit-article.component';
import { ProfileSpecialistClientsComponent } from './components/profile-specialist-clients/profile-specialist-clients.component';
import { ProfileSpecialistClientComponent } from './components/profile-specialist-client/profile-specialist-client.component';
import { ProfileSpecialistSessionsComponent } from './components/profile-specialist-sessions/profile-specialist-sessions.component';
import { ProfileSpecialistReviewsComponent } from './components/profile-specialist-reviews/profile-specialist-reviews.component';
import { ProfileSpecialistProblemAssetsComponent } from './components/profile-specialist-problem-assets/profile-specialist-problem-assets.component';

import { MatSliderModule } from '@angular/material/slider';
import { FilterHiddenImagesPipe } from '../common/pipes';
import { ProfileSpecialistHeaderComponent } from './components/profile-specialist-header/profile-specialist-header.component';
import { ProfileSpecialistDeleteDialog } from './components/profile-specialist-delete-dialog/profile-specialist-delete-dialog.component';
import { CountdownModule } from '../common/modules';

@NgModule({
    declarations: [
        ProfileSpecialistComponent,
        ProfileSpecialistHeaderComponent,
        ProfileSpecialistSidebarComponent,
        ProfileSpecialistArticlesComponent,
        ProfileSpecialistCreateArticleComponent,
        ProfileSpecialistEditArticleComponent,
        ProfileSpecialistClientsComponent,
        ProfileSpecialistClientComponent,
        ProfileSpecialistSessionsComponent,
        ProfileSpecialistReviewsComponent,
        ProfileSpecialistProblemAssetsComponent,
        ProfileSpecialistDeleteDialog,
        FilterHiddenImagesPipe
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        LayoutModule,
        MatSliderModule,
        CountdownModule,
        FroalaEditorModule.forRoot(),
        FroalaViewModule.forRoot()
    ],
    providers: [
        
    ]
})
export class CabinetSpecialistModule { }