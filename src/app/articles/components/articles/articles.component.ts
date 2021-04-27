import { Component, OnInit, ViewChild } from '@angular/core';
import { ArticlesService, AuthService, UsersService } from 'src/app/common/services';
import { Article, User } from 'src/app/common/models';
import { PaginationComponent } from 'src/app/layout/pagination/pagination.component';
import { ArticlesSorter } from './articles-sorter.enum';
import { SortBy } from 'src/app/common/enums';
import { BehaviorSubject } from 'rxjs';

@Component({
	selector: 'app-articles',
	templateUrl: './articles.component.html',
	styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {

	private isLoadingSubject = new BehaviorSubject(false);

    public get isLoading() {
        return this.isLoadingSubject.value;
    }

	public user: User;
	public articles: Article[];
	
	public pageSize = 5;
	public pageNumber = 1;
	public totalPages = 1;

	public sorter = ArticlesSorter.Date;
	public sortBy = SortBy.DESC;

	@ViewChild(PaginationComponent) pagination: PaginationComponent;

	constructor(
		private authService: AuthService,
		private usersService: UsersService,
		private articlesService: ArticlesService
	) {

	}

	ngOnInit() {
		this.authService.isLoggedIn
			.subscribe(logged => {
				if (logged) {
					this.usersService.getUserInfo()
						.subscribe(user => this.user = user);
				}
			})

		this.isLoadingSubject.next(true);
		
		this.isLoadingSubject
			.subscribe(
				(isLoading) => {
					if (isLoading) {
						return;
					}

					if (!isLoading) {
						window.scroll(0, 0);
					}
				},
				(error) => {
					console.log(error);
				},
				() => {
					this.isLoadingSubject.unsubscribe();
				}
			);

		this.loadArticles(this.pageNumber, this.pageSize, this.sorter, this.sortBy);
	}

	private loadArticles(pageNumber: number, pageSize: number, sortBy: ArticlesSorter, orderBy: SortBy) {
		this.articlesService.getSortedArticles({ pageNumber, pageSize, sortBy, orderBy })
			.subscribe(res => {
				this.articles = res.data;

				this.pageNumber = res.currentPage;
				this.pageSize = res.pageSize;
				this.totalPages = res.totalPages;

				this.sorter = res.sortBy;
				this.sortBy = res.orderBy;

				this.isLoadingSubject.next(false);
			});
	}

	likeArticle(article: Article) {
		if (!this.user) {
			return;
		}

		if (!article.isLiked) {
			article.isLiked = true;
			article.likes.push({
				id: 0,
				author: this.user
			});
		} else {
			article.isLiked = false;
			article.likes = article.likes.filter(x => x.author.id != this.user.id);
		}

		this.articlesService
			.likeArticle(article.id)
			.subscribe();
	}

	setPageSize(value: number) {
		this.isLoadingSubject.next(true);
		
		this.isLoadingSubject
			.subscribe(
				(isLoading) => {
					if (isLoading) {
						return;
					}

					if (!isLoading) {
						window.scroll(0, 0);
					}
				},
				(error) => {
					console.log(error);
				},
				() => {
					this.isLoadingSubject.unsubscribe();
				}
			);

		this.loadArticles(1, Number(value), this.sorter, this.sortBy);
	}

	setPageNumber(value: number) {
		this.isLoadingSubject.next(true);
		
		this.isLoadingSubject
			.subscribe(
				(isLoading) => {
					if (isLoading) {
						return;
					}

					if (!isLoading) {
						window.scroll(0, 0);
					}
				},
				(error) => {
					console.log(error);
				},
				() => {
					this.isLoadingSubject.unsubscribe();
				}
			);
			
		this.loadArticles(value, this.pageSize, this.sorter, this.sortBy);
	}

	setSorter(sorter: ArticlesSorter) {
		this.isLoadingSubject.next(true);
		
		this.isLoadingSubject
			.subscribe(
				(isLoading) => {
					if (isLoading) {
						return;
					}

					if (!isLoading) {
						window.scroll(0, 0);
					}
				},
				(error) => {
					console.log(error);
				},
				() => {
					this.isLoadingSubject.unsubscribe();
				}
			);

		if (sorter == this.sorter) {
			this.toggleSortDirection();

			return;
		}

		this.sorter = sorter;
		this.sortBy = SortBy.DESC;

		this.loadArticles(1, this.pageSize, sorter, SortBy.DESC);
	}

	toggleSortDirection() {
		if (this.sortBy == SortBy.ASC) {
			this.sortBy = SortBy.DESC;

			this.loadArticles(1, this.pageSize, this.sorter, SortBy.DESC);

			return;
		}

		if (this.sortBy == SortBy.DESC) {
			this.sortBy = SortBy.ASC;

			this.loadArticles(1, this.pageSize, this.sorter, SortBy.ASC);

			return;
		}

		return;
	}
}