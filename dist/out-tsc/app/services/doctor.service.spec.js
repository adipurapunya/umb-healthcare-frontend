import { TestBed, inject } from '@angular/core/testing';
import { DoctorService } from './doctor.service';
describe('DoctorService', function () {
    beforeEach(function () {
        TestBed.configureTestingModule({
            providers: [DoctorService]
        });
    });
    it('should be created', inject([DoctorService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=E:/CPPBT 2018/angular-src/src/app/services/doctor.service.spec.js.map