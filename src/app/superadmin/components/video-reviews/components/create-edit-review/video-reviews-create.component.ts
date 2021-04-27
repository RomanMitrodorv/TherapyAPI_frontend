import { Location } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ClientVideoReview, File } from 'src/app/common/models';
import { FilesService } from 'src/app/common/services';
import { SuperadminService } from 'src/app/superadmin/services';
import { ChooseReviewDialogComponent } from '../choose-review-dialog/choose-review-dialog.component';


@Component({
    selector: 'superadmin-video-reviews-create',
    templateUrl: './video-reviews-create.component.html',
    styleUrls: ['./video-reviews-create.component.scss']
})
export class SuperadminVideoReviewsCreateComponent implements OnInit {

    public editingReviewID: number;
    public review: ClientVideoReview;

    public reviewVideo: File;
    public createVideoReviewForm: FormGroup;

    @ViewChild(ChooseReviewDialogComponent) chooseDialog: ChooseReviewDialogComponent;

    constructor(
        private superAdminService: SuperadminService,
        private filesService: FilesService,
        private route: ActivatedRoute,
        private location: Location
    ) {

    }

    private initCreateVideoReviewForm(): void {
        this.createVideoReviewForm = new FormGroup({
            fullName: new FormControl(null, [Validators.required]),
            text: new FormControl(null, [Validators.required, Validators.maxLength(150)]),
            videoID: new FormControl(null, [Validators.required])
        });
    }

    private async fillCreateVideoReviewForm() {
        this.createVideoReviewForm
            .controls['fullName']
            .setValue(this.review.fullName);

        this.createVideoReviewForm
            .controls['text']
            .setValue(this.review.text);

        const video = await this.getVideoByUrl(this.review.linkYouTube);

        this.reviewVideo = video;

        this.createVideoReviewForm
            .controls['videoID']
            .setValue(video.id);
    }

    private async getVideoByUrl(url: string) {
        return await this.filesService
            .getInternalFileByUrl(url)
            .toPromise();
    }

    openChooseDialog() {
        this.chooseDialog.open((file) => {
            this.reviewVideo = file;

            this.createVideoReviewForm
                .controls['videoID']
                .setValue(file.id);
        });
    }

    cancelChoosedVideo() {
        this.reviewVideo = null;

        this.createVideoReviewForm
                .controls['videoID']
                .setValue(null);
    }

    ngOnInit(): void {
        this.initCreateVideoReviewForm();

        this.route.params
            .subscribe(params => {
                const editingReviewID = parseInt(params['id']);

                if (editingReviewID) {
                    this.editingReviewID = editingReviewID;
                    this.review = window.history.state;
                    this.fillCreateVideoReviewForm();
                }
            });
    }

    prevRoute() {
        this.location.back();
    }

    submit(form: FormGroup) {
        if (form.controls['fullName'].invalid) {
            alert('Заполните имя!')

            return;
        }

        if (form.controls['text'].hasError('required')) {
            alert('Заполните текст отзыва!');

            return;
        }

        if (form.controls['text'].hasError('maxlength')) {
            alert('Максимальная длина текста отзыва 150 символов!');

            return;
        }

        if (form.controls['videoID'].hasError('required')) {
            alert('Выберите видео!');

            return;
        }

        if (!this.editingReviewID) {
            this.superAdminService
                .createVideoReview({
                    fullName: form.value['fullName'],
                    text: form.value['text'],
                    videoID: form.value['videoID']
                })
                .subscribe(reviewResponse => {
                    this.prevRoute();
                });

            return;
        }

        this.superAdminService
            .editVideoReview({
                fullName: form.value['fullName'],
                text: form.value['text'],
                videoID: form.value['videoID']
            }, this.review.id)
            .subscribe(reviewResponse => {
                this.prevRoute();
            });
    }
}