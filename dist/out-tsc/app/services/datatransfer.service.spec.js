import { TestBed, inject } from '@angular/core/testing';
import { DatatransferService } from './datatransfer.service';
describe('DatatransferService', function () {
    beforeEach(function () {
        TestBed.configureTestingModule({
            providers: [DatatransferService]
        });
    });
    it('should be created', inject([DatatransferService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=E:/CPPBT 2018/angular-src/src/app/services/datatransfer.service.spec.js.map