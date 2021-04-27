import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'landing-footer',
	templateUrl: './landing-footer.component.html',
	styleUrls: ['./landing-footer.component.scss']
})
export class LandingFooterComponent {

	constructor() {

	}

	scrollTop(): void {
		const element = document.querySelector(".main-banner");
		if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}
}