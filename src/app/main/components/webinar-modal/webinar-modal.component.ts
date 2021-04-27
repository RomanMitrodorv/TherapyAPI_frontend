import { Component, OnInit, ElementRef, ViewChild, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { PublicService } from 'src/app/common/services';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';

declare var $: any;

@Component({
    selector: 'webinar-modal',
    templateUrl: './webinar-modal.component.html',
    styleUrls: ['./webinar-modal.component.scss']
})
export class WebinarModalComponent implements OnInit {

    @ViewChild("first_name") first_name: ElementRef;
    @ViewChild("email") email: ElementRef;
    @ViewChild("phone") phone: ElementRef;

    webinarModalForm: FormGroup;

    constructor(
        private publicService: PublicService,
        @Inject(DOCUMENT) private document: Document
    ) { }

    ngOnInit(): void {
        this.initWebinarModalForm();
    }
    
    private initWebinarModalForm() {
        this.webinarModalForm = new FormGroup({
            first_name: new FormControl(null),
            email: new FormControl(null),
            phone: new FormControl(null)
        });

        $("#phone").mask("+7 (999) 999-99-99", { autoclear: false });
    }

    inputEvent(name: string, value: string) {
        this.webinarModalForm.controls[name].setValue(value);

        value = value.replace(/-/g, "").replace("(", "").replace(")", "").replace(/ /g, "").replace(/_/g, "");

        if (value.length != 12) {
            this.webinarModalForm.controls[name].setErrors({
                invalid: true
            });
        }

        console.log(this.webinarModalForm);
    }

    submitWebinarModalForm(form: FormGroup) {
        const request = new FormData();
        request.append('formParams[first_name]', form.value['name']);
        request.append('formParams[email]', form.value['email']);
        request.append('formParams[phone]', form.value['phone']);

        this.publicService.sendWebinarForm(request)
            .subscribe(res => {
                this.document.location.href = res.data.redirectUrl;
            });
    }

    close() {
        let webinarModal = document.getElementById('webinar-modal')
        webinarModal.classList.remove('show')
        webinarModal.classList.add('hidden');
    }
    
    labelClick(inputName: string) {
        this[inputName].nativeElement.focus();
    }
}