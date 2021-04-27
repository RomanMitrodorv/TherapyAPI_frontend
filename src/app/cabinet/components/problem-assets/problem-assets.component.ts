import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService, PatientService, RouterExtService } from 'src/app/common/services';
import { Problem, Session, ClientProblemAssets, ProblemImage } from 'src/app/common/models';
import { AssetType } from './asset-type.enum';
import { Location } from '@angular/common';

type AssetTab = "images" | "resources" | "sessions";

@Component({
	selector: 'cabinet-problem-assets',
	templateUrl: './problem-assets.component.html',
	styleUrls: ['./problem-assets.component.scss']
})
export class ProblemAssetsComponent implements OnInit {

    public activeTab: AssetTab = 'images';

    public problem: Problem;
    public sessions: Session[];
    public assets: ClientProblemAssets;

    @ViewChild('assetsTabs') private assetsTabs: ElementRef<HTMLUListElement>;
    
    constructor(
        private authService: AuthService,
        private patientService: PatientService,
        private router: Router,
        private route: ActivatedRoute,
        private location: Location
    ) {
        
    }

    prevRoute() {
		this.location.back();
	}

    ngOnInit(): void {
        this.authService.isLoggedIn
            .subscribe(logged => {
                if (!logged) {
                    this.router.navigate(['/sign-in']);

                    return;
                }

                this.route.params
                    .subscribe(params => {
                        if (!params['id']) {
                            this.router.navigate(['/profile']);

                            return;
                        }

                        this.loadProblem(params['id']);
                    });

                this.route.queryParams
                    .subscribe(params => {
                        const tab = params['tab'];

                        if (!tab) {
                            return;
                        }

                        this.setActiveTab(tab);
                    });
            });
    }

    private loadProblem(problemID: number) {
        this.patientService.getProblem(problemID)
            .subscribe(res => {
                if (!res.success) {
                    return;
                }

                this.problem = res.data;
                this.loadSessions();
                this.loadAssets();
            });
    }

    private loadSessions() {
        this.patientService.getSessions(this.problem.id)
            .subscribe(res => {
                if (!res.success) {
                    return;
                }

                this.sessions = res.data.filter(session => session.isClientClose && session.isSpecialistClose);
            });
    }

    private loadAssets() {
        this.patientService.getProblemAssets(this.problem.id)
            .subscribe(assets => {
                this.assets = assets;
                this.assets.images = assets.images.filter(x => !x.isHidden);
            });
    }

    setActiveTab(tab: AssetTab) {
        this.activeTab = tab;

        if (!this.assetsTabs) {
            return;
        }

        const item = this.assetsTabs.nativeElement.getElementsByTagName('li').namedItem(tab);
        const margin = parseInt(window.getComputedStyle(item).marginLeft);
        
        const scrollTo = (margin / 2) + (item.offsetLeft - item.offsetWidth);

        this.assetsTabs.nativeElement.scrollTo({
            left: scrollTo,
            behavior: 'smooth'
        });
    }

    normalizeMonth(monthStr: string) {
        return monthStr.replace(".", "").substr(0, 3);
    }

    routeToReview(session: Session) {
        const review = session.specialist.reviews.find(x => x.session.id == session.id);

        if (!review) {
            return;
        }

        this.router.navigateByUrl( `/specialists/${session.specialist.id}?review=${review.id}`);
    }

    getImageRelation(image: ProblemImage) {
        return this.assets.images.find(x => !x.isHidden && x.parentImage && x.parentImage.id == image.id);
    }
}