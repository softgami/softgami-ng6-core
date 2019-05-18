import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

@NgModule({
    imports: [
        CommonModule,
    ],
})
export class TestingModule {

    static forRoot(): ModuleWithProviders {

        return {
            ngModule: TestingModule,
            providers: [],
        };

    }

}
