import { Component, OnInit } from '@angular/core';
import { UsersWalletsService, AuthService } from 'src/app/common/services';
import { UserWallet } from 'src/app/common/models';

@Component({
	selector: 'superadmin-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    
    public wallet: UserWallet;

    constructor(
        private authService: AuthService,
        private usersWalletsService: UsersWalletsService
    ) {

    }

    ngOnInit(): void {
        this.loadWallet();
    }

    logout() {
        this.authService.logout().subscribe();
    }

    private loadWallet() {
        this.usersWalletsService.getMyWallet()
            .subscribe(res => {
                if (!res.success) {
                    return;
                }

                this.wallet = res.data;
            });
    }
}