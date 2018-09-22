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
import { DatatransferService } from '../../services/datatransfer.service';
import { ConstantvariablesService } from '../../services/constantvariables.service';
import { Router } from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";
var EditProfileComponent = (function () {
    function EditProfileComponent(datatransferService, router, flashMessage, profileService, constantServ) {
        this.datatransferService = datatransferService;
        this.router = router;
        this.flashMessage = flashMessage;
        this.profileService = profileService;
        this.constantServ = constantServ;
    }
    EditProfileComponent.prototype.ngOnInit = function () {
        this.user = this.datatransferService.getDataTransfer();
        this.religionsel = this.user.religion;
        this.gendersel = this.user.gender;
        this.religionList = this.constantServ.getReligionList();
        this.genderList = this.constantServ.getGenderList();
    };
    EditProfileComponent.prototype.updateReligionEvent = function (input) {
        this.religionsel = JSON.parse(input);
        //console.log(this.religionsel)
    };
    EditProfileComponent.prototype.updateGenderEvent = function (input) {
        this.gendersel = JSON.parse(input);
        //console.log(this.gendersel);
    };
    EditProfileComponent.prototype.onEditSubmit = function () {
        var _this = this;
        var updateItem;
        if (this.user.roles == 'ROLE_ADMIN') {
            updateItem = {
                'fullName': this.user.fullName,
                'email': this.user.email,
                'dateBirth': this.user.dateBirth,
                'address': this.user.address,
                'employeeIdNumber': this.user.employeeIdNumber,
                'phoneNumber': this.user.phoneNumber,
                'adminCode': this.user.adminCode,
                'religion': this.religionsel,
                'gender': this.gendersel,
                'placeBirth': this.user.placeBirth
            };
        }
        else if (this.user.roles == 'ROLE_CLINIC') {
            updateItem = {
                'fullName': this.user.fullName,
                'email': this.user.email,
                'dateBirth': this.user.dateBirth,
                'address': this.user.address,
                'employeeIdNumber': this.user.employeeIdNumber,
                'phoneNumber': this.user.phoneNumber,
                'userCode': this.user.userCode,
                'religion': this.religionsel,
                'gender': this.gendersel,
                'placeBirth': this.user.placeBirth,
                'clinic': this.user.clinic
            };
        }
        else if (this.user.roles == 'ROLE_NURSE') {
            updateItem = {
                'fullName': this.user.fullName,
                'email': this.user.email,
                'dateBirth': this.user.dateBirth,
                'address': this.user.address,
                'employeeIdNumber': this.user.employeeIdNumber,
                'phoneNumber': this.user.phoneNumber,
                'nurseCode': this.user.nurseCode,
                'religion': this.religionsel,
                'gender': this.gendersel,
                'placeBirth': this.user.placeBirth,
                'clinic': this.user.clinic,
                'sipp': this.user.sipp
            };
        }
        else if (this.user.roles == 'ROLE_DOCTOR') {
            updateItem = {
                'fullName': this.user.fullName,
                'email': this.user.email,
                'dateBirth': this.user.dateBirth,
                'address': this.user.address,
                'employeeIdNumber': this.user.employeeIdNumber,
                'phoneNumber': this.user.phoneNumber,
                'doctorCode': this.user.doctorCode,
                'religion': this.religionsel,
                'gender': this.gendersel,
                'placeBirth': this.user.placeBirth,
                'clinic': this.user.clinic,
                'registerNumber': this.user.registerNumber,
                'specialist': this.user.specialist
            };
        }
        else if (this.user.roles == 'ROLE_PATIENT') {
            updateItem = {
                'fullName': this.user.fullName,
                'email': this.user.email,
                'dateBirth': this.user.dateBirth,
                'address': this.user.address,
                'employeeIdNumber': this.user.employeeIdNumber,
                'phoneNumber': this.user.phoneNumber,
                'patientCode': this.user.patientCode,
                'religion': this.religionsel,
                'gender': this.gendersel,
                'placeBirth': this.user.placeBirth,
                'clinic': this.user.clinic,
                'occupation': this.user.occupation,
                'deviceCode': this.user.deviceCode
            };
        }
        this.profileService.editProfile(updateItem, this.user.id).subscribe(function (data) {
            _this.flashMessage.show('Your profile has been successful updated !', { cssClass: 'alert-success', timeout: 3000 });
            _this.router.navigate(['profile']);
        }, function (error) {
            _this.flashMessage.show('failed update your profile !', { cssClass: 'alert-danger', timeout: 3000 });
        });
    };
    EditProfileComponent.prototype.goBackMenu = function () {
        this.router.navigate(['profile']);
    };
    return EditProfileComponent;
}());
EditProfileComponent = __decorate([
    Component({
        selector: 'app-edit-profile',
        templateUrl: './edit-profile.component.html',
        styleUrls: ['./edit-profile.component.css']
    }),
    __metadata("design:paramtypes", [DatatransferService, typeof (_a = typeof Router !== "undefined" && Router) === "function" && _a || Object, typeof (_b = typeof FlashMessagesService !== "undefined" && FlashMessagesService) === "function" && _b || Object, ProfileService,
        ConstantvariablesService])
], EditProfileComponent);
export { EditProfileComponent };
var _a, _b;
//# sourceMappingURL=E:/CPPBT 2018/angular-src/src/app/componets/edit-profile/edit-profile.component.js.map