import { Inject, Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

import { SHOULD_ENCRYPT } from './should-encrypt.const';

@Injectable({
    providedIn: 'root',
})
export class SessionStorageService {

    privateKey: string;
    shouldEncrypt: boolean;

    constructor(@Inject(SHOULD_ENCRYPT) shouldEncrypt: boolean) {
        // tslint:disable-next-line:max-line-length
        this.privateKey = '28139f5bfdf08fe0a57cadb9625c28785dad6d46b6a5df0a69c5e0349e79c680ac4cc9a850bd402e15f64403d6b48ddeca6f6c4e6e869e05adba0796ef9c728b';
        this.shouldEncrypt = shouldEncrypt;
    }

    set(key: string, value: object | number | string | boolean): void {

        if (!this.shouldEncrypt) {
            window.sessionStorage.setItem(key, JSON.stringify(value));
            return;
        }

        const hashedKey = CryptoJS.SHA512(key).toString();
        const encryptedValue = CryptoJS.AES.encrypt(
            JSON.stringify(value),
            this.privateKey
        ).toString();

        window.sessionStorage.setItem(hashedKey, encryptedValue);

    }

    get(key: string): object | number | string | boolean | undefined {
        if (!this.shouldEncrypt) {
          const value: string = sessionStorage.getItem(key);
          return value ? JSON.parse(value) : undefined;
        }

        const hashedKey = CryptoJS.SHA512(key).toString();
        const encryptedValue = sessionStorage.getItem(hashedKey);
        if (!encryptedValue) {
            return undefined;
        }

        const encryptedBytes = CryptoJS.AES.decrypt(
          encryptedValue,
          this.privateKey
        );
        const encryptedString = encryptedBytes.toString(CryptoJS.enc.Utf8);

        let decryptedValue;
        try {
            decryptedValue = JSON.parse(encryptedString);
        } catch (e) {}
        return decryptedValue;
    }

    clear() {
        window.sessionStorage.clear();
    }

}
