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
import { DatatransferService } from "../../services/datatransfer.service";
import { Router } from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";
import { ConstantvariablesService } from "../../services/constantvariables.service";
import { ProfileService } from "../../services/profile.service";
import { AuthService } from "../../services/auth.service";
var EditPasswordComponent = (function () {
    function EditPasswordComponent(datatransferService, router, flashMessage, constantServ, profileService, authService) {
        this.datatransferService = datatransferService;
        this.router = router;
        this.flashMessage = flashMessage;
        this.constantServ = constantServ;
        this.profileService = profileService;
        this.authService = authService;
    }
    EditPasswordComponent.prototype.ngOnInit = function () {
        this.user = this.datatransferService.getDataTransfer();
    };
    EditPasswordComponent.prototype.onEditPasswordSubmit = function () {
        var _this = this;
        var updateItem;
        var pass1 = this.profileService.encryptedText(this.oldPassword);
        var pass2 = this.user.password;
        if (this.newPassword != null && this.retypenewPassword != null && this.newPassword != null) {
            if (pass1 == pass2) {
                if (this.newPassword == this.retypenewPassword) {
                    updateItem = {
                        'password': this.profileService.encryptedText(this.newPassword)
                    };
                    this.profileService.editProfile(updateItem, this.user.id).subscribe(function (data) {
                        _this.flashMessage.show('Your password has been successful updated. Please Login using your new password !', { cssClass: 'alert-success', timeout: 5000 });
                        _this.authService.logout();
                        _this.router.navigate(['/login']);
                    }, function (error) {
                        _this.flashMessage.show('failed update your password !', { cssClass: 'alert-danger', timeout: 5000 });
                    });
                }
                else {
                    this.flashMessage.show('new password did not match, please type correctly !', { cssClass: 'alert-danger', timeout: 3000 });
                }
            }
            else {
                this.flashMessage.show('your old password did not match !', { cssClass: 'alert-danger', timeout: 3000 });
            }
        }
        else {
            this.flashMessage.show('Please fill all the form !', { cssClass: 'alert-danger', timeout: 3000 });
        }
    };
    EditPasswordComponent.prototype.goBackMenu = function () {
        this.router.navigate(['profile']);
    };
    return EditPasswordComponent;
}());
EditPasswordComponent = __decorate([
    Component({
        selector: 'app-edit-password',
        templateUrl: './edit-password.component.html',
        styleUrls: ['./edit-password.component.css']
    }),
    __metadata("design:paramtypes", [DatatransferService, typeof (_a = typeof Router !== "undefined" && Router) === "function" && _a || Object, typeof (_b = typeof FlashMessagesService !== "undefined" && FlashMessagesService) === "function" && _b || Object, ConstantvariablesService, ProfileService, AuthService])
], EditPasswordComponent);
export { EditPasswordComponent };
var _a, _b;
//# sourceMappingURL=E:/CPPBT 2018/angular-src/src/app/componets/edit-password/edit-password.component.js.map