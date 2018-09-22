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
var NurseService = (function () {
    function NurseService(http) {
        this.http = http;
    }
    NurseService.prototype.getNurses = function (page, sze, srt, srtFld) {
        var headers = new Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        var strpar = '?page=' + page + '&size=' + sze + '&sort=' + srt + '&sortField=' + srtFld;
        return this.http.get(environment.origin_host + 'api/nursesWithPagination' + strpar, { headers: headers }).map(function (res) { return res.json(); });
    };
    NurseService.prototype.getNursesByClinic = function (page, sze, srt, srtFld) {
        var headers = new Headers();
        this.loadToken();
        var usersJSON = JSON.parse(localStorage.getItem('user'));
        headers.append('Authorization', this.authToken);
        var strpar = '?page=' + page + '&size=' + sze + '&sort=' + srt + '&sortField=' + srtFld + '&clinicId=' + usersJSON.clinic.id;
        return this.http.get(environment.origin_host + 'api/nursesWithPaginationByIdClinic' + strpar, { headers: headers }).map(function (res) { return res.json(); });
    };
    NurseService.prototype.getNursesBySearchField = function (page, sze, srt, srtFld, searchFields, searchValue) {
        var headers = new Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        var strpar = '?page=' + page + '&size=' + sze + '&sort=' + srt + '&sortField=' + srtFld + '&searchField=' + searchFields + '&value=' + searchValue;
        return this.http.get(environment.origin_host + 'api/nursesWithPaginationByField' + strpar, { headers: headers }).map(function (res) { return res.json(); });
    };
    NurseService.prototype.getNursesBySearchFieldByIdClinic = function (page, sze, srt, srtFld, searchFields, searchValue) {
        var headers = new Headers();
        this.loadToken();
        var usersJSON = JSON.parse(localStorage.getItem('user'));
        headers.append('Authorization', this.authToken);
        var strpar = '?page=' + page + '&size=' + sze + '&sort=' + srt + '&sortField=' + srtFld + '&searchField=' + searchFields + '&value=' + searchValue + '&clinicId=' + usersJSON.clinic.id;
        return this.http.get(environment.origin_host + 'api/nursesWithPaginationByFieldByIdClinic' + strpar, { headers: headers }).map(function (res) { return res.json(); });
    };
    NurseService.prototype.deleteNurse = function (params) {
        var headers = new Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        return this.http.delete(environment.origin_host + 'api/userNurse/' + params.id, { headers: headers }).map(function (res) { return res.json(); });
    };
    NurseService.prototype.loadToken = function () {
        var token = localStorage.getItem('id_token');
        this.authToken = token;
    };
    NurseService.prototype.editNurse = function (params, id) {
        var endPoint = 'api/userNurse/';
        var headers = new Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        return this.http.put(environment.origin_host + endPoint + id, params, { headers: headers }).map(function (res) { return res.json(); });
    };
    return NurseService;
}());
NurseService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof Http !== "undefined" && Http) === "function" && _a || Object])
], NurseService);
export { NurseService };
var _a;
//# sourceMappingURL=E:/CPPBT 2018/angular-src/src/app/services/nurse.service.js.map