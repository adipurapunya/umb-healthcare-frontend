import { TestBed, inject } from '@angular/core/testing';
import { EcgService } from './ecg.service';
describe('EcgService', function () {
    beforeEach(function () {
        TestBed.configureTestingModule({
            providers: [EcgService]
        });
    });
    it('should be created', inject([EcgService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=E:/CPPBT 2018/angular-src/src/app/services/ecg.service.spec.js.map