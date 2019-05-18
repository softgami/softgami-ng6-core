import { ModuleWithProviders } from '@angular/core';

import { TestingModule } from './testing.module';

describe('TestingModule', () => {

    let testingModule: TestingModule;

    beforeEach(() => {

        testingModule = new TestingModule();

    });

    it('should create an instance', () => {

        expect(testingModule).toBeTruthy();

    });

    it('forRoot should return object when called', () => {

        const result: ModuleWithProviders = TestingModule.forRoot();

        expect(result).toEqual({
            ngModule: TestingModule,
            providers: [],
        });

    });

    afterEach(() => {

        testingModule = null;

    });

});
