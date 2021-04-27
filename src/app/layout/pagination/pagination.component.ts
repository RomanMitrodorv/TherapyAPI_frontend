import { Component, Input, OnInit, OnChanges, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-pagination',
	templateUrl: './pagination.component.html',
	styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnChanges {

	@Input() currentPage: number;
	@Input() totalPages: number;

	totalPagesArr: number[];

	@Output() onChanged = new EventEmitter<number>();
    change(increased: number) {

		if (this.currentPage == increased) {
			return;
		}
		
		this.currentPage = increased;
		this.onChanged.emit(increased);
    }

	constructor() {
		
	}

	ngOnChanges() {
		this.updatePages();
	}

	prevPage() {
		if (this.currentPage != 1) {
			this.change(this.currentPage - 1);
		}
	}

	nextPage() {
		if (this.currentPage != this.totalPages) {
			this.change(this.currentPage + 1);
		}
	}

	private updatePages() {
		this.totalPagesArr = [];

		for (let i = 0; i < this.totalPages; i++) {
			this.totalPagesArr.push(i + 1);
		}
	}
}