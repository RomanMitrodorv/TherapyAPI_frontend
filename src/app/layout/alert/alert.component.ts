import { Component, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
	selector: 'app-alert',
	templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss'],
    animations: [
		trigger(
			'fade', [
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
})
export class AlertComponent {
    
    @Input('text') text: string;

    constructor() {
		
	}
}