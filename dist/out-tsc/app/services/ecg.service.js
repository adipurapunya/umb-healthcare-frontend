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
import { HttpClient } from "@angular/common/http";
import { Http, Headers } from "@angular/http";
import { environment } from "../../environments/environment.prod";
var EcgService = (function () {
    function EcgService(http, _http) {
        this.http = http;
        this._http = _http;
    }
    EcgService.prototype.dailyForecast = function () {
        return this.http.get("https://samples.openweathermap.org/data/2.5/forecast/daily?id=524901&appid=b1b15e88fa797225412429c1c50c122a1")
            .map(function (result) { return result.json(); });
    };
    EcgService.prototype.getEcgValueByDeviceCodeAndDate = function (page, sze, srt, srtFld, deviceCode, date) {
        var headers = new Headers();
        this.loadToken();
        var usersJSON = JSON.parse(localStorage.getItem('user'));
        headers.append('Authorization', this.authToken);
        var strpar = '?page=' + page + '&size=' + sze + '&sort=' + srt + '&sortField=' + srtFld + '&ecgCode=' + deviceCode + '&date=' + date;
        return this.http.get(environment.origin_host + 'api/ecgWithPaginationByEcgCodeAndDate' + strpar, { headers: headers }).map(function (res) { return res.json(); });
    };
    EcgService.prototype.loadToken = function () {
        var token = localStorage.getItem('id_token');
        this.authToken = token;
    };
    return EcgService;
}());
EcgService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof Http !== "undefined" && Http) === "function" && _a || Object, typeof (_b = typeof HttpClient !== "undefined" && HttpClient) === "function" && _b || Object])
], EcgService);
export { EcgService };
var _a, _b;
//# sourceMappingURL=E:/CPPBT 2018/angular-src/src/app/services/ecg.service.js.map