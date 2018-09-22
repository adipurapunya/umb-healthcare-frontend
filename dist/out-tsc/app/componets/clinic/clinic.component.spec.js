import { async, TestBed } from '@angular/core/testing';
import { ClinicComponent } from './clinic.component';
describe('ClinicComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [ClinicComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(ClinicComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=E:/CPPBT 2018/angular-src/src/app/componets/clinic/clinic.component.spec.js.map