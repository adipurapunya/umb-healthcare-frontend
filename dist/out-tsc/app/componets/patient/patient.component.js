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
import { ConstantvariablesService } from '../../services/constantvariables.service';
import { PatientService } from "../../services/patient.service";
import { ModalService } from '../../services/modal.service';
import { UtilityService } from '../../services/utility.service';
import { NgxSpinnerService } from 'ngx-spinner';
var PatientComponent = (function () {
    function PatientComponent(router, dataTransferService, flashMessage, constantService, patientService, modalService, utilityService, spinner) {
        this.router = router;
        this.dataTransferService = dataTransferService;
        this.flashMessage = flashMessage;
        this.constantService = constantService;
        this.patientService = patientService;
        this.modalService = modalService;
        this.utilityService = utilityService;
        this.spinner = spinner;
    }
    PatientComponent.prototype.ngOnInit = function () {
        this.filterState = false;
        this.searchField = this.constantService.getPatientField();
        this.searchFieldSel = 'fullName';
        this.sizeOpt = this.constantService.getPagesOption();
        this.sortType = this.constantService.getSortType();
        this.sortTypeSel = 'ASC';
        this.sortParam = this.constantService.getPatientSortField();
        this.sortParamSel = 'id';
        this.page = 0;
        this.size = 10;
        this.getPatientList();
        this.dist = false;
        this.currentUser = this.getCurrentUser();
    };
    PatientComponent.prototype.startProgress = function () {
        this.spinner.show();
    };
    PatientComponent.prototype.stopProgress = function () {
        this.spinner.hide();
    };
    PatientComponent.prototype.getCurrentUser = function () {
        var usersJSON = JSON.parse(localStorage.getItem('user'));
        return usersJSON;
    };
    PatientComponent.prototype.searchWithFilter = function () {
        this.filterState = true;
        this.getPatientList();
    };
    PatientComponent.prototype.searchWithoutFilter = function () {
        this.filterState = false;
        this.getPatientList();
    };
    PatientComponent.prototype.onClickNext = function () {
        if (this.page < (this.maxpage - 1)) {
            this.page++;
            this.getPatientList();
        }
    };
    PatientComponent.prototype.onClickSelectedPage = function (input) {
        if (input > 0 && input < (this.maxpage - 1)) {
            this.page = input - 1;
            this.getPatientList();
        }
    };
    PatientComponent.prototype.onClickPrevious = function () {
        if (this.page > 0) {
            this.page--;
            this.getPatientList();
        }
    };
    PatientComponent.prototype.getPatientList = function () {
        var _this = this;
        this.startProgress();
        var usersJSON = JSON.parse(localStorage.getItem('user'));
        if (!this.filterState || this.filterValue === undefined || this.filterValue == "") {
            if (usersJSON.roles == 'ROLE_ADMIN') {
                this.patientService.getPatients(this.page, this.size, this.sortTypeSel, this.sortParamSel).subscribe(function (data) {
                    _this.maxpage = Math.ceil(data.totalElements / _this.size);
                    _this.patientList = data.content;
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
                this.patientService.getPatientsByClinic(this.page, this.size, this.sortTypeSel, this.sortParamSel).subscribe(function (data) {
                    _this.maxpage = Math.ceil(data.totalElements / _this.size);
                    _this.patientList = data.content;
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
                this.patientService.getPatientsBySearchField(this.page, this.size, this.sortTypeSel, this.sortParamSel, this.searchFieldSel, this.filterValue).subscribe(function (data) {
                    _this.maxpage = Math.ceil(data.totalElements / _this.size);
                    _this.patientList = data.content;
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
                this.patientService.getPatientsBySearchFieldByIdClinic(this.page, this.size, this.sortTypeSel, this.sortParamSel, this.searchFieldSel, this.filterValue).subscribe(function (data) {
                    _this.maxpage = Math.ceil(data.totalElements / _this.size);
                    _this.patientList = data.content;
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
    PatientComponent.prototype.onItemDelete = function () {
        var _this = this;
        this.patientService.deletePatient(this.patientObj).subscribe(function (data) {
            _this.registerFeedback = data;
            //console.log(data);
            _this.flashMessage.show('Success delete patient data !', { cssClass: 'alert-success', timeout: 3000 });
            _this.getPatientList();
            _this.router.navigate(['patientData']);
        }, function (error) {
            //console.log(error.status);
            if (error.status == 401) {
                _this.flashMessage.show('Your role is unauthorized to delete data !', { cssClass: 'alert-danger', timeout: 3000 });
            }
            else {
                _this.flashMessage.show('failed update patient !', { cssClass: 'alert-danger', timeout: 3000 });
            }
            _this.getPatientList();
            _this.router.navigate(['patientData']);
        });
    };
    PatientComponent.prototype.openModal = function (id, patient) {
        this.patientObj = patient;
        this.modalService.open(id);
    };
    PatientComponent.prototype.closeModal = function (id) {
        this.modalService.close(id);
    };
    PatientComponent.prototype.gotoEditPatient = function (item) {
        this.dataTransferService.setDataTransfer(item);
        this.router.navigate(['patientEdit']);
    };
    PatientComponent.prototype.goToPatientDetail = function (patient) {
        this.dataTransferService.setDataTransfer(patient);
        this.router.navigate(['patientDetails']);
    };
    PatientComponent.prototype.goToEcgDetail = function (patient) {
        this.dataTransferService.setDataTransfer(patient);
        this.router.navigate(['ecgData']);
    };
    PatientComponent.prototype.goToAddPatrient = function () {
        //this.dataTransferService.setDataTransfer(patient);
        this.router.navigate(['patientAdd']);
    };
    PatientComponent.prototype.convertDateTime = function (date) {
        return this.utilityService.milisToDateText(new Date(date));
    };
    return PatientComponent;
}());
PatientComponent = __decorate([
    Component({
        selector: 'app-patient',
        templateUrl: './patient.component.html',
        styleUrls: ['./patient.component.css']
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof Router !== "undefined" && Router) === "function" && _a || Object, DatatransferService, typeof (_b = typeof FlashMessagesService !== "undefined" && FlashMessagesService) === "function" && _b || Object, ConstantvariablesService,
        PatientService,
        ModalService,
        UtilityService, typeof (_c = typeof NgxSpinnerService !== "undefined" && NgxSpinnerService) === "function" && _c || Object])
], PatientComponent);
export { PatientComponent };
var _a, _b, _c;
//# sourceMappingURL=E:/CPPBT 2018/angular-src/src/app/componets/patient/patient.component.js.map