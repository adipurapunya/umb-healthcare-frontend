var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { Router } from '@angular/router';
import { DatatransferService } from '../../services/datatransfer.service';
var ProfileComponent = (function () {
    function ProfileComponent(profileService, router, dataTransferService) {
        this.profileService = profileService;
        this.router = router;
        this.dataTransferService = dataTransferService;
    }
    ProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.profileService.getProfile().subscribe(function (profile) {
            var time = new Date(profile.dateBirth);
            var timeBOD = new Date(profile.firstRegistrationDate);
            profile.dateBirth = formatDateDatabase(time);
            profile.firstRegistrationDate = formatDateDatabase(timeBOD);
            _this.user = profile;
        }, function (err) {
            console.log(err);
            return false;
        });
        function formatDate(date) {
            var monthNames = [
                'January', 'February', 'March',
                'April', 'May', 'June', 'July',
                'August', 'September', 'October',
                'November', 'December'
            ];
            var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            var day = date.getDate();
            var monthIndex = date.getMonth();
            var year = date.getFullYear();
            var d = new Date(date);
            var dayName = days[d.getDay()];
            return dayName + ', ' + day + ' ' + monthNames[monthIndex] + ' ' + year;
        }
        function formatDateDatabase(date) {
            var day = date.getDate();
            var monthIndex = date.getMonth() + 1;
            var year = date.getFullYear();
            if (day < 10) {
                day = "0" + date.getDate();
            }
            if (monthIndex < 10) {
                monthIndex = "0" + (date.getMonth() + 1);
            }
            return year + '-' + monthIndex + '-' + day;
        }
    };
    ProfileComponent.prototype.gotoEditProfile = function (item) {
        this.dataTransferService.setDataTransfer(item);
        this.router.navigate(['profileEdit']);
    };
    ProfileComponent.prototype.gotoEditPassword = function (item) {
        this.dataTransferService.setDataTransfer(item);
        this.router.navigate(['passwordEdit']);
    };
    return ProfileComponent;
}());
ProfileComponent = __decorate([
    Component({
        selector: 'app-profile',
        templateUrl: './profile.component.html',
        styleUrls: ['./profile.component.css']
    }),
    __metadata("design:paramtypes", [ProfileService, typeof (_a = typeof Router !== "undefined" && Router) === "function" && _a || Object, DatatransferService])
], ProfileComponent);
export { ProfileComponent };
var _a;
//# sourceMappingURL=E:/CPPBT 2018/angular-src/src/app/componets/profile/profile.component.js.map