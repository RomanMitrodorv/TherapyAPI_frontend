import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { from, Subject } from 'rxjs';
import { User } from 'src/app/common/models';
import { ChangeSettingsRequest } from 'src/app/common/models/request';
import { FilesService, UsersService } from 'src/app/common/services';

@Component({
	selector: 'app-profile-settings',
	templateUrl: './settings.component.html',
	styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
    
    public changeUserSubject = new Subject<User>();

    public isLoading = false;

    public user: User;
    public settingsForm: FormGroup;

    public uploadedAvatar: globalThis.File;

    public dragAreaClass: string;

    @ViewChild("firstName") firstName: ElementRef;
    @ViewChild("lastName") lastName: ElementRef;

    constructor(
        private usersService: UsersService,
        private filesService: FilesService
    ) {
        
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

    ngOnInit(): void {
        this.initSettingsForm();
        this.loadUserInfo();
    }

    private loadUserInfo() {
        this.usersService.getUserInfo()
            .subscribe(user => {
                this.user = user;
                this.fillSettingsForm();
            });
    }

    private initSettingsForm() {
        this.settingsForm = new FormGroup({
            avatar: new FormControl(null),
            firstName: new FormControl(null, [Validators.required]),
            lastName: new FormControl(null, [Validators.required])
        });
    }

    private fillSettingsForm() {
        if (this.user.photo && this.user.photo.url) {
            this.settingsForm.controls['avatar'].setValue(this.user.photo.url);
        }

        this.settingsForm.controls['firstName'].setValue(this.user.firstName);
        this.settingsForm.controls['lastName'].setValue(this.user.lastName)
    }

    setPreviewImage(files: FileList) {
        this.uploadedAvatar = files[0];
        this.toBase64(files[0])
            .subscribe(encodedImg => {
                this.settingsForm
                    .controls['avatar']
                    .setValue(encodedImg);
            });
    }

    toBase64(file) {
        return from(new Promise<string | ArrayBuffer>((resolve, reject) => {
            const reader = new FileReader();

            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        }));
    }

    public async saveSettings(form: FormGroup) {
        this.isLoading = true;

        if (form.invalid) {
            this.isLoading = false;
            this.markFormAsTouched();

            return;
        }

        const request: ChangeSettingsRequest = {
            firstName: form.value['firstName'],
            lastName: form.value['lastName'],
            avatar: this.uploadedAvatar
        };

        if (!this.uploadedAvatar && this.settingsForm.value['avatar']) {
            const blob = await this.filesService.getFileFromUrl(this.settingsForm.value['avatar']).toPromise();
            const file = new File([blob], `${this.user.id}_avatar`,{ type: blob.type });

            request.avatar = file;
        }

        this.usersService.changeUserSettings(request)
            .subscribe(user => {
                this.user = user;
                this.isLoading = false;

                this.fillSettingsForm();
                this.changeUserSubject.next(user);
            });
    }

    public deletePhoto() {
        this.settingsForm.controls['avatar'].setValue(null);
    }

    private markFormAsTouched() {
        this.settingsForm.controls['firstName'].markAsTouched();
        this.settingsForm.controls['lastName'].markAsTouched();
    }

    public labelClick(elem) {
        this[elem].nativeElement.focus();
    }

    public isFormValid() {
        return this.settingsForm.valid;
    }
}