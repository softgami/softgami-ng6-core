import { Inject, Injectable } from '@angular/core';

import { Html5StorageService } from '../html5-storage.service';
import { SHOULD_ENCRYPT_SESSION_STORAGE } from '../should-encrypt-session-storage.const';

@Injectable({
    providedIn: 'root',
})
export class SessionStorageService extends Html5StorageService {

    shouldEncrypt: boolean;

    constructor(@Inject(SHOULD_ENCRYPT_SESSION_STORAGE) shouldEncrypt: boolean) {

        super(shouldEncrypt, window.sessionStorage);
        this.shouldEncrypt = shouldEncrypt;

    }

    set(key: string, value: object | number | string | boolean): void {

        super.set(key, value);

    }

    get(key: string): object | number | string | boolean | undefined {

        return super.get(key);

    }

    clear() {

        super.clear();

    }

}
