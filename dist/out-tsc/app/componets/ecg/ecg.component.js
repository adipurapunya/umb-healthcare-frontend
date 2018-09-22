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
import { UtilityService } from "../../services/utility.service";
import { EcgService } from "../../services/ecg.service";
import { Chart } from 'chart.js';
import { NgxSpinnerService } from "ngx-spinner";
import { ConstantvariablesService } from "../../services/constantvariables.service";
import swal from 'sweetalert2';
var EcgComponent = (function () {
    function EcgComponent(router, dataTransferService, flashMessage, utilityService, ecgService, spinner, constantService) {
        this.router = router;
        this.dataTransferService = dataTransferService;
        this.flashMessage = flashMessage;
        this.utilityService = utilityService;
        this.ecgService = ecgService;
        this.spinner = spinner;
        this.constantService = constantService;
        this.chart = [];
    }
    EcgComponent.prototype.showAlert = function (type, title, text, time, confrimButton) {
        var alerts = swal({
            type: type,
            title: title,
            text: text,
            showCloseButton: true,
            timer: time,
            allowOutsideClick: false,
            confirmButtonColor: "#78c2ad",
            showConfirmButton: confrimButton
        });
    };
    EcgComponent.prototype.ngOnInit = function () {
        this.currentUser = this.getCurrentUser();
        if (this.currentUser.roles[0] != 'ROLE_PATIENT') {
            this.patient = this.dataTransferService.getDataTransfer();
            this.deviceCode = this.patient.deviceCode;
            //console.log(this.deviceCode + " Non Patient");
        }
        else if (this.currentUser.roles[0] == 'ROLE_PATIENT') {
            this.deviceCode = this.currentUser.deviceCode;
            this.patient = this.currentUser;
            //console.log(this.deviceCode + " Patient");
        }
        this.page = 0;
        this.size = 200;
        this.filterState = false;
        this.sizeOpt = this.constantService.getPagesOption();
        this.sortType = this.constantService.getSortType();
        this.sortTypeSel = 'ASC';
        this.sortParam = this.constantService.getEcgSortField();
        this.sortParamSel = 'id';
        this.dist = false;
    };
    EcgComponent.prototype.getEcgList = function () {
        var _this = this;
        if (this.filterValue === undefined || this.filterValue == "") {
            this.showAlert('error', 'Empty !', 'Please fill the date !', 3000, true);
        }
        else {
            this.startProgress();
            this.ecgService.getEcgValueByDeviceCodeAndDate(this.page, this.size, this.sortTypeSel, this.sortParamSel, this.deviceCode, this.filterValue).subscribe(function (data) {
                _this.maxpage = Math.ceil(data.totalElements / _this.size);
                var analog = data['content'].map(function (data) { return data.analog; });
                //console.log(analog);
                //let wheatherDates = [0.001,0.002,0.003,0.004,0.005,0.006,0.007,0.008,0.009,0.01,0.02,0.03,0.04,0.05,0.06,0.07,0.08,0.09,0.1,0.12,0.13,0.14,0.15,0.16,0.17,0.18,0.19,0.2,0.21,0.22,0.23,0.24,0.25,0.26,0.27,0.28,0.29,0.3,0.31,0.32,0.33,0.34,0.35,0.36,0.37,0.38,0.39,0.4,0.41,0.42,0.43,0.44,0.45,0.46,0.47,0.48,0.49,0.5,0.51,0.52,0.53,0.54,0.55,0.56,0.57,0.58,0.59,0.6,0.61,0.62,0.63,0.64,0.65,0.66,0.67,0.68,0.69,0.7,0.8,0.9,1,1.1,1.2,1.3,1.4,1.5,1.6,1.7,1.8,1.9,2,2.1,2.2,2.3,2.4,2.5,2.6,2.7,2.8,2.9,3];
                var wheatherDates = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
                    51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160];
                _this.chart = new Chart('canvas', {
                    type: 'line',
                    data: {
                        labels: wheatherDates,
                        datasets: [
                            {
                                data: analog, borderColor: '#3cba9f', fill: false
                            }
                        ]
                    },
                    options: {
                        legend: {
                            display: false
                        },
                        scales: {
                            xAxes: [{
                                    display: true
                                }],
                            yAxes: [{
                                    display: true
                                }]
                        }
                    }
                });
                _this.stopProgress();
                _this.stopProgress();
            }, function (error) {
                if (error.status == 401) {
                    _this.flashMessage.show('Your role is unauthorized to get data !', {
                        cssClass: 'alert-danger',
                        timeout: 3000
                    });
                }
            });
            /*
           this.startProgress();
           this.ecgService.dailyForecast().subscribe(res => {
           console.log(res);
           let temp_max = res['list'].map(res => res.temp.max);
           let temp_min = res['list'].map(res => res.temp.min);
           let alldates = res['list'].map(res => res.dt);
    
           let wheatherDates = [0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1,1.1,1.2,1.3,1.4,1.5,1.6,1.7,1.8,1.9,2,2.1,2.2,2.3,2.4,2.5,2.6,2.7,2.8,2.9,3];
    
           this.chart = new Chart('canvas',{
             type: 'line',
             data: {
               labels : wheatherDates,
               datasets: [
               {
                data: temp_max, borderColor: '#3cba9f', fill: false
               },
               {
                data: temp_min, borderColor: '#ffcc00', fill: false
               },
               ]
             },
             options: {
               legend:{
                display: false
               },
               scales:{
                 xAxes: [{
                  display: true
                 }],
                 yAxes: [{
                  display: true
                 }]
               }
             }
           });
           this.stopProgress();
           });
           */
        }
    };
    EcgComponent.prototype.startProgress = function () {
        this.spinner.show();
    };
    EcgComponent.prototype.stopProgress = function () {
        this.spinner.hide();
    };
    EcgComponent.prototype.goBackMenu = function () {
        this.router.navigate(['patientData']);
    };
    EcgComponent.prototype.onClickNext = function () {
        if (this.page < (this.maxpage - 1)) {
            this.page++;
            this.getEcgList();
        }
    };
    EcgComponent.prototype.onClickSelectedPage = function (input) {
        if (input > 0 && input < (this.maxpage - 1)) {
            this.page = input - 1;
            this.getEcgList();
        }
    };
    EcgComponent.prototype.onClickPrevious = function () {
        if (this.page > 0) {
            this.page--;
            this.getEcgList();
        }
    };
    EcgComponent.prototype.searchWithFilter = function () {
        //this.filterState = true;
        this.getEcgList();
    };
    EcgComponent.prototype.searchWithoutFilter = function () {
        //this.filterState = false;
        this.getEcgList();
    };
    EcgComponent.prototype.getCurrentUser = function () {
        var usersJSON = JSON.parse(localStorage.getItem('user'));
        return usersJSON;
    };
    return EcgComponent;
}());
EcgComponent = __decorate([
    Component({
        selector: 'app-ecg',
        templateUrl: './ecg.component.html',
        styleUrls: ['./ecg.component.css']
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof Router !== "undefined" && Router) === "function" && _a || Object, DatatransferService, typeof (_b = typeof FlashMessagesService !== "undefined" && FlashMessagesService) === "function" && _b || Object, UtilityService,
        EcgService, typeof (_c = typeof NgxSpinnerService !== "undefined" && NgxSpinnerService) === "function" && _c || Object, ConstantvariablesService])
], EcgComponent);
export { EcgComponent };
var _a, _b, _c;
//# sourceMappingURL=E:/CPPBT 2018/angular-src/src/app/componets/ecg/ecg.component.js.map