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
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { tokenNotExpired } from 'angular2-jwt';
import { environment } from '../../environments/environment';
var AuthService = (function () {
    function AuthService(http) {
        this.http = http;
    }
    AuthService.prototype.registerUser = function (user) {
        var headers = new Headers();
        //let _headers = new HttpHeaders();
        var checkRole = user.role;
        var endPoint = "";
        if (checkRole == "Clinic") {
            endPoint = environment.origin_host + 'register/userClinic';
        }
        else if (checkRole == "Nurse") {
            endPoint = environment.origin_host + 'register/userNurse';
        }
        else if (checkRole == "Doctor") {
            endPoint = environment.origin_host + 'register/userDoctor';
        }
        else if (checkRole == "Patient") {
            endPoint = environment.origin_host + 'register/userPatient';
        }
        else if (checkRole == "Admin") {
            endPoint = environment.origin_host + 'register/userAdmin';
        }
        return this.http.post(endPoint, user, { headers: headers }).map(function (res) { return res.json(); });
    };
    AuthService.prototype.authenticateUser = function (user) {
        var body = 'email=' + user.email + '&password=' + user.password;
        var checkRole = user.role;
        var endPoint = "";
        var headers = new Headers();
        if (checkRole == "Clinic") {
            endPoint = environment.origin_host + 'authenticate/userClinic';
        }
        else if (checkRole == "Nurse") {
            endPoint = environment.origin_host + 'authenticate/userNurse';
        }
        else if (checkRole == "Doctor") {
            endPoint = environment.origin_host + 'authenticate/userDoctor';
        }
        else if (checkRole == "Patient") {
            endPoint = environment.origin_host + 'authenticate/userPatient';
        }
        else if (checkRole == "Admin") {
            endPoint = environment.origin_host + 'authenticate/userAdmin';
        }
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this.http.post(endPoint, body, { headers: headers }).map(function (res) { return res.json(); });
    };
    AuthService.prototype.getProfile = function () {
        var headers = new Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        return this.http.get(environment.origin_host + 'users/profile/' + this.user.id, { headers: headers }).map(function (res) { return res.json(); });
    };
    AuthService.prototype.getSensor = function () {
        var headers = new Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        return this.http.get(environment.origin_host + 'sensors/getAllData', { headers: headers }).map(function (res) { return res.json(); });
    };
    AuthService.prototype.storeUserData = function (token, user) {
        localStorage.setItem('id_token', token);
        localStorage.setItem('user', JSON.stringify(user));
        this.authToken = token;
        this.user = user;
    };
    AuthService.prototype.loadToken = function () {
        var token = localStorage.getItem('id_token');
        this.authToken = token;
    };
    AuthService.prototype.loggedIn = function () {
        return tokenNotExpired();
    };
    AuthService.prototype.getRole = function () {
        var usersJSON = JSON.parse(localStorage.getItem('user'));
        return usersJSON.roles;
    };
    AuthService.prototype.logout = function () {
        this.authToken = null;
        this.user = null;
        localStorage.clear();
    };
    return AuthService;
}());
AuthService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof Http !== "undefined" && Http) === "function" && _a || Object])
], AuthService);
export { AuthService };
var _a;
//# sourceMappingURL=E:/CPPBT 2018/angular-src/src/app/services/auth.service.js.map