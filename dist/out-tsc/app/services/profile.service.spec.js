import { TestBed, inject } from '@angular/core/testing';
import { ProfileService } from './profile.service';
describe('ProfileService', function () {
    beforeEach(function () {
        TestBed.configureTestingModule({
            providers: [ProfileService]
        });
    });
    it('should be created', inject([ProfileService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=E:/CPPBT 2018/angular-src/src/app/services/profile.service.spec.js.map