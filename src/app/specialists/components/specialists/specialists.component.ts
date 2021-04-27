import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService, SpecialistsService, StorageService } from 'src/app/common/services';
import { Specialist } from 'src/app/common/models';
import { SpecialistsSorter } from './specialists-sorter.enum';
import { SortBy } from 'src/app/common/enums';
import { PaginationComponent } from 'src/app/layout/pagination/pagination.component';
import { LocalStorageHelper } from 'src/app/common/helpers';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
	selector: 'app-specialists',
	templateUrl: './specialists.component.html',
	styleUrls: ['./specialists.component.scss']
})
export class SpecialistsComponent implements OnInit {

	public isLoggedIn = false;
	private isLoadingSubject = new BehaviorSubject(false);

	public get isLoading() {
		return this.isLoadingSubject.value;
	}

	public specialists: Specialist[];

	public pageSize = 8;
	public pageNumber = 1;
	public totalPages = 1;

	public sorter = SpecialistsSorter.Price;
	public sortBy = SortBy.DESC;

	@ViewChild(PaginationComponent) pagination: PaginationComponent;

	constructor(
		private authService: AuthService,
		private storageService: StorageService,
		private specialistsService: SpecialistsService,
		private router: Router
	) {
		
	}

	ngOnInit(): void {
		this.isLoadingSubject.next(true);

		this.isLoadingSubject
			.subscribe(
				(isLoading) => {
					if (isLoading) {
						return;
					}

					if (!isLoading) {
						window.scroll(0, 0);
					}
				},
				(error) => {
					console.log(error);
				},
				() => {
					this.isLoadingSubject.unsubscribe();
				}
			);

		this.loadSpecialists(this.pageNumber, this.pageSize, this.sorter, this.sortBy);

		this.authService.isLoggedIn
			.subscribe(logged => {
				this.isLoggedIn = logged;
			});
	}

	private loadSpecialists(pageNumber: number, pageSize: number, sortBy: SpecialistsSorter, orderBy: SortBy) {
		this.specialistsService.getSpecialistsSorted({ pageNumber, pageSize, sortBy, orderBy })
			.subscribe(res => {
				if (!res.success) {
					this.isLoadingSubject.next(false);
					return;
				}

				this.specialists = res.data;

				this.pageNumber = res.currentPage;
				this.pageSize = res.pageSize;
				this.totalPages = res.totalPages;

				this.sorter = res.sortBy;
				this.sortBy = res.orderBy;

				this.isLoadingSubject.next(false);
			});
	}

	setPageSize(value: number) {
		this.isLoadingSubject.next(true);

		this.isLoadingSubject
			.subscribe(
				(isLoading) => {
					if (isLoading) {
						return;
					}

					if (!isLoading) {
						window.scroll(0, 0);
					}
				},
				(error) => {
					console.log(error);
				},
				() => {
					this.isLoadingSubject.unsubscribe();
				}
			);

		this.pageSize = Number(value);
		this.pageNumber = 1;

		this.loadSpecialists(1, Number(value), this.sorter, this.sortBy);
	}

	setPageNumber(value: number) {
		this.isLoadingSubject.next(true);

		this.isLoadingSubject
			.subscribe(
				(isLoading) => {
					if (isLoading) {
						return;
					}

					if (!isLoading) {
						window.scroll(0, 0);
					}
				},
				(error) => {
					console.log(error);
				},
				() => {
					this.isLoadingSubject.unsubscribe();
				}
			);

		this.pageNumber = Number(value);
		this.loadSpecialists(value, this.pageSize, this.sorter, this.sortBy);
	}

	setSorter(sorter: SpecialistsSorter) {
		this.isLoadingSubject.next(true);

		this.isLoadingSubject
			.subscribe(
				(isLoading) => {
					if (isLoading) {
						return;
					}

					if (!isLoading) {
						window.scroll(0, 0);
					}
				},
				(error) => {
					console.log(error);
				},
				() => {
					this.isLoadingSubject.unsubscribe();
				}
			);

		if (sorter == this.sorter) {
			this.toggleSortDirection();

			return;
		}

		this.sorter = sorter;
		this.sortBy = SortBy.DESC;

		this.loadSpecialists(1, this.pageSize, sorter, SortBy.DESC);
	}

	toggleSortDirection() {
		if (this.sortBy == SortBy.ASC) {
			this.sortBy = SortBy.DESC;

			this.loadSpecialists(1, this.pageSize, this.sorter, SortBy.DESC);

			return;
		}

		if (this.sortBy == SortBy.DESC) {
			this.sortBy = SortBy.ASC;

			this.loadSpecialists(1, this.pageSize, this.sorter, SortBy.ASC);

			return;
		}

		return;
	}

	showSpecialistDialog(specialistID: number) {
		const specialist = this.specialists.find(x => x.id == specialistID);

		if (!specialist) {
			return;
		}

		if (!this.isLoggedIn) {
			LocalStorageHelper.saveSpecialist(specialist);

            this.router.navigate(['/sign-up']);

            return;
		}

        let dialog = document.querySelector('.choose-specialist-dialog');
        dialog.classList.remove('hidden');
        dialog.classList.add('show');
        
        this.storageService.setSpecialist(specialist);
	}
}