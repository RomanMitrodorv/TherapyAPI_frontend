import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { StringHelper } from 'src/app/common/helpers';
import { SuperadminCustomerCard } from '../../models';
import { SuperadminService } from '../../services';
import { UserRole } from 'src/app/common/enums';

@Component({
	selector: 'superadmin-customer',
	templateUrl: './customer.component.html',
	styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

    public customer: SuperadminCustomerCard;
    public isRoleListExpanded = false;

    constructor(
        private location: Location,
        private superAdminService: SuperadminService,
        private route: ActivatedRoute
    ) {
        
    }

    ngOnInit(): void {
        this.route.params
            .subscribe(params => {
                if (!params['customerID']) {
                    return;
                }

                this.loadCustomer(params['customerID']);
            });
    }

    private loadCustomer(customerID: number) {
        this.superAdminService.getCustomer(customerID)
            .subscribe(customer => {
                this.customer = customer;
            });
    }

    toggleRoleListExpand() {
        this.isRoleListExpanded = !this.isRoleListExpanded;
    }

    changeCustomerRole(role: UserRole) {
        if (role == this.customer.role) {
            return;
        }

        this.customer.role = role;

        this.superAdminService
            .changeCustomerRole({ role }, this.customer.userID)
            .subscribe(customer => {
                this.customer = customer;
                this.isRoleListExpanded = false;
            });
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

    convertCustomerRoleReverse(role: string) {
		switch (role) {
			case 'Пациент':
				return UserRole.Client;

			case 'Специалист':
				return UserRole.Specialist;

			case 'Админ':
				return UserRole.Administrator;
		}
    }
    
    getRolesList() {
        return ['Пациент', 'Специалист', 'Админ']
            .filter(role => role != this.convertCustomerRole(this.customer.role));
    }

    getPhone() {
		return StringHelper.formatPhone(this.customer.phoneNumber);
    }
    
    normalizeMonth(monthStr: string) {
        return monthStr.replace(".", "").substr(0, 3);
    }

    getEndDate(date: Date) {
        const result = new Date(date);
        result.setDate(result.getDate() + 1);

        return result;
    }

    prevRoute() {
		this.location.back();
    }

    reloadData(event) {
        this.loadCustomer(this.customer.userID);
    }
}