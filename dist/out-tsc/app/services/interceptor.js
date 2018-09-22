var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from "@angular/core";
var Interceptor = (function () {
    function Interceptor() {
    }
    Interceptor.prototype.intercept = function (req, next) {
        var token = localStorage.getItem('id_token');
        var request = req.clone({
            headers: req.headers.set('Authorization', token)
        });
        //console.log(request);
        //console.log(request.body);
        return next.handle(request);
    };
    return Interceptor;
}());
Interceptor = __decorate([
    Injectable()
], Interceptor);
export { Interceptor };
//# sourceMappingURL=E:/CPPBT 2018/angular-src/src/app/services/interceptor.js.map