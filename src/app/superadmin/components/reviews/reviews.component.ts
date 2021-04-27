import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/common/services';


@Component({
	selector: 'superadmin-reviews',
	templateUrl: './reviews.component.html',
	styleUrls: ['./reviews.component.scss']
})
export class SuperadminReviewsComponent implements OnInit {

    constructor(
        private authService: AuthService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        
    }

    ngOnInit(): void {
        
    }
}