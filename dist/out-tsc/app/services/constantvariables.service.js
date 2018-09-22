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
var ConstantvariablesService = (function () {
    function ConstantvariablesService() {
    }
    ConstantvariablesService.prototype.getReligionList = function () {
        var religion = [
            { 'id': 1, 'name': 'Islam' },
            { 'id': 2, 'name': 'Katolik' },
            { 'id': 3, 'name': 'Protestan' },
            { 'id': 4, 'name': 'Hindu' },
            { 'id': 5, 'name': 'Budha' },
            { 'id': 6, 'name': 'Yahudi' },
            { 'id': 7, 'name': 'Atheis' },
            { 'id': 8, 'name': 'Kong Hu Chu' }
        ];
        return religion;
    };
    ConstantvariablesService.prototype.getGenderList = function () {
        var gender = [
            { 'id': 1, 'name': 'Laki-Laki' },
            { 'id': 2, 'name': 'Perempuan' }
        ];
        return gender;
    };
    ConstantvariablesService.prototype.getStatusList = function () {
        var status = [
            { 'id': 1, 'status': 'Active', 'value': '1' },
            { 'id': 2, 'status': 'Suspend', 'value': '2' },
            { 'id': 3, 'status': 'Pending', 'value': '3' },
            { 'id': 4, 'status': 'Non Active', 'value': '4' }
        ];
        return status;
    };
    ConstantvariablesService.prototype.getPagesOption = function () {
        var opt = [
            { 'id': 1, 'value': 10 },
            { 'id': 2, 'value': 15 },
            { 'id': 3, 'value': 20 },
            { 'id': 4, 'value': 25 },
            { 'id': 5, 'value': 30 },
            { 'id': 6, 'value': 35 },
            { 'id': 7, 'value': 40 },
            { 'id': 8, 'value': 45 },
            { 'id': 9, 'value': 50 },
            { 'id': 10, 'value': 100 },
            { 'id': 11, 'value': 200 }
        ];
        return opt;
    };
    ConstantvariablesService.prototype.getSortType = function () {
        var sortType = [
            { 'id': 1, 'name': 'A-Z', 'value': 'ASC' },
            { 'id': 2, 'name': 'Z-A', 'value': 'DESC' },
        ];
        return sortType;
    };
    ConstantvariablesService.prototype.getDay = function () {
        var day = [
            { 'id': 1, 'name': 'Minggu' },
            { 'id': 2, 'name': 'Senin' },
            { 'id': 3, 'name': 'Selasa' },
            { 'id': 4, 'name': 'Rabu' },
            { 'id': 5, 'name': 'Kamis' },
            { 'id': 6, 'name': 'Jumat' },
            { 'id': 7, 'name': 'Sabtu' }
        ];
        return day;
    };
    ConstantvariablesService.prototype.getPatientField = function () {
        var patientField = [
            { 'id': 1, 'name': 'Patient Name', 'value': 'fullName' },
            { 'id': 2, 'name': 'patient Id', 'value': 'id' },
            { 'id': 3, 'name': 'Patient Code', 'value': 'patientCode' },
            { 'id': 4, 'name': 'Phone Number', 'value': 'phoneNumber' },
            { 'id': 5, 'name': 'Email', 'value': 'email' },
            { 'id': 6, 'name': 'Device Code', 'value': 'deviceCode' }
        ];
        return patientField;
    };
    ConstantvariablesService.prototype.getPatientSortField = function () {
        var patientField = [
            { 'id': 1, 'name': 'Patient Name', 'value': 'fullName' },
            { 'id': 2, 'name': 'Patient Code', 'value': 'patientCode' },
            { 'id': 3, 'name': 'Patient Id', 'value': 'id' }
        ];
        return patientField;
    };
    // =================
    ConstantvariablesService.prototype.getDoctorField = function () {
        var doctorField = [
            { 'id': 1, 'name': 'Doctor Name', 'value': 'fullName' },
            { 'id': 2, 'name': 'Doctor Id', 'value': 'id' },
            { 'id': 3, 'name': 'Doctor Code', 'value': 'doctorCode' },
            { 'id': 4, 'name': 'Phone Number', 'value': 'phoneNumber' },
            { 'id': 5, 'name': 'Email', 'value': 'email' },
            { 'id': 6, 'name': 'Register Number', 'value': 'registerNumber' }
        ];
        return doctorField;
    };
    ConstantvariablesService.prototype.getDoctorSortField = function () {
        var doctorField = [
            { 'id': 1, 'name': 'Doctor Name', 'value': 'fullName' },
            { 'id': 2, 'name': 'Doctor Code', 'value': 'doctorCode' },
            { 'id': 3, 'name': 'Doctor Id', 'value': 'id' }
        ];
        return doctorField;
    };
    // =================
    ConstantvariablesService.prototype.getNurseField = function () {
        var nurseField = [
            { 'id': 1, 'name': 'Nurse Name', 'value': 'fullName' },
            { 'id': 2, 'name': 'Nurse Id', 'value': 'id' },
            { 'id': 3, 'name': 'Nurse Code', 'value': 'nurseCode' },
            { 'id': 4, 'name': 'Phone Number', 'value': 'phoneNumber' },
            { 'id': 5, 'name': 'Email', 'value': 'email' },
            { 'id': 6, 'name': 'SIPP', 'value': 'sipp' }
        ];
        return nurseField;
    };
    ConstantvariablesService.prototype.getNurseSortField = function () {
        var nurseField = [
            { 'id': 1, 'name': 'Nurse Name', 'value': 'fullName' },
            { 'id': 2, 'name': 'Nurse Code', 'value': 'nurseCode' },
            { 'id': 3, 'name': 'Nurse Id', 'value': 'id' }
        ];
        return nurseField;
    };
    // =================
    ConstantvariablesService.prototype.getClinicField = function () {
        var clinicField = [
            { 'id': 1, 'name': 'Name', 'value': 'fullName' },
            { 'id': 2, 'name': 'User Id', 'value': 'id' },
            { 'id': 3, 'name': 'User Code', 'value': 'userCode' },
            { 'id': 4, 'name': 'Phone Number', 'value': 'phoneNumber' },
            { 'id': 5, 'name': 'Email', 'value': 'email' }
        ];
        return clinicField;
    };
    ConstantvariablesService.prototype.getClinicSortField = function () {
        var clinicField = [
            { 'id': 1, 'name': 'Name', 'value': 'fullName' },
            { 'id': 2, 'name': 'User Code', 'value': 'userCode' },
            { 'id': 3, 'name': 'User Id', 'value': 'id' }
        ];
        return clinicField;
    };
    // =================
    ConstantvariablesService.prototype.getEcgField = function () {
        var ecgField = [
            { 'id': 1, 'name': 'Id', 'value': 'fullName' },
            { 'id': 2, 'name': 'Order Analog', 'value': 'orderAnalog' },
        ];
        return ecgField;
    };
    ConstantvariablesService.prototype.getEcgSortField = function () {
        var ecgField = [
            { 'id': 1, 'name': 'Id', 'value': 'id' },
            { 'id': 2, 'name': 'Order Analog', 'value': 'orderAnalog' }
        ];
        return ecgField;
    };
    ConstantvariablesService.prototype.getClinicsList = function () {
        var clinicList = [
            { 'id': 1, 'name': 'Salman Clinic', 'value': '1' },
            { 'id': 2, 'name': 'Ananda Metro Clinic', 'value': '2' },
            { 'id': 3, 'name': 'Al Islam Hospital', 'value': '3' }
        ];
        return clinicList;
    };
    return ConstantvariablesService;
}());
ConstantvariablesService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], ConstantvariablesService);
export { ConstantvariablesService };
//# sourceMappingURL=E:/CPPBT 2018/angular-src/src/app/services/constantvariables.service.js.map