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
import { DoctorService } from "../../services/doctor.service";
import { ConstantvariablesService } from "../../services/constantvariables.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router } from "@angular/router";
import { DatatransferService } from "../../services/datatransfer.service";
var DoctorEditComponent = (function () {
    function DoctorEditComponent(datatransferService, router, flashMessage, constantServ, doctorSvc) {
        this.datatransferService = datatransferService;
        this.router = router;
        this.flashMessage = flashMessage;
        this.constantServ = constantServ;
        this.doctorSvc = doctorSvc;
    }
    DoctorEditComponent.prototype.ngOnInit = function () {
        this.doctor = this.datatransferService.getDataTransfer();
        var time = new Date(this.doctor.dateBirth);
        this.doctor.dateBirth = formatDateDatabase(time);
        this.religionsel = this.doctor.religion;
        this.gendersel = this.doctor.gender;
        this.statussel = this.doctor.status.id;
        this.religionList = this.constantServ.getReligionList();
        this.genderList = this.constantServ.getGenderList();
        this.statusList = this.constantServ.getStatusList();
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
    DoctorEditComponent.prototype.updateReligionEvent = function (input) {
        this.religionsel = JSON.parse(input);
        //console.log(this.religionsel)
    };
    DoctorEditComponent.prototype.updateGenderEvent = function (input) {
        this.gendersel = JSON.parse(input);
        //console.log(this.gendersel);
    };
    DoctorEditComponent.prototype.updateStatusEvent = function (input) {
        this.statussel = JSON.parse(input);
        //console.log(this.gendersel);
    };
    DoctorEditComponent.prototype.goBackMenu = function () {
        this.router.navigate(['doctorData']);
    };
    DoctorEditComponent.prototype.onEditSubmit = function () {
        var _this = this;
        var updateItem = {
            'fullName': this.doctor.fullName,
            'email': this.doctor.email,
            'dateBirth': this.doctor.dateBirth,
            'address': this.doctor.address,
            'phoneNumber': this.doctor.phoneNumber,
            'doctorCode': this.doctor.doctorCode,
            'religion': this.religionsel,
            'gender': this.gendersel,
            'placeBirth': this.doctor.placeBirth,
            'clinic': this.doctor.clinic,
            'registerNumber': this.doctor.registerNumber,
            'specialist': this.doctor.specialist,
            'status': {
                'id': this.statussel
            }
        };
        this.doctorSvc.editDoctor(updateItem, this.doctor.id).subscribe(function (data) {
            _this.flashMessage.show('doctor has been successful updated !', { cssClass: 'alert-success', timeout: 3000 });
            _this.router.navigate(['doctorData']);
        }, function (error) {
            if (error.status == 401) {
                _this.flashMessage.show('Your role is unauthorized to delete data !', { cssClass: 'alert-danger', timeout: 3000 });
            }
            else {
                _this.flashMessage.show('failed update doctor !', { cssClass: 'alert-danger', timeout: 3000 });
            }
        });
    };
    return DoctorEditComponent;
}());
DoctorEditComponent = __decorate([
    Component({
        selector: 'app-doctor-edit',
        templateUrl: './doctor-edit.component.html',
        styleUrls: ['./doctor-edit.component.css']
    }),
    __metadata("design:paramtypes", [DatatransferService, typeof (_a = typeof Router !== "undefined" && Router) === "function" && _a || Object, typeof (_b = typeof FlashMessagesService !== "undefined" && FlashMessagesService) === "function" && _b || Object, ConstantvariablesService,
        DoctorService])
], DoctorEditComponent);
export { DoctorEditComponent };
var _a, _b;
//# sourceMappingURL=E:/CPPBT 2018/angular-src/src/app/componets/doctor-edit/doctor-edit.component.js.map