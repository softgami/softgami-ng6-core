import { TestBed, inject } from '@angular/core/testing';
import * as CryptoJS from 'crypto-js';

import { Html5StorageService } from './html5-storage.service';

describe('Html5StorageService', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                Html5StorageService,
            ],
        });
    });

    it('should be created', inject([Html5StorageService], (service: Html5StorageService) => {

        expect(service).toBeTruthy();

    }));

    it('when should not encrypt should set session storage without encryption',
        inject([Html5StorageService], (service: Html5StorageService) => {

        service.storage = window.sessionStorage;
        const spy = spyOn(window.sessionStorage, 'setItem').and.returnValue(true);
        const spyCryptoJsSHA512 = spyOn(CryptoJS, 'SHA512').and.returnValue('encryptedKey');
        const spyCryptoJsEncrypt = spyOn(CryptoJS.AES, 'encrypt').and.returnValue('encryptedValue');
        const spyChange = spyOn(service.changes, 'next').and.returnValue(null);
        service.shouldEncrypt = false;

        service.set('key', 'value');

        expect(spy).toHaveBeenCalledWith('key', JSON.stringify('value'));
        expect(spyCryptoJsSHA512).not.toHaveBeenCalled();
        expect(spyCryptoJsEncrypt).not.toHaveBeenCalled();
        expect(spyChange).toHaveBeenCalledWith('key');

    }));

    it('when should encrypt should set session storage with encryption',
        inject([Html5StorageService], (service: Html5StorageService) => {

        service.storage = window.sessionStorage;
        const spySession = spyOn(window.sessionStorage, 'setItem').and.returnValue(true);
        const spyCryptoJsSHA512 = spyOn(CryptoJS, 'SHA512').and.returnValue('encryptedKey');
        const spyCryptoJsEncrypt = spyOn(CryptoJS.AES, 'encrypt').and.returnValue('encryptedValue');
        const spyChange = spyOn(service.changes, 'next').and.returnValue(null);
        service.shouldEncrypt = true;

        service.set('key', 'value');

        expect(spySession).toHaveBeenCalledWith('encryptedKey', 'encryptedValue');
        expect(spyCryptoJsSHA512).toHaveBeenCalledWith('key');
        expect(spyCryptoJsEncrypt).toHaveBeenCalledWith(JSON.stringify('value'), service.privateKey);
        expect(spyChange).toHaveBeenCalledWith('key');

    }));

    it('when should not encrypt and value string should get session storage string without encryption',
        inject([Html5StorageService], (service: Html5StorageService) => {

        service.storage = window.sessionStorage;
        const spySession = spyOn(window.sessionStorage, 'getItem').and.returnValue('"valueFromSessionStorage"');
        const spyCryptoJsSHA512 = spyOn(CryptoJS, 'SHA512').and.returnValue('encryptedKey');
        const spyCryptoJsDecrypt = spyOn(CryptoJS.AES, 'decrypt').and.returnValue('encryptedValue');
        service.shouldEncrypt = false;

        const result = service.get('key');

        expect(result).toBeDefined();
        expect(spySession).toHaveBeenCalledWith('key');
        expect(spyCryptoJsSHA512).not.toHaveBeenCalled();
        expect(spyCryptoJsDecrypt).not.toHaveBeenCalled();

    }));

    it('when should not encrypt and value undefined should get session storage undefined without encryption',
        inject([Html5StorageService], (service: Html5StorageService) => {

        service.storage = window.sessionStorage;
        const spySession = spyOn(window.sessionStorage, 'getItem').and.returnValue(undefined);
        const spyCryptoJsSHA512 = spyOn(CryptoJS, 'SHA512').and.returnValue('encryptedKey');
        const spyCryptoJsDecrypt = spyOn(CryptoJS.AES, 'decrypt').and.returnValue('encryptedValue');
        service.shouldEncrypt = false;

        const result = service.get('key');

        expect(result).toBeUndefined();
        expect(spySession).toHaveBeenCalledWith('key');
        expect(spyCryptoJsSHA512).not.toHaveBeenCalled();
        expect(spyCryptoJsDecrypt).not.toHaveBeenCalled();

    }));

    it('when should encrypt and value undefined should get session storage undefined with encryption',
        inject([Html5StorageService], (service: Html5StorageService) => {

        service.storage = window.sessionStorage;
        const spySession = spyOn(window.sessionStorage, 'getItem').and.returnValue(undefined);
        const spyCryptoJsSHA512 = spyOn(CryptoJS, 'SHA512').and.returnValue('encryptedKey');
        const spyCryptoJsDecrypt = spyOn(CryptoJS.AES, 'decrypt').and.returnValue('encryptedValue');
        service.shouldEncrypt = true;

        const result = service.get('key');

        expect(result).toBeUndefined();
        expect(spySession).not.toHaveBeenCalledWith('key');
        expect(spySession).toHaveBeenCalledWith('encryptedKey');
        expect(spyCryptoJsSHA512).toHaveBeenCalledWith('key');
        expect(spyCryptoJsDecrypt).not.toHaveBeenCalled();

    }));

    it('when should encrypt and value string parseable should get session storage string with encryption',
        inject([Html5StorageService], (service: Html5StorageService) => {

        service.storage = window.sessionStorage;
        const spySession = spyOn(window.sessionStorage, 'getItem').and.returnValue('"valueFromSessionStorage"');
        const spyCryptoJsSHA512 = spyOn(CryptoJS, 'SHA512').and.returnValue('encryptedKey');
        const spyCryptoJsDecrypt = spyOn(CryptoJS.AES, 'decrypt').and.returnValue('"decryptedValue"');
        service.shouldEncrypt = true;

        const result = service.get('key');

        expect(result).toBeDefined();
        expect(spySession).not.toHaveBeenCalledWith('key');
        expect(spySession).toHaveBeenCalledWith('encryptedKey');
        expect(spyCryptoJsSHA512).toHaveBeenCalled();
        expect(spyCryptoJsDecrypt).toHaveBeenCalledWith('"valueFromSessionStorage"', service.privateKey);

    }));

    it('when should encrypt and value string not parseable should get session storage undefined with encryption',
        inject([Html5StorageService], (service: Html5StorageService) => {

        service.storage = window.sessionStorage;
        const spySession = spyOn(window.sessionStorage, 'getItem').and.returnValue('"valueFromSessionStorage"');
        const spyCryptoJsSHA512 = spyOn(CryptoJS, 'SHA512').and.returnValue('encryptedKey');
        const spyCryptoJsDecrypt = spyOn(CryptoJS.AES, 'decrypt').and.returnValue('decryptedValue not parseable');
        service.shouldEncrypt = true;

        const result = service.get('key');

        expect(result).toBeUndefined();
        expect(spySession).not.toHaveBeenCalledWith('key');
        expect(spySession).toHaveBeenCalledWith('encryptedKey');
        expect(spyCryptoJsSHA512).toHaveBeenCalled();
        expect(spyCryptoJsDecrypt).toHaveBeenCalledWith('"valueFromSessionStorage"', service.privateKey);

    }));

    it('when clear called should call sessionStorage clear',
        inject([Html5StorageService], (service: Html5StorageService) => {

        service.storage = window.sessionStorage;
        const spySession = spyOn(window.sessionStorage, 'clear').and.returnValue(true);

        service.clear();

        expect(spySession).toHaveBeenCalled();

    }));
});
