import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { LayoutModule } from '../layout/layout.module';
import { ProfileSidebarComponent } from './components/profile-sidebar/profile-sidebar.component';
import { ProblemComponent } from './components/problem/problem.component';
import { ChooseSpecialistComponent } from './components/choose-specialist/choose-specialist.component';
import { SpecialistsModule } from '../specialists/specialists.module';
import { CreateProblemComponent } from './components/create-problem/create-problem.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CabinetDepositComponent } from './components/deposit/deposit.component';
import { ProblemAssetsComponent } from './components/problem-assets/problem-assets.component';
import { CabinetPaySpecialistComponent } from './components/pay-specialist/pay-specialist.component';
import { CabinetSessionSuccessComponent } from './components/session-success/session-success.component';
import { ProfileHeaderComponent } from './components/profile-header/profile-header.component';
import { RefundComponent } from './components/refund/refund.component';
import { CountdownModule } from '../common/modules';
import { SettingsComponent } from './components/settings/settings.component';
import { CabinetSessionVerificationComponent } from './components/session-verification/session-verification.component';
 
@NgModule({
    declarations: [
        ProfileComponent,
        SettingsComponent,
        ProfileHeaderComponent,
        ProfileSidebarComponent,
        ProblemComponent,
        ChooseSpecialistComponent,
        CreateProblemComponent,
        CabinetDepositComponent,
        CabinetPaySpecialistComponent,
        ProblemAssetsComponent,
        CabinetSessionSuccessComponent,
        CabinetSessionVerificationComponent,
        RefundComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        LayoutModule,
        SpecialistsModule,
        NgxSpinnerModule,
        CountdownModule
    ],
    providers: [
        
    ]
})
export class CabinetModule { }