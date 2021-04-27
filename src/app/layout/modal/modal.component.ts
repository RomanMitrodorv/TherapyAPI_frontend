import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
    selector: 'modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

    public isOpen = false;

    constructor(private el: ElementRef) { }

    ngOnInit(): void {

        document.body.onclick = (event: any) => {
            if (!event.target.classList.contains('modal-button')) {
                if (event.target.parentNode.classList.contains('show')) {
                    this.close();
                }
            }
        }
    }

    close() {
        this.el.nativeElement.classList.remove('show');
        this.el.nativeElement.classList.add('hidden');
        this.isOpen = false;
    }
}