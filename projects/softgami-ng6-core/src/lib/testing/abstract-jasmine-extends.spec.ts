import { AbstractJasmineExtends } from './abstract-jasmine-extends';

class JasmineExtends extends AbstractJasmineExtends { }

describe('AbstractJasmineExtends', () => {

    let jasmineExtends: JasmineExtends;

    beforeEach(() => {

        jasmineExtends = new JasmineExtends();

    });

    it('should create an instance', () => {

        expect(jasmineExtends).toBeTruthy();

    });

    afterEach(() => {

        jasmineExtends = null;

    });

});
