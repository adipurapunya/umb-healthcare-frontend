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
import { ClinicService } from "../../services/clinic.service";
import { ConstantvariablesService } from "../../services/constantvariables.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router } from "@angular/router";
import { DatatransferService } from "../../services/datatransfer.service";
var ClinicEditComponent = (function () {
    function ClinicEditComponent(datatransferService, router, flashMessage, constantServ, clinicSvc) {
        this.datatransferService = datatransferService;
        this.router = router;
        this.flashMessage = flashMessage;
        this.constantServ = constantServ;
        this.clinicSvc = clinicSvc;
    }
    ClinicEditComponent.prototype.ngOnInit = function () {
        this.clinic = this.datatransferService.getDataTransfer();
        var time = new Date(this.clinic.dateBirth);
        this.clinic.dateBirth = formatDateDatabase(time);
        this.religionsel = this.clinic.religion;
        this.gendersel = this.clinic.gender;
        this.statussel = this.clinic.status.id;
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
    ClinicEditComponent.prototype.updateReligionEvent = function (input) {
        this.religionsel = JSON.parse(input);
        //console.log(this.religionsel)
    };
    ClinicEditComponent.prototype.updateGenderEvent = function (input) {
        this.gendersel = JSON.parse(input);
        //console.log(this.gendersel);
    };
    ClinicEditComponent.prototype.updateStatusEvent = function (input) {
        this.statussel = JSON.parse(input);
        //console.log(this.gendersel);
    };
    ClinicEditComponent.prototype.goBackMenu = function () {
        this.router.navigate(['clinicData']);
    };
    ClinicEditComponent.prototype.onEditSubmit = function () {
        var _this = this;
        var updateItem = {
            'fullName': this.clinic.fullName,
            'email': this.clinic.email,
            'dateBirth': this.clinic.dateBirth,
            'address': this.clinic.address,
            'phoneNumber': this.clinic.phoneNumber,
            'userCode': this.clinic.userCode,
            'religion': this.religionsel,
            'gender': this.gendersel,
            'placeBirth': this.clinic.placeBirth,
            'clinic': this.clinic.clinic,
            'status': {
                'id': this.statussel
            }
        };
        this.clinicSvc.editClinic(updateItem, this.clinic.id).subscribe(function (data) {
            _this.flashMessage.show('user clinic has been successful updated !', { cssClass: 'alert-success', timeout: 3000 });
            _this.router.navigate(['clinicData']);
        }, function (error) {
            if (error.status == 401) {
                _this.flashMessage.show('Your role is unauthorized to delete data !', { cssClass: 'alert-danger', timeout: 3000 });
            }
            else {
                _this.flashMessage.show('failed update user clinic !', { cssClass: 'alert-danger', timeout: 3000 });
            }
        });
    };
    return ClinicEditComponent;
}());
ClinicEditComponent = __decorate([
    Component({
        selector: 'app-clinic-edit',
        templateUrl: './clinic-edit.component.html',
        styleUrls: ['./clinic-edit.component.css']
    }),
    __metadata("design:paramtypes", [DatatransferService, typeof (_a = typeof Router !== "undefined" && Router) === "function" && _a || Object, typeof (_b = typeof FlashMessagesService !== "undefined" && FlashMessagesService) === "function" && _b || Object, ConstantvariablesService,
        ClinicService])
], ClinicEditComponent);
export { ClinicEditComponent };
var _a, _b;
//# sourceMappingURL=E:/CPPBT 2018/angular-src/src/app/componets/clinic-edit/clinic-edit.component.js.map