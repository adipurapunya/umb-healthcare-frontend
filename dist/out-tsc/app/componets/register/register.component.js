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
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
var RegisterComponent = (function () {
    function RegisterComponent(validateService, flashMessage, authService, router) {
        this.validateService = validateService;
        this.flashMessage = flashMessage;
        this.authService = authService;
        this.router = router;
    }
    RegisterComponent.prototype.ngOnInit = function () {
        this.role = 'Clinic';
        this.clinicSel = '2';
    };
    RegisterComponent.prototype.showAlerts = function (type, title, text, time, confrimButton) {
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
    RegisterComponent.prototype.onRegisterSubmit = function () {
        //console.log(this.name);
        //const role = this.role;
        var _this = this;
        var user = {
            email: this.email,
            password: this.password,
            fullName: this.fullName,
            role: this.role,
            clinic: {
                id: this.clinicSel
            }
        };
        if (user.role != null && user.email != null && user.password != null && user.fullName != null) {
            // Validate Email
            if (!this.validateService.validateEmail(user.email)) {
                this.flashMessage.show('Please Use valid email', { cssClass: 'alert-danger', timeout: 5000 });
                return false;
            }
            else if (this.verificationCode == 'ABC123') {
                // Register User
                this.authService.registerUser(user).subscribe(function (data) {
                    if (data.email != null) {
                        _this.flashMessage.show('Conratulations, now you are registered as ' + data.email + ' and please go to log in', {
                            cssClass: 'alert-success',
                            timeout: 5000
                        });
                        _this.showAlerts('success', 'Register Successful !', 'You will be redirect to login page', 2000, true);
                        //console.log("Berhasil Input data");
                        _this.router.navigate(['/login']);
                    }
                    else {
                        _this.flashMessage.show('Failed Register', { cssClass: 'alert-danger', timeout: 3000 });
                        _this.showAlerts('error', 'Failed Register !', 'Please try again', 2000, true);
                        _this.router.navigate(['/register']);
                        //console.log("Gagal Input data");
                    }
                }, function (error) {
                    console.log(error);
                    _this.flashMessage.show('Unknown Error', { cssClass: 'alert-danger', timeout: 3000 });
                    _this.showAlerts('error', 'Failed Register !', 'Unknown Error', 2000, true);
                    _this.router.navigate(['/register']);
                });
            }
            else {
                this.flashMessage.show('Verification Code is not valid', { cssClass: 'alert-danger', timeout: 3000 });
                this.showAlerts('error', 'Failed Register !', 'Unknown Error', 2000, true);
                this.router.navigate(['/register']);
            }
        }
        else {
            this.flashMessage.show('Please Fill all the field', { cssClass: 'alert-danger', timeout: 3000 });
            this.showAlerts('error', 'Failed Register !', 'Please Fill all the field', 2000, true);
            this.router.navigate(['/register']);
        }
    };
    return RegisterComponent;
}());
RegisterComponent = __decorate([
    Component({
        selector: 'app-register',
        templateUrl: './register.component.html',
        styleUrls: ['./register.component.css']
    }),
    __metadata("design:paramtypes", [ValidateService, typeof (_a = typeof FlashMessagesService !== "undefined" && FlashMessagesService) === "function" && _a || Object, AuthService, typeof (_b = typeof Router !== "undefined" && Router) === "function" && _b || Object])
], RegisterComponent);
export { RegisterComponent };
var _a, _b;
//# sourceMappingURL=E:/CPPBT 2018/angular-src/src/app/componets/register/register.component.js.map