export abstract class AbstractJasmineExtends {

    public static createComponentSpy<T>(object: any): jasmine.SpyObj<T> {

        const skipMethodsList: string[] = [
            'constructor',
            'ngOnChanges',
            'ngOnInit',
            'ngDoCheck',
            'ngAfterContentInit',
            'ngAfterContentChecked',
            'ngAfterViewInit',
            'ngAfterViewChecked',
            'ngOnDestroy',
            '__defineGetter__',
            '__defineSetter__',
            'hasOwnProperty',
            '__lookupGetter__',
            '__lookupSetter__',
            'isPrototypeOf',
            'propertyIsEnumerable',
            'toString',
            'valueOf',
            'toLocaleString',
        ];

        const componentSpy: any = {};

        AbstractJasmineExtends.getInstanceMethodNames(object)
        .filter((property: string) => skipMethodsList.includes(property) === false)
        .forEach((property: string) => {
            componentSpy[property] = spyOn(object, property);
            componentSpy[property].and.callThrough();
        });

        return componentSpy as jasmine.SpyObj<T>;

    }

    public static getInstanceMethodNames(obj: any): string[] {

        const methodNames: string[] = [];

        let proto: any = Object.getPrototypeOf(obj);

        while (proto) {

            Object.getOwnPropertyNames(proto).forEach((name: string) => {
                if (name !== 'constructor') {
                    if (AbstractJasmineExtends.hasMethod(proto, name)) {
                        methodNames.push(name);
                    }
                }
            });
            proto = Object.getPrototypeOf(proto);

        }
        return methodNames;

    }

    public static hasMethod(obj: any, name: string) {

        const desc: PropertyDescriptor = Object.getOwnPropertyDescriptor(obj, name);
        return !!desc && typeof desc.value === 'function';

    }

    public static createServiceSpy<T>(type: any): jasmine.SpyObj<T> {

        return jasmine.createSpyObj<T>(type.name as string, Object.getOwnPropertyNames(type.prototype) as any);

    }

}
