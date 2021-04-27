import { Component, OnInit, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService, UsersService, FilesService, ArticlesService } from '../../../../../common/services';
import { ArticleModerationStatus, UserRole } from '../../../../../common/enums';

import 'froala-editor/js/plugins/image.min.js';
import 'froala-editor/js/languages/ru.js';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { from } from 'rxjs';
import { Article, ArticlePublish } from '../../../../../common/models';
import { CreateUpdateArticleRequest } from '../../../../../common/models/request';
import { Location } from '@angular/common';
import { SuperadminService } from 'src/app/superadmin/services';

@Component({
    selector: 'superadmin-article-view',
    templateUrl: './article-view.component.html',
    styleUrls: ['./article-view.component.scss']
})
export class ArticleViewComponent implements OnInit {

    public publish: ArticlePublish;
    public articleForm: FormGroup;
    public editor;

    public editorOptions = {
        key: "AV:4~?3xROKLJKYHROLDXDR@d2YYGR_Bc1A8@5@4:1B2D2F2F1?1?2A3@1C1",
        attribution: false,
        toolbarButtons: ['bold', 'italic', 'underline', 'strikeThrough', 'fontSize', 'insertImage'],
        language: 'ru',
        placeholderText: 'Текст статьи',
        events: {
            'initialized': (e) => {
                this.editor = e._editor;
                e._editor.edit.off();
            },

            'image.beforeUpload': (files) => {
                if (files.length) {
                    const reader = new FileReader();

                    reader.readAsDataURL(files[0]);

                    reader.onload = () => {
                        this.editor.image.insert(reader.result, null, null, this.editor.image.get());
                    };

                    this.editor.popups.hideAll();
                    // Stop default upload chain.
                    return false;
                }
            }
        }
    }

    public editorContent: string;
    public publishMessage: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private location: Location,
        private superadminService: SuperadminService
    ) { }
    
    prevRoute() {
		this.location.back();
	}

    ngOnInit(): void {
        this.loadArticle();
    }

    private loadArticle() {
        this.route.params
            .subscribe(params => {
                if (!params['id']) {
                    return;
                }

                this.superadminService
                    .getArticle(Number(params['id']))
                    .subscribe(res => {
                        if (!res.success) {
                            return;
                        }

                        this.publish = res.data;
                        this.initArticleForm();
                    });
            });
    }

    private initArticleForm() {
        this.articleForm = new FormGroup({
            title: new FormControl(this.publish.article.title, [Validators.required]),
            previewImage: new FormControl(this.publish.article.image.url, [Validators.required]),
            shortText: new FormControl(this.publish.article.shortText, [Validators.required]),
            text: new FormControl(this.publish.article.text, [Validators.required])
        });

        this.editorContent = this.publish.article.text;
    }

    updatePublishStatus(status: ArticleModerationStatus) {
        this.superadminService
            .updateArticlePublish({ status, message: this.publishMessage }, this.publish.id)
            .subscribe(result => {
                if (result.success) {
                    this.router.navigate(['/superadmin/articles']);
                }
            });
    }
}