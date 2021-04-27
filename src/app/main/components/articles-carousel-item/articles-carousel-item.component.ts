import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageHelper } from 'src/app/common/helpers';
import { Article, Specialist } from 'src/app/common/models';
import { AuthService, SpecialistsService, StorageService } from 'src/app/common/services';

@Component({
    selector: 'articles-carousel-item',
    templateUrl: './articles-carousel-item.component.html',
    styleUrls: ['./articles-carousel-item.component.scss']
})
export class ArticlesCarouselItemComponent implements OnInit {

    public isLoggedIn = false;

    @Input('isSpecialist') isSpecialist: boolean;
    @Input('article') article: Article;

    constructor(
        private authService: AuthService,
        private storageService: StorageService,
        private router: Router
    ) {
        this.authService.isLoggedIn
            .subscribe(logged => {
                if(logged) {
                    this.isLoggedIn = logged;
                }
            });
    }

    ngOnInit() {
        
    }

    showSpecialistDialog(specialist: Specialist){
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