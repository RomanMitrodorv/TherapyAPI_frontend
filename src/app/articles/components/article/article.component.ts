import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticlesService, AuthService, RouterExtService, StorageService, UsersService } from 'src/app/common/services';
import { Article, User, ArticleComment, Specialist } from 'src/app/common/models';
import { LocalStorageHelper, StringHelper } from 'src/app/common/helpers';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';
import { Location } from '@angular/common';
import { UserRole } from 'src/app/common/enums';

@Component({
	selector: 'app-article',
	animations: [
		trigger(
			'replyAnimation', [
			transition(':enter', [
				style({ opacity: 0 }),
				animate('300ms', style({ opacity: 1 }))
			]),
			transition(':leave', [
				style({ opacity: 1 }),
				animate('300ms', style({ opacity: 0 }))
			])
		]
		)
	],
	templateUrl: './article.component.html',
	styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

	public isLoggedIn = false;
	public isSpecialist = false;

	public commentForm: FormGroup;

	public user: User;

	public article: Article;
	public replyID: number;

	@ViewChild('commentArea') commentArea: ElementRef;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private location: Location,
		private articlesService: ArticlesService,
		private storageService: StorageService,
		private authService: AuthService,
		private usersService: UsersService
	) {
		this.authService.isLoggedIn
			.subscribe(logged => {
				this.isLoggedIn = logged;
				
				if (logged) {
					this.usersService.getUserInfo()
						.subscribe(user => {
							this.user = user;

							if (user.role == UserRole.Specialist) {
								this.isSpecialist = true;

								return;
							}

							this.isSpecialist = false;
						});
				}
			});
	}

	ngOnInit() {
		this.route.params
			.subscribe(params => {
				const id = params['id'];

				if (!id) {
					this.router.navigate(['/articles']);

					return;
				}

				this.loadArticle(id);
			});
	}

	private initCommentForm() {
		this.commentForm = new FormGroup({
			isReply: new FormControl(false, [Validators.required]),
			parentCommentID: new FormControl(0),
			text: new FormControl(null, [Validators.required])
		});
	}

	private loadArticle(id: number) {
		this.articlesService.getArticle(id)
			.subscribe(res => {
				this.article = res.data;
				this.initCommentForm();
			});
	}

	likeArticle() {
		if (!this.user) {
			return;
		}

		if (!this.article.isLiked) {
			this.article.isLiked = true;
			this.article.likes.push({
				id: 0,
				author: this.user
			});
		} else {
			this.article.isLiked = false;
			this.article.likes = this.article.likes.filter(x => x.author.id != this.user.id);
		}

		this.articlesService
			.likeArticle(this.article.id)
			.subscribe();
	}

	get comments() {
		return this.article.comments.filter(x => !x.isReply);
	}

	getReplies(commentID: number) {
		let result: ArticleComment[] = [];

		result.push(...this.getCommentReplies(commentID));

		result.forEach(replie => {
			result.push(...this.getCommentReplies(replie.id));
		});

		return result;
	}

	private getCommentReplies(commentID: number) {
		return this.article.comments.filter(x => x.parentComment.id == commentID);
	}

	getAvatar(user: User) {
		return StringHelper.getFirstLetter(user.firstName);
	}

	showReply(id: number) {
		this.replyID = id;

		setTimeout(() => {
			this.replyID = null;
		}, 800);
	}

	setReply(parentCommentID: number) {
		this.replyID = parentCommentID;
		this.commentForm.controls['isReply'].setValue(true);
		this.commentForm.controls['parentCommentID'].setValue(parentCommentID);

		this.commentArea.nativeElement.innerHTML = `<a href="" style="color: #364D47; text-decoration: underline">${this.comments.find(x => x.id == parentCommentID).author.firstName},</a>&nbsp;`;
		this.commentArea.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}

	setReplyToReply(parentCommentID: number, replyID: number) {
		this.replyID = replyID;
		this.commentForm.controls['isReply'].setValue(true);
		this.commentForm.controls['parentCommentID'].setValue(replyID);

		this.commentArea.nativeElement.innerHTML = `<a href="" style="color: #364D47; text-decoration: underline">${this.getReplies(parentCommentID).find(x => x.id == replyID).author.firstName},</a>&nbsp;`;
		this.commentArea.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}

	cancelReply() {
		this.replyID = null;
		this.commentForm.controls['isReply'].setValue(false);
		this.commentForm.controls['parentCommentID'].setValue(0);
	}

	getParentComment(parentCommentID: number) {
		return this.article.comments.find(x => x.id == parentCommentID);
	}

	submitComment() {
		let value: string = this.commentArea.nativeElement.innerHTML;
		let endPos = value.indexOf("</a>");

		if (endPos == -1) {
			this.cancelReply();
			this.commentForm.controls['text'].setValue(value.replace("&nbsp;", " "));
		} else {
			this.commentForm.controls['text'].setValue(value.substr((endPos + 4)).replace("&nbsp;", " "));
		}

		if (this.commentForm.invalid) {
			return;
		}

		this.articlesService
			.commentArticle(this.commentForm.value, this.article.id)
			.subscribe(res => {
				this.commentArea.nativeElement.innerHTML = null;
				this.loadArticle(this.article.id);
			});
	}

	prevRoute() {
		this.location.back();
	}

	showSpecialistDialog(specialist: Specialist) {
		if (!this.isLoggedIn) {
            LocalStorageHelper.saveSpecialist(specialist);

            this.router.navigate(['/sign-up']);

            return;
		}
		
        let dialog = document.querySelector('.choose-specialist-dialog');
        dialog.classList.remove('hidden');
        dialog.classList.add('show');
        
        this.storageService.setSpecialist(specialist);
    }
}