import { CommonModule } from '@angular/common';
import { NgModule, InjectionToken } from '@angular/core';

import { SessionStorageService } from './session-storage.service';
import { SHOULD_ENCRYPT } from './should-encrypt.const';

@NgModule({
    imports: [
        CommonModule,
    ],
})
export class SessionStorageModule {
    static forRoot(shouldEncrypt: boolean) {
        return {
            ngModule: SessionStorageModule,
            providers: [
                {
                    provide: SHOULD_ENCRYPT,
                    useValue: shouldEncrypt,
                },
                SessionStorageService
            ],
        };
    }
}
