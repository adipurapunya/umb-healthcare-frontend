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
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
var AuthGuard = (function () {
    function AuthGuard(authSercice, router) {
        this.authSercice = authSercice;
        this.router = router;
    }
    AuthGuard.prototype.canActivate = function (route, state) {
        if (this.authSercice.loggedIn()) {
            var getRoles = route.data["roles"];
            var usersJSON = JSON.parse(localStorage.getItem('user'));
            if (getRoles != null) {
                if (getRoles.indexOf(usersJSON.roles[0]) == -1) {
                    //console.log("Unauthorized");
                    this.router.navigate(['/unauthorized']);
                    return false;
                }
            }
            return true;
        }
        else {
            this.router.navigate(['/login']);
            return false;
        }
    };
    return AuthGuard;
}());
AuthGuard = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [AuthService, typeof (_a = typeof Router !== "undefined" && Router) === "function" && _a || Object])
], AuthGuard);
export { AuthGuard };
var _a;
//# sourceMappingURL=E:/CPPBT 2018/angular-src/src/app/guards/auth.guard.js.map