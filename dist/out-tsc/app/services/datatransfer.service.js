var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
var DatatransferService = (function () {
    function DatatransferService() {
        this._subject = new Subject();
        this.event = this._subject.asObservable();
    }
    DatatransferService.prototype.publish = function (data) {
        this._subject.next(data);
    };
    DatatransferService.prototype.getDataTransfer = function () {
        return this.serviceData;
    };
    DatatransferService.prototype.getDataTransfer2 = function () {
        return this.serviceData2;
    };
    DatatransferService.prototype.getDataTransfer3 = function () {
        return this.serviceData3;
    };
    DatatransferService.prototype.setDataTransfer = function (data) {
        this.serviceData = data;
    };
    DatatransferService.prototype.setDataTransfer2 = function (data) {
        this.serviceData2 = data;
    };
    DatatransferService.prototype.setDataTransfer3 = function (data) {
        this.serviceData3 = data;
    };
    DatatransferService.prototype.isRefresh = function () {
        return this.refreshData;
    };
    DatatransferService.prototype.setRefresh = function (type) {
        this.refreshData = type;
    };
    return DatatransferService;
}());
DatatransferService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], DatatransferService);
export { DatatransferService };
//# sourceMappingURL=E:/CPPBT 2018/angular-src/src/app/services/datatransfer.service.js.map