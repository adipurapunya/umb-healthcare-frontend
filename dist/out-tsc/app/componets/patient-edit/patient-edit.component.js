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
import { FlashMessagesService } from "angular2-flash-messages";
import { Router } from "@angular/router";
import { DatatransferService } from "../../services/datatransfer.service";
import { ConstantvariablesService } from "../../services/constantvariables.service";
import { PatientService } from "../../services/patient.service";
var PatientEditComponent = (function () {
    function PatientEditComponent(datatransferService, router, flashMessage, constantServ, patientSvc) {
        this.datatransferService = datatransferService;
        this.router = router;
        this.flashMessage = flashMessage;
        this.constantServ = constantServ;
        this.patientSvc = patientSvc;
    }
    PatientEditComponent.prototype.ngOnInit = function () {
        this.patient = this.datatransferService.getDataTransfer();
        var time = new Date(this.patient.dateBirth);
        this.patient.dateBirth = formatDateDatabase(time);
        this.religionsel = this.patient.religion;
        this.gendersel = this.patient.gender;
        this.statussel = this.patient.status.id;
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
    PatientEditComponent.prototype.updateReligionEvent = function (input) {
        this.religionsel = JSON.parse(input);
        //console.log(this.religionsel)
    };
    PatientEditComponent.prototype.updateGenderEvent = function (input) {
        this.gendersel = JSON.parse(input);
        //console.log(this.gendersel);
    };
    PatientEditComponent.prototype.updateStatusEvent = function (input) {
        this.statussel = JSON.parse(input);
        //console.log(this.gendersel);
    };
    PatientEditComponent.prototype.goBackMenu = function () {
        this.router.navigate(['patientData']);
    };
    PatientEditComponent.prototype.onEditSubmit = function () {
        var _this = this;
        var updateItem = {
            'fullName': this.patient.fullName,
            'email': this.patient.email,
            'dateBirth': this.patient.dateBirth,
            'address': this.patient.address,
            'phoneNumber': this.patient.phoneNumber,
            'patientCode': this.patient.patientCode,
            'religion': this.religionsel,
            'gender': this.gendersel,
            'placeBirth': this.patient.placeBirth,
            'clinic': this.patient.clinic,
            'occupation': this.patient.occupation,
            'deviceCode': this.patient.deviceCode,
            'status': {
                'id': this.statussel
            }
        };
        this.patientSvc.editPatient(updateItem, this.patient.id).subscribe(function (data) {
            _this.flashMessage.show('Patient has been successful updated !', { cssClass: 'alert-success', timeout: 3000 });
            _this.router.navigate(['patientData']);
        }, function (error) {
            if (error.status == 401) {
                _this.flashMessage.show('Your role is unauthorized to delete data !', { cssClass: 'alert-danger', timeout: 3000 });
            }
            else {
                _this.flashMessage.show('failed update patient !', { cssClass: 'alert-danger', timeout: 3000 });
            }
        });
    };
    return PatientEditComponent;
}());
PatientEditComponent = __decorate([
    Component({
        selector: 'app-patient-edit',
        templateUrl: './patient-edit.component.html',
        styleUrls: ['./patient-edit.component.css']
    }),
    __metadata("design:paramtypes", [DatatransferService, typeof (_a = typeof Router !== "undefined" && Router) === "function" && _a || Object, typeof (_b = typeof FlashMessagesService !== "undefined" && FlashMessagesService) === "function" && _b || Object, ConstantvariablesService,
        PatientService])
], PatientEditComponent);
export { PatientEditComponent };
var _a, _b;
//# sourceMappingURL=E:/CPPBT 2018/angular-src/src/app/componets/patient-edit/patient-edit.component.js.map