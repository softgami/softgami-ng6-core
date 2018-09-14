import { Component } from '@angular/core';
import { LocalStorageService, SessionStorageService } from 'softgami-ng6-core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'my-app';

    constructor(
        private sessionStorageService: SessionStorageService,
        private localStorageService: LocalStorageService,
    ) {

    }
}
