import { Component, Input, OnInit, OnChanges, Output, EventEmitter } from '@angular/core';
import { IconSize } from '../rating/icon-size.enum';

@Component({
	selector: 'app-review-score',
	templateUrl: './review-score.component.html',
	styleUrls: ['./review-score.component.scss']
})
export class ReviewScoreComponent {

    @Input() score: number;
    @Input() size: IconSize = 18;

	constructor() {

	}

}