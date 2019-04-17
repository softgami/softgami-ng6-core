import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoftgamiNg6CoreComponent } from './softgami-ng6-core.component';

describe('SoftgamiNg6CoreComponent', () => {
    let component: SoftgamiNg6CoreComponent;
    let fixture: ComponentFixture<SoftgamiNg6CoreComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ SoftgamiNg6CoreComponent ]
        })
        .compileComponents();
    }));

    beforeEach(() => {

        fixture = TestBed.createComponent(SoftgamiNg6CoreComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

    });

    it('should create', () => {

        expect(component).toBeTruthy();

    });
});
