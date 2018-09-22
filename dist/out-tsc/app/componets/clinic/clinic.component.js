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
import { Router } from "@angular/router";
import { DatatransferService } from "../../services/datatransfer.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { ConstantvariablesService } from "../../services/constantvariables.service";
import { ClinicService } from "../../services/clinic.service";
import { ModalService } from "../../services/modal.service";
import { UtilityService } from "../../services/utility.service";
import { NgxSpinnerService } from "ngx-spinner";
var ClinicComponent = (function () {
    function ClinicComponent(router, dataTransferService, flashMessage, constantService, clinicService, modalService, utilityService, spinner) {
        this.router = router;
        this.dataTransferService = dataTransferService;
        this.flashMessage = flashMessage;
        this.constantService = constantService;
        this.clinicService = clinicService;
        this.modalService = modalService;
        this.utilityService = utilityService;
        this.spinner = spinner;
    }
    ClinicComponent.prototype.ngOnInit = function () {
        this.filterState = false;
        this.searchField = this.constantService.getClinicField();
        this.searchFieldSel = 'fullName';
        this.sizeOpt = this.constantService.getPagesOption();
        this.sortType = this.constantService.getSortType();
        this.sortTypeSel = 'ASC';
        this.sortParam = this.constantService.getClinicSortField();
        this.sortParamSel = 'id';
        this.page = 0;
        this.size = 10;
        this.getClinicList();
        this.dist = false;
        this.currentUser = this.getCurrentUser();
    };
    ClinicComponent.prototype.startProgress = function () {
        this.spinner.show();
    };
    ClinicComponent.prototype.stopProgress = function () {
        this.spinner.hide();
    };
    ClinicComponent.prototype.getCurrentUser = function () {
        var usersJSON = JSON.parse(localStorage.getItem('user'));
        return usersJSON;
    };
    ClinicComponent.prototype.searchWithFilter = function () {
        this.filterState = true;
        this.getClinicList();
    };
    ClinicComponent.prototype.searchWithoutFilter = function () {
        this.filterState = false;
        this.getClinicList();
    };
    ClinicComponent.prototype.onClickNext = function () {
        if (this.page < (this.maxpage - 1)) {
            this.page++;
            this.getClinicList();
        }
    };
    ClinicComponent.prototype.onClickSelectedPage = function (input) {
        if (input > 0 && input < (this.maxpage - 1)) {
            this.page = input - 1;
            this.getClinicList();
        }
    };
    ClinicComponent.prototype.onClickPrevious = function () {
        if (this.page > 0) {
            this.page--;
            this.getClinicList();
        }
    };
    ClinicComponent.prototype.getClinicList = function () {
        var _this = this;
        this.startProgress();
        var usersJSON = JSON.parse(localStorage.getItem('user'));
        if (!this.filterState || this.filterValue === undefined || this.filterValue == "") {
            if (usersJSON.roles == 'ROLE_ADMIN') {
                this.clinicService.getClinics(this.page, this.size, this.sortTypeSel, this.sortParamSel).subscribe(function (data) {
                    _this.maxpage = Math.ceil(data.totalElements / _this.size);
                    _this.clinicList = data.content;
                    _this.stopProgress();
                }, function (error) {
                    if (error.status == 401) {
                        _this.flashMessage.show('Your role is unauthorized to delete data !', {
                            cssClass: 'alert-danger',
                            timeout: 3000
                        });
                    }
                });
            }
            else {
                this.clinicService.getClinicsByClinic(this.page, this.size, this.sortTypeSel, this.sortParamSel).subscribe(function (data) {
                    _this.maxpage = Math.ceil(data.totalElements / _this.size);
                    _this.clinicList = data.content;
                    _this.stopProgress();
                }, function (error) {
                    if (error.status == 401) {
                        _this.flashMessage.show('Your role is unauthorized to delete data !', {
                            cssClass: 'alert-danger',
                            timeout: 3000
                        });
                    }
                });
            }
        }
        else {
            if (usersJSON.roles == 'ROLE_ADMIN') {
                this.clinicService.getClinicsBySearchField(this.page, this.size, this.sortTypeSel, this.sortParamSel, this.searchFieldSel, this.filterValue).subscribe(function (data) {
                    _this.maxpage = Math.ceil(data.totalElements / _this.size);
                    _this.clinicList = data.content;
                    _this.stopProgress();
                }, function (error) {
                    if (error.status == 401) {
                        _this.flashMessage.show('Your role is unauthorized to delete data !', {
                            cssClass: 'alert-danger',
                            timeout: 3000
                        });
                    }
                });
            }
            else {
                this.clinicService.getClinicsBySearchFieldByIdClinic(this.page, this.size, this.sortTypeSel, this.sortParamSel, this.searchFieldSel, this.filterValue).subscribe(function (data) {
                    _this.maxpage = Math.ceil(data.totalElements / _this.size);
                    _this.clinicList = data.content;
                    _this.stopProgress();
                }, function (error) {
                    if (error.status == 401) {
                        _this.flashMessage.show('Your role is unauthorized to delete data !', {
                            cssClass: 'alert-danger',
                            timeout: 3000
                        });
                    }
                });
            }
        }
    };
    ClinicComponent.prototype.onItemDelete = function () {
        var _this = this;
        this.clinicService.deleteClinic(this.clinicObj).subscribe(function (data) {
            _this.registerFeedback = data;
            //console.log(data);
            _this.flashMessage.show('Success delete user clinic data !', { cssClass: 'alert-success', timeout: 3000 });
            _this.getClinicList();
            _this.router.navigate(['clinicData']);
        }, function (error) {
            //console.log(error.status);
            if (error.status == 401) {
                _this.flashMessage.show('Your role is unauthorized to delete data !', { cssClass: 'alert-danger', timeout: 3000 });
            }
            else {
                _this.flashMessage.show('failed update user clinic !', { cssClass: 'alert-danger', timeout: 3000 });
            }
            _this.getClinicList();
            _this.router.navigate(['clinicData']);
        });
    };
    ClinicComponent.prototype.openModal = function (id, clinic) {
        this.clinicObj = clinic;
        this.modalService.open(id);
    };
    ClinicComponent.prototype.closeModal = function (id) {
        this.modalService.close(id);
    };
    ClinicComponent.prototype.gotoEditClinic = function (item) {
        this.dataTransferService.setDataTransfer(item);
        this.router.navigate(['clinicEdit']);
    };
    ClinicComponent.prototype.goToClinicDetail = function (clinic) {
        this.dataTransferService.setDataTransfer(clinic);
        this.router.navigate(['clinicDetails']);
    };
    ClinicComponent.prototype.convertDateTime = function (date) {
        return this.utilityService.milisToDateText(new Date(date));
    };
    return ClinicComponent;
}());
ClinicComponent = __decorate([
    Component({
        selector: 'app-clinic',
        templateUrl: './clinic.component.html',
        styleUrls: ['./clinic.component.css']
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof Router !== "undefined" && Router) === "function" && _a || Object, DatatransferService, typeof (_b = typeof FlashMessagesService !== "undefined" && FlashMessagesService) === "function" && _b || Object, ConstantvariablesService,
        ClinicService,
        ModalService,
        UtilityService, typeof (_c = typeof NgxSpinnerService !== "undefined" && NgxSpinnerService) === "function" && _c || Object])
], ClinicComponent);
export { ClinicComponent };
var _a, _b, _c;
//# sourceMappingURL=E:/CPPBT 2018/angular-src/src/app/componets/clinic/clinic.component.js.map