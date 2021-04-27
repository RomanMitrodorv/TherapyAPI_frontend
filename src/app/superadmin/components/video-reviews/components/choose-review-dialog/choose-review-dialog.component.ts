import { Component, OnInit, ViewChild } from '@angular/core';
import { FilesService } from 'src/app/common/services';
import { DomSanitizer } from '@angular/platform-browser';
import { File, Func } from 'src/app/common/models';
import { SuperadminService } from 'src/app/superadmin/services';
import { FileType } from 'src/app/common/enums';
import { PaginationComponent } from 'src/app/layout/pagination/pagination.component';

interface IFilesList {
	files: File[],
	pageSize: number,
	currentPage: number,
	totalPages: number,
    totalItems: number,
    searchQuery: string
}

@Component({
    selector: 'choose-review-dialog',
    templateUrl: './choose-review-dialog.component.html',
    styleUrls: ['./choose-review-dialog.component.scss']
})
export class ChooseReviewDialogComponent implements OnInit {

    public isOpen = false;
    public resultCall: Func<File>;

    @ViewChild('videosPagination') videosPagination: PaginationComponent;

    public videos: IFilesList = {
		files: [],
		pageSize: 12,
		currentPage: 1,
		totalPages: 1,
		totalItems: 0,
		searchQuery: ""
	};

    constructor(
        private superadminService: SuperadminService,
        private _sanitizer: DomSanitizer
    ) { }

    private loadVideos(pageNumber: number, pageSize: number, searchQuery: string) {
		this.superadminService
			.getVideoFiles({ pageNumber, pageSize, searchQuery })
			.subscribe(response => {
				this.videos.files = response.data;
				this.videos.currentPage = response.currentPage;
				this.videos.pageSize = response.pageSize;
				this.videos.totalPages = response.totalPages;
				this.videos.totalItems = response.totalItems;
                this.videos.searchQuery = response.searchQuery ? response.searchQuery : "";
			});
    }

    ngOnInit(): void {
        this.loadVideos(this.videos.currentPage, this.videos.pageSize, this.videos.searchQuery);
    }

    chooseVideo(video: File) {
        this.resultCall(video);
        this.close();
    }

    setSearchQuery() {
        window.scroll(0,0);

		this.loadVideos(1, this.videos.pageSize, this.videos.searchQuery);
	}

	setPageNumber(value: number) {
		window.scroll(0,0);

		this.loadVideos(value, this.videos.pageSize, this.videos.searchQuery);
	}

    getFileTypeStr(file: File) {
        return FileType[file.type];
    }

    open(callback: Func<File>) {
        this.resultCall = callback;

        this.isOpen = true;
    }

    close() {
        if (this.resultCall) {
            this.resultCall = null;
        }

        this.isOpen = false;
    }
}