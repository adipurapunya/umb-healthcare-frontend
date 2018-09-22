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
import { FlashMessagesService } from "angular2-flash-messages";
import { ConstantvariablesService } from "../../services/constantvariables.service";
import { PatientService } from "../../services/patient.service";
import { ClinicService } from "../../services/clinic.service";
import { ProfileService } from "../../services/profile.service";
import { DatatransferService } from "../../services/datatransfer.service";
import swal from 'sweetalert2';
var PatientAddComponent = (function () {
    function PatientAddComponent(datatransferService, router, flashMessage, constantServ, patientSvc, profileSvc, clinicService) {
        this.datatransferService = datatransferService;
        this.router = router;
        this.flashMessage = flashMessage;
        this.constantServ = constantServ;
        this.patientSvc = patientSvc;
        this.profileSvc = profileSvc;
        this.clinicService = clinicService;
    }
    PatientAddComponent.prototype.ngOnInit = function () {
        //this.patient = null;//this.datatransferService.getDataTransfer();
        //this.initParameters();
        this.religionList = this.constantServ.getReligionList();
        this.genderList = this.constantServ.getGenderList();
        this.statusList = this.constantServ.getStatusList();
        this.getClinicList();
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
    PatientAddComponent.prototype.showAlert = function (type, title, text, time, confrimButton) {
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
    PatientAddComponent.prototype.goBackMenu = function () {
        this.router.navigate(['patientData']);
    };
    PatientAddComponent.prototype.getClinicList = function () {
        var _this = this;
        var usersJSON = JSON.parse(localStorage.getItem('user'));
        this.clinicService.getListOfClinics().subscribe(function (data) {
            if (usersJSON.roles == 'ROLE_ADMIN') {
                _this.clinicsList = data;
            }
            else {
                for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                    var item = data_1[_i];
                    if (usersJSON.clinic.id == item.id) {
                        //console.log(item.nameOfClinic);
                        var arrayTemp = [];
                        arrayTemp.push(item);
                        _this.clinicsList = arrayTemp;
                    }
                }
            }
        }, function (error) {
            if (error.status == 401) {
                _this.flashMessage.show('Your role is unauthorized to show this data !', {
                    cssClass: 'alert-danger',
                    timeout: 3000
                });
            }
        });
    };
    PatientAddComponent.prototype.initParameters = function () {
        this.patient.fullName = null;
        this.patient.email = null;
        this.patient.dateBirth = null;
        this.patient.address = null;
        this.patient.phoneNumber = null;
        this.patient.patientCode = null;
        this.patient.placeBirth = null;
        this.patient.clinic = null;
        this.patient.occupation = null;
        this.patient.deviceCode = null;
        this.patient.password = null;
    };
    PatientAddComponent.prototype.onAddSubmit = function () {
        var _this = this;
        var addItem = {
            'fullName': this.fullName,
            'email': this.email,
            'dateBirth': this.dateBirth,
            'address': this.address,
            'phoneNumber': this.phoneNumber,
            'patientCode': this.patientCode,
            'religion': this.religionsel,
            'gender': this.gendersel,
            'placeBirth': this.placeBirth,
            'clinic': {
                'id': this.clinicsel
            },
            'occupation': this.occupation,
            'deviceCode': this.deviceCode,
            'status': {
                'id': this.statussel
            },
            "password": this.password,
            "firstRegistrationDate": new Date()
        };
        if (this.password == null) {
            this.showAlert('error', 'Add Patient Failed !', 'Password can not be empty', 2500, true);
        }
        else if (this.email == null) {
            this.showAlert('error', 'Add Patient Failed !', 'Email can not be empty', 2500, true);
        }
        else if (this.fullName == null) {
            this.showAlert('error', 'Add Patient Failed !', 'Full Name can not be empty', 2500, true);
        }
        else if (this.clinicsel == null) {
            this.showAlert('error', 'Add Patient Failed !', 'Clinic can not be empty', 2500, true);
        }
        else if (this.dateBirth == null) {
            this.showAlert('error', 'Add Patient Failed !', 'Date of birth can not be empty', 2500, true);
        }
        else {
            this.patientSvc.addPatient(addItem).subscribe(function (data) {
                _this.flashMessage.show('Patient has been successfully added !', { cssClass: 'alert-success', timeout: 3000 });
                _this.showAlert('success', 'Patient has been successfully added !', 'You will be redirect to list of patient ', 2500, true);
                _this.router.navigate(['patientData']);
            }, function (error) {
                if (error.status == 401) {
                    _this.flashMessage.show('Your role is unauthorized to add data !', { cssClass: 'alert-danger', timeout: 3000 });
                }
                else {
                    _this.flashMessage.show('failed add patient !', { cssClass: 'alert-danger', timeout: 3000 });
                }
            });
        }
    };
    return PatientAddComponent;
}());
PatientAddComponent = __decorate([
    Component({
        selector: 'app-patient-add',
        templateUrl: './patient-add.component.html',
        styleUrls: ['./patient-add.component.css']
    }),
    __metadata("design:paramtypes", [DatatransferService, typeof (_a = typeof Router !== "undefined" && Router) === "function" && _a || Object, typeof (_b = typeof FlashMessagesService !== "undefined" && FlashMessagesService) === "function" && _b || Object, ConstantvariablesService,
        PatientService,
        ProfileService,
        ClinicService])
], PatientAddComponent);
export { PatientAddComponent };
var _a, _b;
//# sourceMappingURL=E:/CPPBT 2018/angular-src/src/app/componets/patient-add/patient-add.component.js.map