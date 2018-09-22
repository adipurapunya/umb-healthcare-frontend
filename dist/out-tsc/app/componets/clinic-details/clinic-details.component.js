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
var ClinicDetailsComponent = (function () {
    function ClinicDetailsComponent(router, dataTransferService, flashMessage, utilityService) {
        this.router = router;
        this.dataTransferService = dataTransferService;
        this.flashMessage = flashMessage;
        this.utilityService = utilityService;
    }
    ClinicDetailsComponent.prototype.ngOnInit = function () {
        this.clinic = this.dataTransferService.getDataTransfer();
    };
    ClinicDetailsComponent.prototype.convertDateTime = function (date) {
        return this.utilityService.milisToDateText(new Date(date));
    };
    ClinicDetailsComponent.prototype.goBackMenu = function () {
        this.router.navigate(['clinicData']);
    };
    return ClinicDetailsComponent;
}());
ClinicDetailsComponent = __decorate([
    Component({
        selector: 'app-clinic-details',
        templateUrl: './clinic-details.component.html',
        styleUrls: ['./clinic-details.component.css']
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof Router !== "undefined" && Router) === "function" && _a || Object, DatatransferService, typeof (_b = typeof FlashMessagesService !== "undefined" && FlashMessagesService) === "function" && _b || Object, UtilityService])
], ClinicDetailsComponent);
export { ClinicDetailsComponent };
var _a, _b;
//# sourceMappingURL=E:/CPPBT 2018/angular-src/src/app/componets/clinic-details/clinic-details.component.js.map