import { Component, Input, OnInit, OnChanges, Output, EventEmitter } from '@angular/core';
import { IconSize } from './icon-size.enum';

@Component({
	selector: 'app-rating',
	templateUrl: './rating.component.html',
	styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {

    @Input() score: number;
    @Input() single: boolean;
    @Input() size: IconSize;

	constructor() {

    }
    
    ngOnInit() {
    }
}