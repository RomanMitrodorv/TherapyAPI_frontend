import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PaginationComponent } from 'src/app/layout/pagination/pagination.component';
import { SortBy, UserRole } from 'src/app/common/enums';
import { SuperadminService } from '../../services';
import { Superadmin, SuperadminPatient, SuperadminSpecialist } from '../../models';
import { PatientsSorter, SpecialistsSorter } from './customers.sorters';
import { Router } from '@angular/router';

interface ICustomersList<CType, SType = null> {
	customers: CType[],
	sortBy?: SType,
	orderBy: SortBy,
	pageSize: number,
	currentPage: number,
	totalPages: number,
	totalItems: number,
	searchQuery: string
}

type CustomersTab = 'Patients' | 'Specialists' | 'Administrators';

@Component({
	selector: 'superadmin-customers',
	templateUrl: './customers.component.html',
	styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
	
	public activeTab: CustomersTab = 'Patients';
	
	@ViewChild('customersTabs') customersTabs: ElementRef<HTMLUListElement>;

	@ViewChild('patientsPagination') patientsPagination: PaginationComponent;
	@ViewChild('specialistsPagination') specialistsPagination: PaginationComponent;
    @ViewChild('administratorsPagination') administratorsPagination: PaginationComponent;

	public patients: ICustomersList<SuperadminPatient, PatientsSorter> = {
		customers: [],
		sortBy: PatientsSorter.AverageScore,
		orderBy: SortBy.DESC,
		pageSize: 10,
		currentPage: 1,
		totalPages: 1,
		totalItems: 0,
		searchQuery: ""
	};

	public specialists: ICustomersList<SuperadminSpecialist, SpecialistsSorter> = {
		customers: [],
		sortBy: SpecialistsSorter.Rating,
		orderBy: SortBy.DESC,
		pageSize: 10,
		currentPage: 1,
		totalPages: 1,
		totalItems: 0,
		searchQuery: ""
	};

	public administrators: ICustomersList<Superadmin> = {
		customers: [],
		orderBy: SortBy.DESC,
		pageSize: 10,
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

	routeToCustomer(customerID: number) {
		this.router.navigateByUrl(`/superadmin/customers/${customerID}`);
    }

	ngOnInit(): void {
		
		this.loadPatients(this.patients.currentPage,
			this.patients.pageSize, 
			this.patients.sortBy, 
			this.patients.orderBy,
			this.patients.searchQuery);

		this.loadSpecialists(this.specialists.currentPage,
			this.specialists.pageSize,
			this.specialists.sortBy,
			this.specialists.orderBy,
			this.specialists.searchQuery);

		this.loadAdministrators(this.administrators.currentPage,
			this.administrators.pageSize,
			this.administrators.orderBy,
			this.administrators.searchQuery);
	}
	
	private loadPatients(pageNumber: number, pageSize: number, sortBy: PatientsSorter, orderBy: SortBy, searchQuery: string) {
		this.superadminService
			.getPatientsList({ pageNumber, pageSize, sortBy, orderBy, searchQuery })
			.subscribe(response => {
				this.patients.customers = response.data
					.map(patient => {
						patient.averageScore = parseFloat(patient.averageScore.toFixed(2));

						return patient;
					});

				this.patients.currentPage = response.currentPage;
				this.patients.pageSize = response.pageSize;
				this.patients.totalPages = response.totalPages;
				this.patients.totalItems = response.totalItems;
				this.patients.orderBy = response.orderBy;
				this.patients.sortBy = response.sortBy;
				this.patients.searchQuery = response.searchQuery ? response.searchQuery : "";
			});
	}

	private loadSpecialists(pageNumber: number, pageSize: number, sortBy: SpecialistsSorter, orderBy: SortBy, searchQuery: string) {
		this.superadminService
			.getSpecialistsList({ pageNumber, pageSize, sortBy, orderBy, searchQuery })
			.subscribe(response => {
				this.specialists.customers = response.data
					.map(specialist => {
						specialist.rating = parseFloat(specialist.rating.toFixed(2));

						return specialist;
					});

				this.specialists.currentPage = response.currentPage;
				this.specialists.pageSize = response.pageSize;
				this.specialists.totalPages = response.totalPages;
				this.specialists.totalItems = response.totalItems;
				this.specialists.orderBy = response.orderBy;
				this.specialists.sortBy = response.sortBy;
				this.specialists.searchQuery = response.searchQuery ? response.searchQuery : "";
			});
	}

	private loadAdministrators(pageNumber: number, pageSize: number, orderBy: SortBy, searchQuery: string) {
		this.superadminService
			.getAdministratorsList({ pageNumber, pageSize, orderBy, searchQuery })
			.subscribe(response => {
				this.administrators.customers = response.data;

				this.administrators.currentPage = response.currentPage;
				this.administrators.pageSize = response.pageSize;
				this.administrators.totalPages = response.totalPages;
				this.administrators.totalItems = response.totalItems;
				this.administrators.orderBy = response.orderBy;
				this.administrators.searchQuery = response.searchQuery ? response.searchQuery : "";
			});
	}

	setSearchQuery(tab: CustomersTab) {
		switch (tab) {
			case 'Patients': {
				return this.loadPatients(
					this.patients.currentPage,
					this.patients.pageSize,
					this.patients.sortBy,
					this.patients.orderBy,
					this.patients.searchQuery
				);
			}

			case 'Specialists': {
				return this.loadSpecialists(
					this.specialists.currentPage,
					this.specialists.pageSize,
					this.specialists.sortBy,
					this.specialists.orderBy,
					this.specialists.searchQuery
				);
			}

			case 'Administrators': {
				return this.loadAdministrators(
					this.administrators.currentPage,
					this.administrators.pageSize,
					this.administrators.orderBy,
					this.administrators.searchQuery
				);
			}
		}
	}

	convertCustomerRole(role: UserRole) {
		switch (role) {
			case UserRole.Client:
				return 'Пациент';

			case UserRole.Specialist:
				return 'Специалист';

			case UserRole.Administrator:
				return 'Админ';
		}
	}

    setPageSize(tab: CustomersTab, value: number) {
		if (tab == 'Patients') {
			this.patients.pageSize = Number(value);

			this.loadPatients(1, Number(value), 
				this.patients.sortBy, 
				this.patients.orderBy,
				this.patients.searchQuery);

			return;
		}

		if (tab == 'Specialists') {
			this.specialists.pageSize = Number(value);

			this.loadSpecialists(1, Number(value), 
			this.specialists.sortBy, 
			this.specialists.orderBy,
			this.specialists.searchQuery);

			return;
		}

		if (tab == 'Administrators') {
			this.administrators.pageSize = Number(value);

			this.loadAdministrators(1, Number(value), 
			this.administrators.orderBy,
			this.administrators.searchQuery);

			return;
		}

		return;
	}

	setPageNumber(tab: CustomersTab, value: number) {
		window.scroll(0,0);

		if (tab == 'Patients') {
			this.loadPatients(value, 
				this.patients.pageSize, 
				this.patients.sortBy, 
				this.patients.orderBy,
				this.patients.searchQuery);

			return;
		}

		if (tab == 'Specialists') {
			this.loadSpecialists(value, 
				this.specialists.pageSize, 
				this.specialists.sortBy, 
				this.specialists.orderBy,
				this.specialists.searchQuery);

			return;
		}

		if (tab == 'Administrators') {
			this.loadAdministrators(value, 
				this.specialists.pageSize, 
				this.administrators.orderBy,
				this.administrators.searchQuery);

			return;
		}

		return;
	}
    
    setSorter(tab: CustomersTab, sorter: PatientsSorter | SpecialistsSorter) {
		switch (tab) {
			case 'Patients': {
				if (sorter == this.patients.sortBy) {
					this.toggleSortDirection(tab);

					break;
				}

				this.patients.sortBy = sorter as PatientsSorter;
				this.patients.orderBy = SortBy.DESC;

				this.loadPatients(this.patients.currentPage, 
					this.patients.pageSize, 
					this.patients.sortBy, 
					SortBy.DESC,
					this.patients.searchQuery);

				break;
			}

			case 'Specialists': {
				if (sorter == this.specialists.sortBy) {
					this.toggleSortDirection(tab);

					break;
				}

				this.specialists.sortBy = sorter as SpecialistsSorter;
				this.specialists.orderBy = SortBy.DESC;

				this.loadSpecialists(this.specialists.currentPage, 
					this.specialists.pageSize,
					this.specialists.sortBy,
					SortBy.DESC,
					this.specialists.searchQuery);

				break;
			}

			case 'Administrators': {
				if (sorter == this.administrators.sortBy) {
					this.toggleSortDirection(tab);

					break;
				}

				this.administrators.orderBy = SortBy.DESC;

				this.loadAdministrators(this.administrators.currentPage, 
					this.administrators.pageSize, 
					SortBy.DESC,
					this.administrators.searchQuery);

				break;
			}
		}
	}

	toggleSortDirection(tab: CustomersTab) {
		switch (tab) {
			case 'Patients': {
				if (this.patients.orderBy == SortBy.ASC) {
					this.patients.orderBy = SortBy.DESC;
		
					this.loadPatients(this.patients.currentPage, 
						this.patients.pageSize, 
						this.patients.sortBy, 
						SortBy.DESC,
						this.patients.searchQuery);
		
					break;
				}
		
				if (this.patients.orderBy == SortBy.DESC) {
					this.patients.orderBy = SortBy.ASC;
		
					this.loadPatients(this.patients.currentPage, 
						this.patients.pageSize, 
						this.patients.sortBy, 
						SortBy.ASC,
						this.patients.searchQuery);

					break;
				}
			}

			case 'Specialists': {
				if (this.specialists.orderBy == SortBy.ASC) {
					this.specialists.orderBy = SortBy.DESC;
		
					this.loadSpecialists(this.specialists.currentPage, 
						this.specialists.pageSize, 
						this.specialists.sortBy, 
						SortBy.DESC,
						this.specialists.searchQuery);
		
					break;
				}
		
				if (this.specialists.orderBy == SortBy.DESC) {
					this.specialists.orderBy = SortBy.ASC;
		
					this.loadSpecialists(this.specialists.currentPage, 
						this.specialists.pageSize, 
						this.specialists.sortBy, 
						SortBy.ASC,
						this.specialists.searchQuery);

					break;
				}
			}

			case 'Administrators': {
				if (this.administrators.orderBy == SortBy.ASC) {
					this.administrators.orderBy = SortBy.DESC;
		
					this.loadAdministrators(this.administrators.currentPage, 
						this.administrators.pageSize, 
						SortBy.DESC,
						this.administrators.searchQuery);
		
					break;
				}
		
				if (this.administrators.orderBy == SortBy.DESC) {
					this.administrators.orderBy = SortBy.ASC;
		
					this.loadAdministrators(this.administrators.currentPage, 
						this.administrators.pageSize,
						SortBy.ASC,
						this.administrators.searchQuery);

					break;
				}
			}
		}

		

		return;
	}

	setActiveTab(tab: CustomersTab) {
		this.activeTab = tab;

        if (!this.customersTabs) {
            return;
        }

        const item = this.customersTabs.nativeElement.getElementsByTagName('li').namedItem(tab);
        const margin = parseInt(window.getComputedStyle(item).marginLeft);
        const scrollTo = (margin / 2) + (item.offsetLeft - item.offsetWidth);

        this.customersTabs.nativeElement.scrollTo({
            left: scrollTo,
            behavior: 'smooth'
        });
    }
}