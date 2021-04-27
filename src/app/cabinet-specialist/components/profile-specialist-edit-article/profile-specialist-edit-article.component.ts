import { Component, OnInit, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService, UsersService, FilesService, ArticlesService, RouterExtService } from 'src/app/common/services';
import { UserRole } from 'src/app/common/enums';

import 'froala-editor/js/plugins/image.min.js';
import 'froala-editor/js/languages/ru.js';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { from } from 'rxjs';
import { Article } from 'src/app/common/models';
import { CreateUpdateArticleRequest } from 'src/app/common/models/request';
import { Location } from '@angular/common';

@Component({
    selector: 'app-profile-specialist-edit-article',
    templateUrl: './profile-specialist-edit-article.component.html',
    styleUrls: ['./profile-specialist-edit-article.component.scss']
})
export class ProfileSpecialistEditArticleComponent implements OnInit {

    public article: Article;
    public articleForm: FormGroup;
    public dragAreaClass: string;

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

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private authService: AuthService,
        private usersService: UsersService,
        private filesService: FilesService,
        private articlesService: ArticlesService,
        private location: Location
    ) {

    }
    
    prevRoute() {
		this.location.back();
	}

    ngOnInit(): void {
        this.authService.isLoggedIn
            .subscribe(logged => {
                if (!logged) {
                    this.router.navigate(['/sign-in']);

                    return;
                }

                this.usersService.getUserInfo()
                    .subscribe(user => {
                        if (user.role == UserRole.Client) {
                            this.router.navigate(['/']);

                            return;
                        }

                        this.loadArticle();
                    });
            });
    }

    editPreviewImage() {
        this.articleForm.controls['previewImage']
            .setValue(null);
    }

    @HostListener("dragover", ["$event"]) onDragOver(event: any) {
        this.dragAreaClass = "";
        event.preventDefault();
    }
    @HostListener("dragenter", ["$event"]) onDragEnter(event: any) {
        this.dragAreaClass = "";
        event.preventDefault();
    }
    @HostListener("dragend", ["$event"]) onDragEnd(event: any) {
        this.dragAreaClass = "dragarea";
        event.preventDefault();
    }
    @HostListener("dragleave", ["$event"]) onDragLeave(event: any) {
        this.dragAreaClass = "dragarea";
        event.preventDefault();
    }
    @HostListener("drop", ["$event"]) onDrop(event: any) {
        this.dragAreaClass = "dragarea";
        event.preventDefault();
        event.stopPropagation();
        if (event.dataTransfer.files) {
            this.setPreviewImage(event.dataTransfer.files);
        }
    }

    private loadArticle() {
        this.route.params
            .subscribe(params => {
                if (!params['id']) {
                    return;
                }

                this.articlesService
                    .getArticle(Number(params['id']))
                    .subscribe(res => {
                        if (!res.success) {
                            return;
                        }

                        this.article = res.data;
                        this.initArticleForm();
                    });
            });
    }

    private initArticleForm() {
        this.articleForm = new FormGroup({
            title: new FormControl(this.article.title, [Validators.required]),
            previewImage: new FormControl(this.article.image.url, [Validators.required]),
            shortText: new FormControl(this.article.shortText, [Validators.required]),
            text: new FormControl(this.article.text, [Validators.required])
        });

        this.editorContent = this.article.text;
    }

    isBase64(value: string) {
        if (value.includes('data:image/jpeg;base64') || value.includes('data:image/png;base64')) {
            return true;
        }

        return false;
    }

    toBase64(file) {
        return from(new Promise<string | ArrayBuffer>((resolve, reject) => {
            const reader = new FileReader();

            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        }));
    }

    onChange(key, value) {
        this.articleForm
            .controls[key]
            .setValue(value);
    }

    setPreviewImage(files: FileList) {
        this.toBase64(files[0])
            .subscribe(encodedImg => {
                this.articleForm
                    .controls['previewImage']
                    .setValue(encodedImg);
            });
    }

    uploadPreviewImage() {
        if (!this.articleForm.value['previewImage']) {
            return;
        }

        return this.filesService
            .uploadFile({
                base64string: this.articleForm.value['previewImage']
            });
    }

    async submitArticle() {
        this.articleForm
            .controls['text']
            .setValue(this.editorContent);

        console.log(this.articleForm.value);

        if (this.articleForm.invalid) {
            return;
        }

        if (this.isBase64(this.articleForm.value['previewImage'])) {
            const uploadReq = await this.uploadPreviewImage().toPromise();
            const uploadRes = uploadReq.data;

            this.sendUpdateRequest({
                title: this.articleForm.value['title'],
                shortText: this.articleForm.value['shortText'],
                text: this.articleForm.value['text'],
                previewImageID: uploadRes.id
            });

            return;
        }

        this.sendUpdateRequest({
            title: this.articleForm.value['title'],
            shortText: this.articleForm.value['shortText'],
            text: this.articleForm.value['text'],
            previewImageID: this.article.image.id
        });
    }

    sendUpdateRequest(request: CreateUpdateArticleRequest) {
        this.articlesService
            .updateArticle(request, this.article.id)
            .subscribe(res => {
                if (!res.success) {
                    return;
                }

                this.router.navigate(['/profile-specialist/articles']);
            });
    }
}