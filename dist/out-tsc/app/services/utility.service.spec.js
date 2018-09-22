import { TestBed, inject } from '@angular/core/testing';
import { UtilityService } from './utility.service';
describe('UtilityService', function () {
    beforeEach(function () {
        TestBed.configureTestingModule({
            providers: [UtilityService]
        });
    });
    it('should be created', inject([UtilityService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=E:/CPPBT 2018/angular-src/src/app/services/utility.service.spec.js.map