import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PaginationComponent } from 'src/app/layout/pagination/pagination.component';
import { SuperadminService } from '../../../../services';
import { Router } from '@angular/router';
import { File } from 'src/app/common/models';
import { FileType } from 'src/app/common/enums';
import { UploadFileDialogComponent } from '../upload-file-dialog/upload-file-dialog.component';

interface IFilesList {
	files: File[],
	pageSize: number,
	currentPage: number,
	totalPages: number,
	totalItems: number,
	searchQuery: string
}

type FilesTab = 'Videos' | 'Images';

@Component({
	selector: 'superadmin-files',
	templateUrl: './files.component.html',
	styleUrls: ['./files.component.scss']
})
export class FilesComponent implements OnInit {

	public activeTab: FilesTab = 'Videos';

	@ViewChild('filesTabs') filesTabs: ElementRef<HTMLUListElement>;

	@ViewChild('videosPagination') videosPagination: PaginationComponent;
	@ViewChild('imagesPagination') imagesPagination: PaginationComponent;

	@ViewChild(UploadFileDialogComponent) uploadModal: UploadFileDialogComponent;

	public videos: IFilesList = {
		files: [],
		pageSize: 12,
		currentPage: 1,
		totalPages: 1,
		totalItems: 0,
		searchQuery: ""
	};

	public images: IFilesList = {
		files: [],
		pageSize: 12,
		currentPage: 1,
		totalPages: 1,
		totalItems: 0,
		searchQuery: ""
	};

	constructor(
		private superadminService: SuperadminService,
		private router: Router
	) {

	}

	ngOnInit(): void {
		this.loadVideos(this.videos.currentPage, this.videos.pageSize, this.videos.searchQuery);
		this.loadImages(this.images.currentPage, this.images.pageSize, this.images.searchQuery);
	}

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

	private loadImages(pageNumber: number, pageSize: number, searchQuery: string) {
		this.superadminService
			.getImageFiles({ pageNumber, pageSize, searchQuery })
			.subscribe(response => {
				this.images.files = response.data;
				this.images.currentPage = response.currentPage;
				this.images.pageSize = response.pageSize;
				this.images.totalPages = response.totalPages;
				this.images.totalItems = response.totalItems;
				this.images.searchQuery = response.searchQuery ? response.searchQuery : "";
			});
	}

	openUploadFileDialog(file: globalThis.File) {
		this.uploadModal.open(file, (file) => {
			if (file.type == FileType.PNG ||
				file.type == FileType.JPEG ||
				file.type == FileType.GIF ||
				file.type == FileType.SVG) {
				this.images.files.unshift(file);
				this.images.totalItems++;

				return;
			}

			if (file.type == FileType.MP4 ||
				file.type == FileType.MOV ||
				file.type == FileType.AVI) {
				this.videos.files.unshift(file);
				this.videos.totalItems++;

				return;
			}
		});
	}

	getFileTypeStr(file: File) {
		return FileType[file.type];
	}

	uploadFileHandler(fileList: FileList) {
		this.openUploadFileDialog(fileList.item(0));
	}

	deleteFile(file: File) {
		const isConfirm = confirm(`Вы уверены что хотите удалить файл ${file.name}?`);

		if (!isConfirm) {
			return;
		}

		this.superadminService.deleteFile(file.id)
			.subscribe(result => {
				if (result.success) {
					if (file.type == FileType.MP4 ||
						file.type == FileType.MOV ||
						file.type == FileType.AVI) {
						return this.loadVideos(
							this.videos.currentPage,
							this.videos.pageSize,
							this.videos.searchQuery
						);
					}

					if (file.type == FileType.PNG ||
						file.type == FileType.JPEG ||
						file.type == FileType.GIF ||
						file.type == FileType.SVG) {
						return this.loadImages(
							this.images.currentPage,
							this.images.pageSize,
							this.images.searchQuery
						);
					}
				}
			});
	}

	setSearchQuery(tab: FilesTab) {
		switch (tab) {
			case 'Videos': {
				return this.loadVideos(
					1,
					this.videos.pageSize,
					this.videos.searchQuery
				);
			}

			case 'Images': {
				return this.loadImages(
					1,
					this.images.pageSize,
					this.images.searchQuery
				);
			}
		}
	}

	setPageSize(tab: FilesTab, value: number) {
		if (tab == 'Videos') {
			this.videos.pageSize = Number(value);

			this.loadVideos(1, Number(value), this.videos.searchQuery);

			return;
		}

		if (tab == 'Images') {
			this.images.pageSize = Number(value);

			this.loadImages(1, Number(value), this.images.searchQuery);

			return;
		}

		return;
	}

	setPageNumber(tab: FilesTab, value: number) {
		window.scroll(0, 0);

		if (tab == 'Videos') {
			this.loadVideos(value, this.videos.pageSize, this.videos.searchQuery);

			return;
		}

		if (tab == 'Images') {
			this.loadImages(value, this.images.pageSize, this.images.searchQuery);

			return;
		}

		return;
	}

	setActiveTab(tab: FilesTab) {
		this.activeTab = tab;

		if (!this.filesTabs) {
			return;
		}

		const item = this.filesTabs.nativeElement.getElementsByTagName('li').namedItem(tab);
		const margin = parseInt(window.getComputedStyle(item).marginLeft);
		const scrollTo = (margin / 2) + (item.offsetLeft - item.offsetWidth);

		this.filesTabs.nativeElement.scrollTo({
			left: scrollTo,
			behavior: 'smooth'
		});
	}
}