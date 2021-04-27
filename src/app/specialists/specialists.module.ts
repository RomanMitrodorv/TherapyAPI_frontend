import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '../layout/layout.module';
import { RouterModule } from '@angular/router';
import { SpecialistsComponent } from './components/specialists/specialists.component';
import { SpecialistComponent } from './components/specialist/specialist.component';
import { SpecialistCardComponent } from './components/specialis-card/specialist-card.component';
import { MainModule } from '../main/main.module';

@NgModule({
    declarations: [
        SpecialistsComponent,
        SpecialistComponent,
        SpecialistCardComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        LayoutModule,
        MainModule
    ],
    exports: [
        SpecialistCardComponent
    ],
    providers: [
        
    ]
})
export class SpecialistsModule { }