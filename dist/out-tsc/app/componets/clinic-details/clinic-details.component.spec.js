import { async, TestBed } from '@angular/core/testing';
import { ClinicDetailsComponent } from './clinic-details.component';
describe('ClinicDetailsComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [ClinicDetailsComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(ClinicDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=E:/CPPBT 2018/angular-src/src/app/componets/clinic-details/clinic-details.component.spec.js.map