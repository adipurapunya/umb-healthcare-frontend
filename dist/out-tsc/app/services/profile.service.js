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
import { environment } from '../../environments/environment';
import * as CryptoJS from 'crypto-js';
var ProfileService = (function () {
    function ProfileService(http) {
        this.http = http;
        this.encryptedText = function (text) {
            var iterationCount = 1000;
            var keySize = 128;
            var passPhrase = environment.passPhrase;
            var dataToDecrypt = text; //The base64 encoded string output from Java;
            var iv = environment.iv;
            var salt = environment.salt;
            var AesUtil = function (keySize, iterationCount) {
                this.keySize = keySize / 32;
                this.iterationCount = iterationCount;
            };
            AesUtil.prototype.generateKey = function (salt, passPhrase) {
                var key = CryptoJS.PBKDF2(passPhrase, CryptoJS.enc.Hex.parse(salt), { keySize: this.keySize, iterations: this.iterationCount });
                return key;
            };
            AesUtil.prototype.encrypt = function (salt, iv, passPhrase, plainText) {
                var key = this.generateKey(salt, passPhrase);
                var encrypted = CryptoJS.AES.encrypt(plainText, key, { iv: CryptoJS.enc.Hex.parse(iv) });
                return encrypted.toString();
            };
            var aesUtil = new AesUtil(keySize, iterationCount);
            var plaintext = aesUtil.encrypt(salt, iv, passPhrase, dataToDecrypt);
            return plaintext;
        };
    }
    ProfileService.prototype.getProfile = function () {
        var endPoint = '';
        var headers = new Headers();
        this.loadToken();
        this.loadUser();
        if (this.user.roles == 'ROLE_ADMIN') {
            endPoint = 'api/userAdmin/';
        }
        else if (this.user.roles == 'ROLE_CLINIC') {
            endPoint = 'api/userClinic/';
        }
        else if (this.user.roles == 'ROLE_NURSE') {
            endPoint = 'api/userNurse/';
        }
        else if (this.user.roles == 'ROLE_DOCTOR') {
            endPoint = 'api/userDoctor/';
        }
        else if (this.user.roles == 'ROLE_PATIENT') {
            endPoint = 'api/userPatient/';
        }
        headers.append('Authorization', this.authToken);
        return this.http.get(environment.origin_host + endPoint + this.user.id, { headers: headers }).map(function (res) { return res.json(); });
    };
    ProfileService.prototype.editProfile = function (params, id) {
        var endPoint = '';
        var headers = new Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        if (this.user.roles == 'ROLE_ADMIN') {
            endPoint = 'api/userAdmin/';
        }
        else if (this.user.roles == 'ROLE_CLINIC') {
            endPoint = 'api/userClinic/';
        }
        else if (this.user.roles == 'ROLE_NURSE') {
            endPoint = 'api/userNurse/';
        }
        else if (this.user.roles == 'ROLE_DOCTOR') {
            endPoint = 'api/userDoctor/';
        }
        else if (this.user.roles == 'ROLE_PATIENT') {
            endPoint = 'api/userPatient/';
        }
        return this.http.put(environment.origin_host + endPoint + id, params, { headers: headers }).map(function (res) { return res.json(); });
    };
    ProfileService.prototype.loadToken = function () {
        var token = localStorage.getItem('id_token');
        this.authToken = token;
    };
    ProfileService.prototype.loadUser = function () {
        var user = localStorage.getItem('user');
        this.user = JSON.parse(user);
    };
    ProfileService.prototype.getUser = function () {
        return this.user;
    };
    return ProfileService;
}());
ProfileService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof Http !== "undefined" && Http) === "function" && _a || Object])
], ProfileService);
export { ProfileService };
var _a;
//# sourceMappingURL=E:/CPPBT 2018/angular-src/src/app/services/profile.service.js.map