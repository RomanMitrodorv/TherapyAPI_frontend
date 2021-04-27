import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService, PatientService, SpecialistsService, UsersWalletsService } from 'src/app/common/services';
import { Problem, Specialist, UserWallet } from 'src/app/common/models';
import { SpecialistsSorter } from 'src/app/specialists/components/specialists/specialists-sorter.enum';
import { SortBy } from 'src/app/common/enums';
import { PaginationComponent } from 'src/app/layout/pagination/pagination.component';
import { Location } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'cabinet-choose-specialist',
    templateUrl: './choose-specialist.component.html',
    styleUrls: ['./choose-specialist.component.scss']
})
export class ChooseSpecialistComponent implements OnInit {

    private isLoadingSubject = new BehaviorSubject(false);

    public get isLoading() {
        return this.isLoadingSubject.value;
    }

    public wallet: UserWallet;
    public specialists: Specialist[];
    public problem: Problem;
    public activeSessionID: number;

    public pageSize = 6;
    public pageNumber = 1;
    public totalPages = 1;

    public sorter = SpecialistsSorter.Price;
    public sortBy = SortBy.DESC;

    @ViewChild(PaginationComponent) pagination: PaginationComponent;

    constructor(
        private specialistsService: SpecialistsService,
        private usersWalletsService: UsersWalletsService,
        private patientService: PatientService,
        private router: Router,
        private route: ActivatedRoute,
        private location: Location
    ) {
        this.route.queryParams
            .subscribe(params => {
                if (params['activeSession']) {
                    this.activeSessionID = params['activeSession'];
                };
            });
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
            
        this.route.params
            .subscribe(params => {
                if (!params['id']) {
                    this.router.navigate(['/profile']);

                    return;
                }

                this.loadProblem(params['id']);
            });

        this.loadWallet();
        this.loadSpecialists(this.pageNumber, this.pageSize, this.sorter, this.sortBy);
    }

    private loadWallet() {
        this.usersWalletsService.getMyWallet()
            .subscribe(res => {
                this.wallet = res.data;
            });
    }

    private createSession(specialist: Specialist) {
        this.patientService.createProblemSession({ specialistID: specialist.id }, this.problem.id)
            .subscribe(res => {
                if (!res.success) {
                    return;
                }

                if ((this.wallet.balance - this.wallet.lockedBalance) < specialist.price) {
                    this.router.navigate([`/profile/problems/${this.problem.id}/choose-specialist/${specialist.id}/pay`]);

                    return;
                }

                this.patientService.startSession(this.problem.id, res.sessionID || this.activeSessionID)
                    .subscribe(res => {
                        if (!res.success) {
                            return;
                        }

                        this.router.navigate(['/profile']);
                    });
            });
    }

    private changeSessionSpecialist(specialist: Specialist) {
        this.patientService.changeSessionSpecialist({
            specialistID: specialist.id
        }, this.problem.id, this.activeSessionID)
            .subscribe(res => {
                if (!res.success) {
                    return;
                }

                if ((this.wallet.balance - this.wallet.lockedBalance) < specialist.price) {
                    this.router.navigate([`/profile/problems/${this.problem.id}/choose-specialist/${specialist.id}/pay`]);

                    return;
                }

                this.patientService.startSession(this.problem.id, this.activeSessionID)
                    .subscribe(res => {
                        if (!res.success) {
                            return;
                        }

                        this.router.navigate(['/profile']);
                    });
            });
    }

    chooseSpecialist(specialistID: number) {
        const specialist = this.specialists.find(x => x.id == specialistID);

        if (!specialist) {
            return;
        }

        if (!this.activeSessionID) {
            this.createSession(specialist);

            return;
        }

        this.changeSessionSpecialist(specialist);
    }

    private loadProblem(problemID: number) {
        this.patientService.getProblem(problemID)
            .subscribe(res => {
                if (!res.success) {
                    return;
                }

                this.problem = res.data;
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

    prevRoute() {
        this.location.back();
    }
}