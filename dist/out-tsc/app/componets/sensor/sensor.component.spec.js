import { async, TestBed } from '@angular/core/testing';
import { SensorComponent } from './sensor.component';
describe('SensorComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [SensorComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(SensorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=E:/CPPBT 2018/angular-src/src/app/componets/sensor/sensor.component.spec.js.map