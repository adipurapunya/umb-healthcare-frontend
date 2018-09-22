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
import { NurseService } from "../../services/nurse.service";
import { ConstantvariablesService } from "../../services/constantvariables.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router } from "@angular/router";
import { DatatransferService } from "../../services/datatransfer.service";
var NurseEditComponent = (function () {
    function NurseEditComponent(datatransferService, router, flashMessage, constantServ, nurseSvc) {
        this.datatransferService = datatransferService;
        this.router = router;
        this.flashMessage = flashMessage;
        this.constantServ = constantServ;
        this.nurseSvc = nurseSvc;
    }
    NurseEditComponent.prototype.ngOnInit = function () {
        this.nurse = this.datatransferService.getDataTransfer();
        var time = new Date(this.nurse.dateBirth);
        this.nurse.dateBirth = formatDateDatabase(time);
        this.religionsel = this.nurse.religion;
        this.gendersel = this.nurse.gender;
        this.statussel = this.nurse.status.id;
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
    NurseEditComponent.prototype.updateReligionEvent = function (input) {
        this.religionsel = JSON.parse(input);
        //console.log(this.religionsel)
    };
    NurseEditComponent.prototype.updateGenderEvent = function (input) {
        this.gendersel = JSON.parse(input);
        //console.log(this.gendersel);
    };
    NurseEditComponent.prototype.updateStatusEvent = function (input) {
        this.statussel = JSON.parse(input);
        //console.log(this.gendersel);
    };
    NurseEditComponent.prototype.goBackMenu = function () {
        this.router.navigate(['nurseData']);
    };
    NurseEditComponent.prototype.onEditSubmit = function () {
        var _this = this;
        var updateItem = {
            'fullName': this.nurse.fullName,
            'email': this.nurse.email,
            'dateBirth': this.nurse.dateBirth,
            'address': this.nurse.address,
            'phoneNumber': this.nurse.phoneNumber,
            'nurseCode': this.nurse.nurseCode,
            'religion': this.religionsel,
            'gender': this.gendersel,
            'placeBirth': this.nurse.placeBirth,
            'clinic': this.nurse.clinic,
            'sipp': this.nurse.sipp,
            'status': {
                'id': this.statussel
            }
        };
        this.nurseSvc.editNurse(updateItem, this.nurse.id).subscribe(function (data) {
            _this.flashMessage.show('nurse has been successful updated !', { cssClass: 'alert-success', timeout: 3000 });
            _this.router.navigate(['nurseData']);
        }, function (error) {
            if (error.status == 401) {
                _this.flashMessage.show('Your role is unauthorized to delete data !', { cssClass: 'alert-danger', timeout: 3000 });
            }
            else {
                _this.flashMessage.show('failed update nurse !', { cssClass: 'alert-danger', timeout: 3000 });
            }
        });
    };
    return NurseEditComponent;
}());
NurseEditComponent = __decorate([
    Component({
        selector: 'app-nurse-edit',
        templateUrl: './nurse-edit.component.html',
        styleUrls: ['./nurse-edit.component.css']
    }),
    __metadata("design:paramtypes", [DatatransferService, typeof (_a = typeof Router !== "undefined" && Router) === "function" && _a || Object, typeof (_b = typeof FlashMessagesService !== "undefined" && FlashMessagesService) === "function" && _b || Object, ConstantvariablesService,
        NurseService])
], NurseEditComponent);
export { NurseEditComponent };
var _a, _b;
//# sourceMappingURL=E:/CPPBT 2018/angular-src/src/app/componets/nurse-edit/nurse-edit.component.js.map