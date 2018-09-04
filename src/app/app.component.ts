import { Component } from '@angular/core';
import { SessionStorageService } from 'softgami-ng6-core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'my-app';

    constructor(private sessionStorageService: SessionStorageService) {
        console.log(this.sessionStorageService.shouldEncrypt);
    }
}
