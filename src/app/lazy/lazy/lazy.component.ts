import { Component, OnInit } from '@angular/core';

import { RouterTranslatorService } from 'softgami-ng6-core';

@Component({
    selector: 'app-lazy',
    templateUrl: './lazy.component.html',
    styleUrls: ['./lazy.component.scss'],
})
export class LazyComponent implements OnInit {

    constructor(private routerTranslatorService: RouterTranslatorService) {
        console.log(`router count`);
        console.log(this.routerTranslatorService.routesList);
    }

    ngOnInit() {
    }

}
