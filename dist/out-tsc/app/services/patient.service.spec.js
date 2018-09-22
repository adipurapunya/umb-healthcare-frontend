import { TestBed, inject } from '@angular/core/testing';
import { PatientService } from './patient.service';
describe('PatientService', function () {
    beforeEach(function () {
        TestBed.configureTestingModule({
            providers: [PatientService]
        });
    });
    it('should be created', inject([PatientService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=E:/CPPBT 2018/angular-src/src/app/services/patient.service.spec.js.map