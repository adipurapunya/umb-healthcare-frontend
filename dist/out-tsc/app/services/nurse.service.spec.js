import { TestBed, inject } from '@angular/core/testing';
import { NurseService } from './nurse.service';
describe('NurseService', function () {
    beforeEach(function () {
        TestBed.configureTestingModule({
            providers: [NurseService]
        });
    });
    it('should be created', inject([NurseService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=E:/CPPBT 2018/angular-src/src/app/services/nurse.service.spec.js.map