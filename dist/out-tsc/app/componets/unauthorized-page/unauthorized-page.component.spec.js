import { async, TestBed } from '@angular/core/testing';
import { UnauthorizedPageComponent } from './unauthorized-page.component';
describe('UnauthorizedPageComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [UnauthorizedPageComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(UnauthorizedPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=E:/CPPBT 2018/angular-src/src/app/componets/unauthorized-page/unauthorized-page.component.spec.js.map