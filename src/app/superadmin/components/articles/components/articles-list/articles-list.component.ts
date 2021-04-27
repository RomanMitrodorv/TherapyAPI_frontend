import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, UsersService, ArticlesService } from 'src/app/common/services';
import { ArticleModerationStatus, UserRole } from 'src/app/common/enums';
import { Article, ArticlePublish } from 'src/app/common/models';
import { PaginationComponent } from 'src/app/layout/pagination/pagination.component';
import { SuperadminService } from 'src/app/superadmin/services';

@Component({
    selector: 'superadmin-articles-list',
    templateUrl: './articles-list.component.html',
    styleUrls: ['./articles-list.component.scss']
})
export class ArticlesListComponent implements OnInit {

    public articles: ArticlePublish[];

    public pageSize = 5;
    public pageNumber = 1;
    public totalPages = 1;

    @ViewChild(PaginationComponent) pagination: PaginationComponent;

    constructor(
        private superadminService: SuperadminService
    ) { }

    ngOnInit(): void {
        this.loadArticles(this.pageSize, this.pageNumber);
    }

    private loadArticles(pageSize: number, pageNumber: number) {
        this.superadminService.getArticles({ pageSize, pageNumber })
            .subscribe(response => {
                this.articles = response.data;
                this.pageNumber = response.currentPage;
                this.pageSize = response.pageSize;
                this.totalPages = response.totalPages;
            });
    }

    getModerationStatus(article: ArticlePublish) {
        switch (article.status) {
            case 1:
                return 'Новая';
            case 2:
                return 'Одобрена';
            case 3:
                return 'Отклонена';
            default:
                return '';
        }
    }

    setPageSize(value: number) {
        if (!this.articles.length) {
            return;
        }

        if (this.pageSize == value) {
            return;
        }

        this.loadArticles(value, this.pageNumber);
    }

    setPageNumber(value: number) {
        if (!this.articles.length) {
            return;
        }
        
        if (this.pageNumber == value) {
            return;
        }

        this.loadArticles(this.pageSize, value);
    }
}