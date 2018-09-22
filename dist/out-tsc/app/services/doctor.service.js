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
import { Http, Headers } from "@angular/http";
import { environment } from "../../environments/environment.prod";
var DoctorService = (function () {
    function DoctorService(http) {
        this.http = http;
    }
    DoctorService.prototype.getDoctors = function (page, sze, srt, srtFld) {
        var headers = new Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        var strpar = '?page=' + page + '&size=' + sze + '&sort=' + srt + '&sortField=' + srtFld;
        return this.http.get(environment.origin_host + 'api/doctorsWithPagination' + strpar, { headers: headers }).map(function (res) { return res.json(); });
    };
    DoctorService.prototype.getDoctorsByClinic = function (page, sze, srt, srtFld) {
        var headers = new Headers();
        this.loadToken();
        var usersJSON = JSON.parse(localStorage.getItem('user'));
        headers.append('Authorization', this.authToken);
        var strpar = '?page=' + page + '&size=' + sze + '&sort=' + srt + '&sortField=' + srtFld + '&clinicId=' + usersJSON.clinic.id;
        return this.http.get(environment.origin_host + 'api/doctorsWithPaginationByIdClinic' + strpar, { headers: headers }).map(function (res) { return res.json(); });
    };
    DoctorService.prototype.getDoctorsBySearchField = function (page, sze, srt, srtFld, searchFields, searchValue) {
        var headers = new Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        var strpar = '?page=' + page + '&size=' + sze + '&sort=' + srt + '&sortField=' + srtFld + '&searchField=' + searchFields + '&value=' + searchValue;
        return this.http.get(environment.origin_host + 'api/doctorsWithPaginationByField' + strpar, { headers: headers }).map(function (res) { return res.json(); });
    };
    DoctorService.prototype.getDoctorsBySearchFieldByIdClinic = function (page, sze, srt, srtFld, searchFields, searchValue) {
        var headers = new Headers();
        this.loadToken();
        var usersJSON = JSON.parse(localStorage.getItem('user'));
        headers.append('Authorization', this.authToken);
        var strpar = '?page=' + page + '&size=' + sze + '&sort=' + srt + '&sortField=' + srtFld + '&searchField=' + searchFields + '&value=' + searchValue + '&clinicId=' + usersJSON.clinic.id;
        return this.http.get(environment.origin_host + 'api/doctorsWithPaginationByFieldByIdClinic' + strpar, { headers: headers }).map(function (res) { return res.json(); });
    };
    DoctorService.prototype.deleteDoctor = function (params) {
        var headers = new Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        return this.http.delete(environment.origin_host + 'api/userDoctor/' + params.id, { headers: headers }).map(function (res) { return res.json(); });
    };
    DoctorService.prototype.loadToken = function () {
        var token = localStorage.getItem('id_token');
        this.authToken = token;
    };
    DoctorService.prototype.editDoctor = function (params, id) {
        var endPoint = 'api/userDoctor/';
        var headers = new Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        return this.http.put(environment.origin_host + endPoint + id, params, { headers: headers }).map(function (res) { return res.json(); });
    };
    return DoctorService;
}());
DoctorService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof Http !== "undefined" && Http) === "function" && _a || Object])
], DoctorService);
export { DoctorService };
var _a;
//# sourceMappingURL=E:/CPPBT 2018/angular-src/src/app/services/doctor.service.js.map