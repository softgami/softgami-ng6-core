import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LazyComponent } from './lazy/lazy.component';
import { Lazy2Component } from './lazy2/lazy2.component';

const routes: Routes = [
    {
        path: '',
        component: LazyComponent,
        children: [
            {
                path: 'collections',
                component: Lazy2Component,
                pathMatch: 'full',
            },
            {
                path: 'collections/:id',
                component: Lazy2Component,
                pathMatch: 'full',
            },
        ],
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [RouterModule],
})
export class LazyRoutingModule {
}
