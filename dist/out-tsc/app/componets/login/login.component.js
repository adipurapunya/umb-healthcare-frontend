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
import 'rxjs/add/operator/catch';
import swal from 'sweetalert2';
var LoginComponent = (function () {
    function LoginComponent(authService, router, flashMessage) {
        this.authService = authService;
        this.router = router;
        this.flashMessage = flashMessage;
    }
    LoginComponent.prototype.showAlert = function (type, title, text, time, confrimButton) {
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
    LoginComponent.prototype.ngOnInit = function () {
        this.role = 'Admin';
    };
    LoginComponent.prototype.onLoginSubmit = function () {
        var _this = this;
        var user = {
            email: this.email,
            password: this.password,
            role: this.role
        };
        if (user.role != null || user.email != null || user.password != null) {
            this.authService.authenticateUser(user).subscribe(function (data) {
                //console.log(data);
                _this.authService.storeUserData(data.token, data.user);
                _this.flashMessage.show('Login Successful', { cssClass: 'alert-success', timeout: 2000 });
                _this.showAlert('success', 'Login Successful !', 'You will be redirect to dashboard', 2000, true);
                _this.router.navigate(['/dashboard']);
            }, function (error) {
                //console.log(error.status);
                if (error.status == "401") {
                    _this.flashMessage.show('Login Failed / Incorrect Email or Password', { cssClass: 'alert-danger', timeout: 2000 });
                    _this.showAlert('error', 'Login Failed !', 'Incorrect Email or Password', 2000, true);
                    _this.router.navigate(['/login']);
                }
            });
        }
        else {
            this.flashMessage.show('Please Fill all the field', { cssClass: 'alert-danger', timeout: 2000 });
            this.router.navigate(['/login']);
        }
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    Component({
        selector: 'app-login',
        templateUrl: './login.component.html',
        styleUrls: ['./login.component.css']
    }),
    __metadata("design:paramtypes", [AuthService, typeof (_a = typeof Router !== "undefined" && Router) === "function" && _a || Object, typeof (_b = typeof FlashMessagesService !== "undefined" && FlashMessagesService) === "function" && _b || Object])
], LoginComponent);
export { LoginComponent };
var _a, _b;
//# sourceMappingURL=E:/CPPBT 2018/angular-src/src/app/componets/login/login.component.js.map