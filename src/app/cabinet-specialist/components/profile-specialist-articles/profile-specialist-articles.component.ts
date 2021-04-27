import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, UsersService, ArticlesService, SpecialistService } from 'src/app/common/services';
import { Article, ArticlePublish } from 'src/app/common/models';
import { PaginationComponent } from 'src/app/layout/pagination/pagination.component';
import { ProfileSpecialistDeleteDialog } from '../profile-specialist-delete-dialog/profile-specialist-delete-dialog.component';
import { ArticleModerationStatus } from 'src/app/common/enums';

@Component({
    selector: 'app-profile-specialist-articles',
    templateUrl: './profile-specialist-articles.component.html',
    styleUrls: ['./profile-specialist-articles.component.scss']
})
export class ProfileSpecialistArticlesComponent implements OnInit {

    public publishes: ArticlePublish[];

    public pageSize = 5;
    public pageNumber = 1;
    public totalPages = 1;

    @ViewChild(PaginationComponent) pagination: PaginationComponent;
    @ViewChild(ProfileSpecialistDeleteDialog) deleteDialog: ProfileSpecialistDeleteDialog;

    constructor(
        private specialistService: SpecialistService
    ) { }

    ngOnInit(): void {
        this.loadArticles(this.pageSize, this.pageNumber);
    }

    private loadArticles(pageSize: number, pageNumber: number) {
        this.specialistService.getArticles({ pageSize, pageNumber })
            .subscribe(response => {
                this.publishes = response.data;
                this.pageNumber = response.currentPage;
                this.pageSize = response.pageSize;
                this.totalPages = response.totalPages;
            });
    }

    showDeleteArticleDialog(articleID: number) {
        const publish = this.publishes.find(x => x.article.id == articleID);
        if (!publish) {
            return;
        }

        this.deleteDialog.open(publish.article);
    }

    setPageSize(value: number) {
        if (!this.publishes.length) {
            return;
        }

        if (this.pageSize == value) {
            return;
        }

        this.loadArticles(value, this.pageNumber);
    }

    setPageNumber(value: number) {
        if (!this.publishes.length) {
            return;
        }
        
        if (this.pageNumber == value) {
            return;
        }

        this.loadArticles(this.pageSize, value);
    }

    getPublishStatus(publish: ArticlePublish) {
        switch (publish.status) {
            case ArticleModerationStatus.New:
                return 'Модерация';
            case ArticleModerationStatus.Accepted:
                return 'Одобрена';
            case ArticleModerationStatus.Declined:
                return 'Отклонена';
            default:
                return '';
        }
    }
}