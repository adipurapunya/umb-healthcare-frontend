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
import { UtilityService } from "../../services/utility.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { DatatransferService } from "../../services/datatransfer.service";
import { Router } from "@angular/router";
var PatientDetailsComponent = (function () {
    function PatientDetailsComponent(router, dataTransferService, flashMessage, utilityService) {
        this.router = router;
        this.dataTransferService = dataTransferService;
        this.flashMessage = flashMessage;
        this.utilityService = utilityService;
    }
    PatientDetailsComponent.prototype.ngOnInit = function () {
        this.patient = this.dataTransferService.getDataTransfer();
    };
    PatientDetailsComponent.prototype.convertDateTime = function (date) {
        return this.utilityService.milisToDateText(new Date(date));
    };
    PatientDetailsComponent.prototype.goBackMenu = function () {
        this.router.navigate(['patientData']);
    };
    return PatientDetailsComponent;
}());
PatientDetailsComponent = __decorate([
    Component({
        selector: 'app-patient-details',
        templateUrl: './patient-details.component.html',
        styleUrls: ['./patient-details.component.css']
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof Router !== "undefined" && Router) === "function" && _a || Object, DatatransferService, typeof (_b = typeof FlashMessagesService !== "undefined" && FlashMessagesService) === "function" && _b || Object, UtilityService])
], PatientDetailsComponent);
export { PatientDetailsComponent };
var _a, _b;
//# sourceMappingURL=E:/CPPBT 2018/angular-src/src/app/componets/patient-details/patient-details.component.js.map