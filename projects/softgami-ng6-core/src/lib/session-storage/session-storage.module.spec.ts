import { SessionStorageModule } from './session-storage.module';
import { SessionStorageService } from './session-storage.service';
import { SHOULD_ENCRYPT } from './should-encrypt.const';

describe('SessionStorageModule', () => {
    let sessionStorageModule: SessionStorageModule;

    beforeEach(() => {
        sessionStorageModule = new SessionStorageModule();
    });

    it('should create an instance', () => {
        expect(sessionStorageModule).toBeTruthy();
    });

    it('for root with should encrypt true should return object with should encrypt true', () => {
        expect(sessionStorageModule).toBeTruthy();

        const result = SessionStorageModule.forRoot(true);

        expect(result).toEqual({
            ngModule: SessionStorageModule,
            providers: [
                {
                    provide: SHOULD_ENCRYPT,
                    useValue: true,
                },
                SessionStorageService
            ],
        });
    });

    it('for root with should encrypt false should return object with should encrypt false', () => {
        expect(sessionStorageModule).toBeTruthy();

        const result = SessionStorageModule.forRoot(false);

        expect(result).toEqual({
            ngModule: SessionStorageModule,
            providers: [
                {
                    provide: SHOULD_ENCRYPT,
                    useValue: false,
                },
                SessionStorageService
            ],
        });
    });
});
