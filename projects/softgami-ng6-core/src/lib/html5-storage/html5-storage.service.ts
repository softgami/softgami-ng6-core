import { BehaviorSubject } from 'rxjs';
import { Inject, Injectable, Optional } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
    providedIn: 'root',
})
export abstract class Html5StorageService {

    privateKey: string;
    changes: BehaviorSubject<string>;

    constructor(
        @Inject('shouldEncrypt') @Optional() public shouldEncrypt?: boolean,
        @Inject('storage') @Optional() public storage?: any,
    ) {

        this.privateKey = '28139f5bfdf08fe0a57cadb9625c28785dad6d46b6a5df0a69c5e0349e79c680ac4cc9a850bd402e15f64403d6' +
            'b48ddeca6f6c4e6e869e05adba0796ef9c728b';
        this.shouldEncrypt = shouldEncrypt;
        this.storage = storage;
        this.changes = new BehaviorSubject(null);

    }

    set(key: string, value: object | number | string | boolean): void {

        if (value === undefined || value === null) {
            return;
        }
        if (!this.shouldEncrypt) {
            this.storage.setItem(key, JSON.stringify(value));
            this.changes.next(key);
            return;
        }

        const hashedKey = CryptoJS.SHA512(key).toString();
        const encryptedValue = CryptoJS.AES.encrypt(
            JSON.stringify(value),
            this.privateKey
        ).toString();

        this.storage.setItem(hashedKey, encryptedValue);
        this.changes.next(key);

    }

    get<T>(key: string): T {

        if (!this.shouldEncrypt) {
          const value: string = this.storage.getItem(key);
          return value ? JSON.parse(value) as T : undefined;
        }

        const hashedKey = CryptoJS.SHA512(key).toString();
        const encryptedValue = this.storage.getItem(hashedKey);
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
        return decryptedValue as T;

    }

    clear() {

        this.storage.clear();

    }

}
