import { TestBed, inject } from '@angular/core/testing';
import { SimplertService } from './simplert.service';
describe('SimplertService', function () {
    beforeEach(function () {
        TestBed.configureTestingModule({
            providers: [SimplertService]
        });
    });
    it('should be created', inject([SimplertService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=E:/CPPBT 2018/angular-src/src/app/services/simplert.service.spec.js.map