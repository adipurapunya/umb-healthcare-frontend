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
var SensorComponent = (function () {
    function SensorComponent(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    SensorComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.authService.getSensor().subscribe(function (sensor) {
            _this.sensor = sensor;
        }, function (err) {
            console.log(err);
            return false;
        });
    };
    return SensorComponent;
}());
SensorComponent = __decorate([
    Component({
        selector: 'app-sensor',
        templateUrl: './sensor.component.html',
        styleUrls: ['./sensor.component.css']
    }),
    __metadata("design:paramtypes", [AuthService, typeof (_a = typeof Router !== "undefined" && Router) === "function" && _a || Object])
], SensorComponent);
export { SensorComponent };
var _a;
//# sourceMappingURL=E:/CPPBT 2018/angular-src/src/app/componets/sensor/sensor.component.js.map