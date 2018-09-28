import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LazyComponent } from './lazy/lazy.component';
import { Lazy2Component } from './lazy2/lazy2.component';
import { LazyRoutingModule } from './lazy-routing.module';

@NgModule({
    imports: [
        CommonModule,
        LazyRoutingModule,
    ],
    declarations: [
        LazyComponent,
        Lazy2Component,
    ],
})
export class LazyModule { }
