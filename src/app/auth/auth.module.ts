import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { RouterModule } from '@angular/router';
import { RecaptchaModule, RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';
import { CodeInputModule } from 'angular-code-input';
import { LayoutModule } from '../layout/layout.module';
import { SignUpSpecialistComponent } from './components/sign-up-specialist/sign-up-specialist.component';


@NgModule({
    declarations: [
        SignUpComponent,
        SignInComponent,
        ConfirmationComponent,
        SignUpSpecialistComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        LayoutModule,
        ReactiveFormsModule,
        RouterModule,
        RecaptchaModule,
        CodeInputModule
    ],
    providers: [
        {
            provide: RECAPTCHA_SETTINGS,
            useValue: { siteKey: '6LeUMK8ZAAAAAKam4hulJvhY4WTnPkZYltdJzUWK' } as RecaptchaSettings,
        },
    ]
})
export class AuthModule { }
