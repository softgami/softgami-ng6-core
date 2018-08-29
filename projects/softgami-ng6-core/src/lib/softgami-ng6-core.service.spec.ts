import { TestBed, inject } from '@angular/core/testing';

import { SoftgamiNg6CoreService } from './softgami-ng6-core.service';

describe('SoftgamiNg6CoreService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [SoftgamiNg6CoreService]
        });
    });

    it('should be created', inject([SoftgamiNg6CoreService], (service: SoftgamiNg6CoreService) => {
        expect(service).toBeTruthy();
    }));
});
