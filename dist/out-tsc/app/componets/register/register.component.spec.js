/* tslint:disable:no-unused-variable */
import { async, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
describe('RegisterComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [RegisterComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(RegisterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=E:/CPPBT 2018/angular-src/src/app/componets/register/register.component.spec.js.map