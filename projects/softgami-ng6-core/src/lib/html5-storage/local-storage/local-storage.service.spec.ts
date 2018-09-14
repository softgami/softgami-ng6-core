import { TestBed, inject } from '@angular/core/testing';

import { Html5StorageService } from '../html5-storage.service';
import { LocalStorageService } from './local-storage.service';
import { SHOULD_ENCRYPT_LOCAL_STORAGE } from '../should-encrypt-local-storage.const';

describe('LocalStorageService', () => {
    let spySuper;
    beforeEach(() => {

        TestBed.configureTestingModule({
            providers: [
                LocalStorageService,
                {
                    provide: SHOULD_ENCRYPT_LOCAL_STORAGE,
                    useValue: true,
                },
            ],
        });
    });

    it('should be created', inject([LocalStorageService], (service: LocalStorageService) => {
        expect(service).toBeTruthy();
    }));

    it('should call super set when values are passed', inject([LocalStorageService], (service: LocalStorageService) => {

        spySuper = spyOn(Html5StorageService.prototype, 'set');

        service.set('key', 'value');

        expect(spySuper).toHaveBeenCalledWith('key', 'value');

        service.set('key2', 'value2');

        expect(spySuper).toHaveBeenCalledWith('key2', 'value2');

    }));

    it('should call super get when values are passed', inject([LocalStorageService], (service: LocalStorageService) => {

        spySuper = spyOn(Html5StorageService.prototype, 'get').and.returnValue('value');

        const result = service.get('key');

        expect(spySuper).toHaveBeenCalledWith('key');
        expect(result).toEqual('value');

        spySuper.and.returnValue('value2');

        const result2 = service.get('key2');

        expect(spySuper).toHaveBeenCalledWith('key2');
        expect(result2).toEqual('value2');

    }));

    it('should call super clear when clear was called', inject([LocalStorageService], (service: LocalStorageService) => {

        spySuper = spyOn(Html5StorageService.prototype, 'clear');

        service.clear();

        expect(spySuper).toHaveBeenCalled();

    }));

});
