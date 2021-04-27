import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ArticlesService } from 'src/app/common/services';
import { Article } from 'src/app/common/models';

@Component({
    selector: 'profile-specialist-delete-dialog',
    templateUrl: './profile-specialist-delete-dialog.component.html',
    styleUrls: ['./profile-specialist-delete-dialog.component.scss']
})
export class ProfileSpecialistDeleteDialog implements OnInit {

    isVisible = false;

    public article: Article;

    constructor(
        private router: Router,
        private articlesService: ArticlesService
    ) { }

    ngOnInit(): void {
        document.body.onclick = (event: any) => {
            if (!event.target.classList.contains('modal-button')) {
                if (event.target.parentNode.classList.contains('show')) {
                    this.close();
                }
            }
        }
    }

    open(article: Article) {
        this.article = article;
        this.isVisible = true;
    }

    close() {
        this.article = null;
        this.isVisible = false;
    }

    deleteArticle() {
        this.articlesService.deleteArticle(this.article.id)
            .subscribe((response) => {
                this.close();
                this.router.navigate(['/profile-specialist/articles']);
            });
    }
}