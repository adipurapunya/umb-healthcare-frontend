import { TestBed, inject } from '@angular/core/testing';
import { ConstantvariablesService } from './constantvariables.service';
describe('ConstantvariablesService', function () {
    beforeEach(function () {
        TestBed.configureTestingModule({
            providers: [ConstantvariablesService]
        });
    });
    it('should be created', inject([ConstantvariablesService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=E:/CPPBT 2018/angular-src/src/app/services/constantvariables.service.spec.js.map