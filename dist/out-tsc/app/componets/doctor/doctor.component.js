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
import { DoctorService } from "../../services/doctor.service";
import { ModalService } from "../../services/modal.service";
import { UtilityService } from "../../services/utility.service";
import { NgxSpinnerService } from "ngx-spinner";
var DoctorComponent = (function () {
    function DoctorComponent(router, dataTransferService, flashMessage, constantService, doctorService, modalService, utilityService, spinner) {
        this.router = router;
        this.dataTransferService = dataTransferService;
        this.flashMessage = flashMessage;
        this.constantService = constantService;
        this.doctorService = doctorService;
        this.modalService = modalService;
        this.utilityService = utilityService;
        this.spinner = spinner;
    }
    DoctorComponent.prototype.ngOnInit = function () {
        this.filterState = false;
        this.searchField = this.constantService.getDoctorField();
        this.searchFieldSel = 'fullName';
        this.sizeOpt = this.constantService.getPagesOption();
        this.sortType = this.constantService.getSortType();
        this.sortTypeSel = 'ASC';
        this.sortParam = this.constantService.getDoctorSortField();
        this.sortParamSel = 'id';
        this.page = 0;
        this.size = 10;
        this.getDoctorList();
        this.dist = false;
        this.currentUser = this.getCurrentUser();
    };
    DoctorComponent.prototype.startProgress = function () {
        this.spinner.show();
    };
    DoctorComponent.prototype.stopProgress = function () {
        this.spinner.hide();
    };
    DoctorComponent.prototype.getCurrentUser = function () {
        var usersJSON = JSON.parse(localStorage.getItem('user'));
        return usersJSON;
    };
    DoctorComponent.prototype.searchWithFilter = function () {
        this.filterState = true;
        this.getDoctorList();
    };
    DoctorComponent.prototype.searchWithoutFilter = function () {
        this.filterState = false;
        this.getDoctorList();
    };
    DoctorComponent.prototype.onClickNext = function () {
        if (this.page < (this.maxpage - 1)) {
            this.page++;
            this.getDoctorList();
        }
    };
    DoctorComponent.prototype.onClickSelectedPage = function (input) {
        if (input > 0 && input < (this.maxpage - 1)) {
            this.page = input - 1;
            this.getDoctorList();
        }
    };
    DoctorComponent.prototype.onClickPrevious = function () {
        if (this.page > 0) {
            this.page--;
            this.getDoctorList();
        }
    };
    DoctorComponent.prototype.getDoctorList = function () {
        var _this = this;
        this.startProgress();
        var usersJSON = JSON.parse(localStorage.getItem('user'));
        if (!this.filterState || this.filterValue === undefined || this.filterValue == "") {
            if (usersJSON.roles == 'ROLE_ADMIN') {
                this.doctorService.getDoctors(this.page, this.size, this.sortTypeSel, this.sortParamSel).subscribe(function (data) {
                    _this.maxpage = Math.ceil(data.totalElements / _this.size);
                    _this.doctorList = data.content;
                    _this.stopProgress();
                }, function (error) {
                    if (error.status == 401) {
                        _this.flashMessage.show('Your role is unauthorized to get data !', {
                            cssClass: 'alert-danger',
                            timeout: 3000
                        });
                    }
                });
            }
            else {
                this.doctorService.getDoctorsByClinic(this.page, this.size, this.sortTypeSel, this.sortParamSel).subscribe(function (data) {
                    _this.maxpage = Math.ceil(data.totalElements / _this.size);
                    _this.doctorList = data.content;
                    _this.stopProgress();
                }, function (error) {
                    if (error.status == 401) {
                        _this.flashMessage.show('Your role is unauthorized to get data !', {
                            cssClass: 'alert-danger',
                            timeout: 3000
                        });
                    }
                });
            }
        }
        else {
            if (usersJSON.roles == 'ROLE_ADMIN') {
                this.doctorService.getDoctorsBySearchField(this.page, this.size, this.sortTypeSel, this.sortParamSel, this.searchFieldSel, this.filterValue).subscribe(function (data) {
                    _this.maxpage = Math.ceil(data.totalElements / _this.size);
                    _this.doctorList = data.content;
                    _this.stopProgress();
                }, function (error) {
                    if (error.status == 401) {
                        _this.flashMessage.show('Your role is unauthorized to get data !', {
                            cssClass: 'alert-danger',
                            timeout: 3000
                        });
                    }
                });
            }
            else {
                this.doctorService.getDoctorsBySearchFieldByIdClinic(this.page, this.size, this.sortTypeSel, this.sortParamSel, this.searchFieldSel, this.filterValue).subscribe(function (data) {
                    _this.maxpage = Math.ceil(data.totalElements / _this.size);
                    _this.doctorList = data.content;
                    _this.stopProgress();
                }, function (error) {
                    if (error.status == 401) {
                        _this.flashMessage.show('Your role is unauthorized to get data !', {
                            cssClass: 'alert-danger',
                            timeout: 3000
                        });
                    }
                });
            }
        }
    };
    DoctorComponent.prototype.onItemDelete = function () {
        var _this = this;
        this.doctorService.deleteDoctor(this.doctorObj).subscribe(function (data) {
            _this.registerFeedback = data;
            //console.log(data);
            _this.flashMessage.show('Success delete Doctor data !', { cssClass: 'alert-success', timeout: 3000 });
            _this.getDoctorList();
            _this.router.navigate(['patientData']);
        }, function (error) {
            //console.log(error.status);
            if (error.status == 401) {
                _this.flashMessage.show('Your role is unauthorized to delete data !', { cssClass: 'alert-danger', timeout: 3000 });
            }
            else {
                _this.flashMessage.show('failed update Doctor !', { cssClass: 'alert-danger', timeout: 3000 });
            }
            _this.getDoctorList();
            _this.router.navigate(['doctorData']);
        });
    };
    DoctorComponent.prototype.openModal = function (id, doctor) {
        this.doctorObj = doctor;
        this.modalService.open(id);
    };
    DoctorComponent.prototype.closeModal = function (id) {
        this.modalService.close(id);
    };
    DoctorComponent.prototype.gotoEditDoctor = function (item) {
        this.dataTransferService.setDataTransfer(item);
        this.router.navigate(['doctorEdit']);
    };
    DoctorComponent.prototype.goToDoctorDetail = function (doctor) {
        this.dataTransferService.setDataTransfer(doctor);
        this.router.navigate(['doctorDetails']);
    };
    DoctorComponent.prototype.convertDateTime = function (date) {
        return this.utilityService.milisToDateText(new Date(date));
    };
    return DoctorComponent;
}());
DoctorComponent = __decorate([
    Component({
        selector: 'app-doctor',
        templateUrl: './doctor.component.html',
        styleUrls: ['./doctor.component.css']
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof Router !== "undefined" && Router) === "function" && _a || Object, DatatransferService, typeof (_b = typeof FlashMessagesService !== "undefined" && FlashMessagesService) === "function" && _b || Object, ConstantvariablesService,
        DoctorService,
        ModalService,
        UtilityService, typeof (_c = typeof NgxSpinnerService !== "undefined" && NgxSpinnerService) === "function" && _c || Object])
], DoctorComponent);
export { DoctorComponent };
var _a, _b, _c;
//# sourceMappingURL=E:/CPPBT 2018/angular-src/src/app/componets/doctor/doctor.component.js.map