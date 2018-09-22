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
import { NurseService } from "../../services/nurse.service";
import { ModalService } from "../../services/modal.service";
import { UtilityService } from "../../services/utility.service";
import { NgxSpinnerService } from "ngx-spinner";
var NurseComponent = (function () {
    function NurseComponent(router, dataTransferService, flashMessage, constantService, nurseService, modalService, utilityService, spinner) {
        this.router = router;
        this.dataTransferService = dataTransferService;
        this.flashMessage = flashMessage;
        this.constantService = constantService;
        this.nurseService = nurseService;
        this.modalService = modalService;
        this.utilityService = utilityService;
        this.spinner = spinner;
    }
    NurseComponent.prototype.ngOnInit = function () {
        this.filterState = false;
        this.searchField = this.constantService.getNurseField();
        this.searchFieldSel = 'fullName';
        this.sizeOpt = this.constantService.getPagesOption();
        this.sortType = this.constantService.getSortType();
        this.sortTypeSel = 'ASC';
        this.sortParam = this.constantService.getNurseSortField();
        this.sortParamSel = 'id';
        this.page = 0;
        this.size = 10;
        this.getNurseList();
        this.dist = false;
        this.currentUser = this.getCurrentUser();
    };
    NurseComponent.prototype.startProgress = function () {
        this.spinner.show();
    };
    NurseComponent.prototype.stopProgress = function () {
        this.spinner.hide();
    };
    NurseComponent.prototype.getCurrentUser = function () {
        var usersJSON = JSON.parse(localStorage.getItem('user'));
        return usersJSON;
    };
    NurseComponent.prototype.searchWithFilter = function () {
        this.filterState = true;
        this.getNurseList();
    };
    NurseComponent.prototype.searchWithoutFilter = function () {
        this.filterState = false;
        this.getNurseList();
    };
    NurseComponent.prototype.onClickNext = function () {
        if (this.page < (this.maxpage - 1)) {
            this.page++;
            this.getNurseList();
        }
    };
    NurseComponent.prototype.onClickSelectedPage = function (input) {
        if (input > 0 && input < (this.maxpage - 1)) {
            this.page = input - 1;
            this.getNurseList();
        }
    };
    NurseComponent.prototype.onClickPrevious = function () {
        if (this.page > 0) {
            this.page--;
            this.getNurseList();
        }
    };
    NurseComponent.prototype.getNurseList = function () {
        var _this = this;
        this.startProgress();
        var usersJSON = JSON.parse(localStorage.getItem('user'));
        if (!this.filterState || this.filterValue === undefined || this.filterValue == "") {
            if (usersJSON.roles == 'ROLE_ADMIN') {
                this.nurseService.getNurses(this.page, this.size, this.sortTypeSel, this.sortParamSel).subscribe(function (data) {
                    _this.maxpage = Math.ceil(data.totalElements / _this.size);
                    _this.nurseList = data.content;
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
                this.nurseService.getNursesByClinic(this.page, this.size, this.sortTypeSel, this.sortParamSel).subscribe(function (data) {
                    _this.maxpage = Math.ceil(data.totalElements / _this.size);
                    _this.nurseList = data.content;
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
                this.nurseService.getNursesBySearchField(this.page, this.size, this.sortTypeSel, this.sortParamSel, this.searchFieldSel, this.filterValue).subscribe(function (data) {
                    _this.maxpage = Math.ceil(data.totalElements / _this.size);
                    _this.nurseList = data.content;
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
                this.nurseService.getNursesBySearchFieldByIdClinic(this.page, this.size, this.sortTypeSel, this.sortParamSel, this.searchFieldSel, this.filterValue).subscribe(function (data) {
                    _this.maxpage = Math.ceil(data.totalElements / _this.size);
                    _this.nurseList = data.content;
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
    NurseComponent.prototype.onItemDelete = function () {
        var _this = this;
        this.nurseService.deleteNurse(this.nurseObj).subscribe(function (data) {
            _this.registerFeedback = data;
            //console.log(data);
            _this.flashMessage.show('Success delete nurse data !', { cssClass: 'alert-success', timeout: 3000 });
            _this.getNurseList();
            _this.router.navigate(['nurseData']);
        }, function (error) {
            //console.log(error.status);
            if (error.status == 401) {
                _this.flashMessage.show('Your role is unauthorized to delete data !', { cssClass: 'alert-danger', timeout: 3000 });
            }
            else {
                _this.flashMessage.show('failed update nurse !', { cssClass: 'alert-danger', timeout: 3000 });
            }
            _this.getNurseList();
            _this.router.navigate(['nurseData']);
        });
    };
    NurseComponent.prototype.openModal = function (id, nurse) {
        this.nurseObj = nurse;
        this.modalService.open(id);
    };
    NurseComponent.prototype.closeModal = function (id) {
        this.modalService.close(id);
    };
    NurseComponent.prototype.gotoEditNurse = function (item) {
        this.dataTransferService.setDataTransfer(item);
        this.router.navigate(['nurseEdit']);
    };
    NurseComponent.prototype.goToNurseDetail = function (nurse) {
        this.dataTransferService.setDataTransfer(nurse);
        this.router.navigate(['nurseDetails']);
    };
    NurseComponent.prototype.convertDateTime = function (date) {
        return this.utilityService.milisToDateText(new Date(date));
    };
    return NurseComponent;
}());
NurseComponent = __decorate([
    Component({
        selector: 'app-nurse',
        templateUrl: './nurse.component.html',
        styleUrls: ['./nurse.component.css']
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof Router !== "undefined" && Router) === "function" && _a || Object, DatatransferService, typeof (_b = typeof FlashMessagesService !== "undefined" && FlashMessagesService) === "function" && _b || Object, ConstantvariablesService,
        NurseService,
        ModalService,
        UtilityService, typeof (_c = typeof NgxSpinnerService !== "undefined" && NgxSpinnerService) === "function" && _c || Object])
], NurseComponent);
export { NurseComponent };
var _a, _b, _c;
//# sourceMappingURL=E:/CPPBT 2018/angular-src/src/app/componets/nurse/nurse.component.js.map