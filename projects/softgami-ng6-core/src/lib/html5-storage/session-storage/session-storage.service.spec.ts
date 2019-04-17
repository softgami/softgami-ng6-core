import { TestBed, inject } from '@angular/core/testing';

import { Html5StorageService } from '../html5-storage.service';
import { SessionStorageService } from './session-storage.service';
import { SHOULD_ENCRYPT_SESSION_STORAGE } from '../should-encrypt-session-storage.const';

describe('SessionStorageService', () => {
    let spySuper;
    beforeEach(() => {

        TestBed.configureTestingModule({
            providers: [
                SessionStorageService,
                {
                    provide: SHOULD_ENCRYPT_SESSION_STORAGE,
                    useValue: true,
                },
            ],
        });
    });

    it('should be created', inject([SessionStorageService], (service: SessionStorageService) => {

        expect(service).toBeTruthy();

    }));

    it('should call super set when values are passed', inject([SessionStorageService], (service: SessionStorageService) => {

        spySuper = spyOn(Html5StorageService.prototype, 'set');

        service.set('key', 'value');

        expect(spySuper).toHaveBeenCalledWith('key', 'value');

        service.set('key2', 'value2');

        expect(spySuper).toHaveBeenCalledWith('key2', 'value2');

    }));

    it('should call super get when values are passed', inject([SessionStorageService], (service: SessionStorageService) => {

        spySuper = spyOn(Html5StorageService.prototype, 'get').and.returnValue('value');

        const result = service.get('key');

        expect(spySuper).toHaveBeenCalledWith('key');
        expect(result).toEqual('value');

        spySuper.and.returnValue('value2');

        const result2 = service.get('key2');

        expect(spySuper).toHaveBeenCalledWith('key2');
        expect(result2).toEqual('value2');

    }));

    it('should call super clear when clear was called', inject([SessionStorageService], (service: SessionStorageService) => {

        spySuper = spyOn(Html5StorageService.prototype, 'clear');

        service.clear();

        expect(spySuper).toHaveBeenCalled();

    }));

});
