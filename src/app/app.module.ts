import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SoftgamiNg6CoreModule } from 'softgami-ng6-core';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        SoftgamiNg6CoreModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
