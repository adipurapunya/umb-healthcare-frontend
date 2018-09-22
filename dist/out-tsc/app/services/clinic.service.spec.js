import { TestBed, inject } from '@angular/core/testing';
import { ClinicService } from './clinic.service';
describe('ClinicService', function () {
    beforeEach(function () {
        TestBed.configureTestingModule({
            providers: [ClinicService]
        });
    });
    it('should be created', inject([ClinicService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=E:/CPPBT 2018/angular-src/src/app/services/clinic.service.spec.js.map