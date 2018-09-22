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
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
//import {TranslateService} from 'ng2-translate';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from "ngx-spinner";
import swal from 'sweetalert2';
import { DatatransferService } from "../../services/datatransfer.service";
var NavbarComponent = (function () {
    function NavbarComponent(authService, router, flashMessage, translate, spinner, dataTransferService) {
        this.authService = authService;
        this.router = router;
        this.flashMessage = flashMessage;
        this.translate = translate;
        this.spinner = spinner;
        this.dataTransferService = dataTransferService;
        //translate.addLangs(["in","en","ch","ar"]);
        translate.setDefaultLang("en");
        //let browserLang = translate.getBrowserLang();
        //translate.use(browserLang.match(/en|in/) ? browserLang : "en");
    }
    NavbarComponent.prototype.showAlert = function (type, title, text, time, confrimButton) {
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
    NavbarComponent.prototype.changeLanguage = function (lang) {
        this.startProgress();
        this.translate.use(lang);
        this.stopProgress();
    };
    NavbarComponent.prototype.onLogoutClick = function () {
        this.authService.logout();
        this.flashMessage.show('You are logged out', { cssClass: 'alert-success', timeout: 3000 });
        this.showAlert('warning', 'You are logged out !', 'You will be redirect to login page', 2500, true);
        this.router.navigate(['/login']);
        return false;
    };
    NavbarComponent.prototype.startProgress = function () {
        this.spinner.show();
    };
    NavbarComponent.prototype.stopProgress = function () {
        this.spinner.hide();
    };
    NavbarComponent.prototype.ngOnInit = function () {
        this.user = this.getCurrentUser();
    };
    NavbarComponent.prototype.getCurrentUser = function () {
        var usersJSON = JSON.parse(localStorage.getItem('user'));
        return usersJSON;
    };
    NavbarComponent.prototype.goToEcgDetail = function (patient) {
        this.dataTransferService.setDataTransfer(patient);
        this.router.navigate(['ecgData']);
    };
    return NavbarComponent;
}());
NavbarComponent = __decorate([
    Component({
        selector: 'app-navbar',
        templateUrl: './navbar.component.html',
        styleUrls: ['./navbar.component.css']
    }),
    __metadata("design:paramtypes", [AuthService, typeof (_a = typeof Router !== "undefined" && Router) === "function" && _a || Object, typeof (_b = typeof FlashMessagesService !== "undefined" && FlashMessagesService) === "function" && _b || Object, typeof (_c = typeof TranslateService !== "undefined" && TranslateService) === "function" && _c || Object, typeof (_d = typeof NgxSpinnerService !== "undefined" && NgxSpinnerService) === "function" && _d || Object, DatatransferService])
], NavbarComponent);
export { NavbarComponent };
var _a, _b, _c, _d;
//# sourceMappingURL=E:/CPPBT 2018/angular-src/src/app/componets/navbar/navbar.component.js.map