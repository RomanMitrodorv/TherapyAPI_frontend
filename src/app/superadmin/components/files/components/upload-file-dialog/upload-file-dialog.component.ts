import { Component, OnInit } from '@angular/core';
import { FilesService } from 'src/app/common/services';
import { DomSanitizer } from '@angular/platform-browser';
import { File, Func } from 'src/app/common/models';

@Component({
    selector: 'upload-file-dialog',
    templateUrl: './upload-file-dialog.component.html',
    styleUrls: ['./upload-file-dialog.component.scss']
})
export class UploadFileDialogComponent implements OnInit {

    public isOpen = false;
    public file: globalThis.File;
    public filePreview: string;
    public resultCall: Func<File>;

    constructor(
        private filesService: FilesService,
        private _sanitizer: DomSanitizer
    ) { }

    ngOnInit(): void { }

    submitUploadFile() {
        if (!this.file) {
            return;
        }

        this.filesService.uploadFileForm({
            file: this.file
        })
        .subscribe(result => {
            if (!result.success) {
                alert(result.message);
                this.close();

                return;
            }

            this.resultCall(result.data);
            this.close();
        });
    }

    open(file: globalThis.File, callback: Func<File>) {
        if (!file) {
            return;
        }

        this.file = file;
        this.resultCall = callback;

        if (!this.filePreview) {
            this.filePreview = window.URL.createObjectURL(file);
        } else {
            window.URL.revokeObjectURL(this.filePreview);

            this.filePreview = window.URL.createObjectURL(file);
        }

        this.isOpen = true;
    }

    close() {
        if (this.file) {
            this.file = null;
        }

        if (this.filePreview) {
            window.URL.revokeObjectURL(this.filePreview);

            this.filePreview = null;
        }

        if (this.resultCall) {
            this.resultCall = null;
        }

        this.isOpen = false;
    }

    getPreviewUrl() {
        return this._sanitizer.bypassSecurityTrustUrl(this.filePreview);
    }

    getFileTypeStr() {
        if (!this.file) {
            return '';
        }

        return this.file.type.split('/')[1].toUpperCase();
    }
}