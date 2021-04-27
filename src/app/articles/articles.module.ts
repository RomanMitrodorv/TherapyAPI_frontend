import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '../layout/layout.module';
import { RouterModule } from '@angular/router';
import { ArticlesComponent } from './components/articles/articles.component';
import { ArticleComponent } from './components/article/article.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        ArticlesComponent,
        ArticleComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        LayoutModule,
        FormsModule
    ],
    providers: [
        
    ]
})
export class ArticlesModule { }