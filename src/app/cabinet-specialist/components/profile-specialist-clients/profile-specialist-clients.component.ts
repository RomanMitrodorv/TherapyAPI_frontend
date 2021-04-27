import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SpecialistService, AuthService } from 'src/app/common/services';
import { ClientCard } from 'src/app/common/models';
import { PaginationComponent } from 'src/app/layout/pagination/pagination.component';
import { ClientsSorter } from './clients-sorter.enum';
import { SortBy } from 'src/app/common/enums';
import { DateTimeHelper } from 'src/app/common/helpers';

@Component({
	selector: 'app-profile-specialist-clients',
	templateUrl: './profile-specialist-clients.component.html',
	styleUrls: ['./profile-specialist-clients.component.scss']
})
export class ProfileSpecialistClientsComponent implements OnInit {

    public clients: ClientCard[];

    public pageSize = 10;
    public pageNumber = 1;
    public totalPages = 1;

    public sorter: ClientsSorter;
	public sortBy: SortBy;

    @ViewChild(PaginationComponent) pagination: PaginationComponent;

    constructor(
        private authService: AuthService,
        private specialistService: SpecialistService,
        private router: Router
    ) {

    }

    private loadClients(pageNumber: number, pageSize: number) {
        this.specialistService.getClients({ pageNumber, pageSize })
            .subscribe(clientsResponse => {
                this.pageSize = clientsResponse.pageSize;
                this.pageNumber = clientsResponse.currentPage;
                this.totalPages = clientsResponse.totalPages;

				const clients = clientsResponse.data.map(client => {
					client.sessions.map(session => {
						session.sessionDate = DateTimeHelper.toLocalDateTime(session.sessionDate);
						session.specialistCloseDate = DateTimeHelper.toLocalDateTime(session.specialistCloseDate);
						return session;
					});

                    return client;
                });

                this.sortClients(clients);
            });
    }

    ngOnInit(): void {
        this.authService.isLoggedIn
            .subscribe(logged => {
                if (!logged) {
                    this.router.navigate(['/']);

                    return;
                }

                this.loadClients(1, 10);
            });
    }

    setPageSize(value: number) {
		this.loadClients(1, Number(value));
	}

	setPageNumber(value: number) {
		window.scroll(0,0);
		this.loadClients(value, this.pageSize);
    }
    
    private sortClients(clients: ClientCard[]) {
		if (this.sorter == ClientsSorter.Paid) {
			if (this.sortBy == SortBy.ASC) {
				this.clients = clients.sort((a, b) => {
					return a.paid - b.paid;
				});

				//window.scroll(0,0);

				return;
			}
			
			if (this.sortBy == SortBy.DESC) {
				this.clients = clients.sort((a, b) => {
					return b.paid - a.paid;
				});

				//window.scroll(0,0);

				return;
			}

			return;
		}

		if (this.sorter == ClientsSorter.Score) {
			if (this.sortBy == SortBy.ASC) {
				this.clients = clients.sort((a, b) => {
					return a.averageScore - b.averageScore;
				});

				//window.scroll(0,0);

				return;
			}
			
			if (this.sortBy == SortBy.DESC) {
				this.clients = clients.sort((a, b) => {
					return b.averageScore - a.averageScore;
				});

				//window.scroll(0,0);

				return;
			}

			return;
		}

		if (this.sorter == ClientsSorter.Sessions) {
			if (this.sortBy == SortBy.ASC) {
				this.clients = clients.sort((a, b) => {
					return a.sessions.length - b.sessions.length;
				});

				//window.scroll(0,0);

				return;
			}
			
			if (this.sortBy == SortBy.DESC) {
				this.clients = clients.sort((a, b) => {
					return b.sessions.length - a.sessions.length;
				});

				//window.scroll(0,0);

				return;
			}

			return;
		}

		this.clients = clients;
    }
    
    setSorter(sorter: ClientsSorter) {
		if (sorter == this.sorter) {
			this.toggleSortDirection();

			return;
		}

		this.sorter = sorter;
		this.sortBy = SortBy.ASC;

		this.sortClients(this.clients);
	}

	toggleSortDirection() {
		if (this.sortBy == SortBy.ASC) {
			this.sortBy = SortBy.DESC;

			this.sortClients(this.clients);

			return;
		}

		if (this.sortBy == SortBy.DESC) {
			this.sortBy = SortBy.ASC;

			this.sortClients(this.clients);

			return;
		}

		return;
	}
}