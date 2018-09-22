import { async, TestBed } from '@angular/core/testing';
import { PatientComponent } from './patient.component';
describe('PatientComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [PatientComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(PatientComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=E:/CPPBT 2018/angular-src/src/app/componets/patient/patient.component.spec.js.map