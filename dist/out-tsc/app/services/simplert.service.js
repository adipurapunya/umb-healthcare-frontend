var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
var SimplertService = (function () {
    function SimplertService() {
        this.DEFAULT_BTN_COLOR = "#068AC9";
        this.DEFAULT_TYPE = "info";
        this._isShownSource = new BehaviorSubject(false);
        this._titleSource = new BehaviorSubject("");
        this._messageSource = new BehaviorSubject("");
        /*
         * type enum : info (default), success, warning, error
         * */
        this._typeSource = new BehaviorSubject("info");
        this._colorBtnSource = new BehaviorSubject("#068AC9");
        this.isShown$ = this._isShownSource.asObservable();
        this.title$ = this._titleSource.asObservable();
        this.message$ = this._messageSource.asObservable();
        this.type$ = this._typeSource.asObservable();
        this.colorBtn$ = this._colorBtnSource.asObservable();
    }
    SimplertService.prototype.openPopupBlock = function (title, message) {
        this._isShownSource.next(true);
        this._titleSource.next(title);
        this._messageSource.next(message);
        // reset to default setting
        this._colorBtnSource.next(this.DEFAULT_BTN_COLOR);
    };
    SimplertService.prototype.openPopupBlockWithType = function (title, message, type) {
        this._isShownSource.next(true);
        this._titleSource.next(title);
        this._messageSource.next(message);
        if (type === '') {
            this._typeSource.next(this.DEFAULT_TYPE);
        }
        else {
            this._typeSource.next(type);
        }
        // reset to default setting
        this._colorBtnSource.next(this.DEFAULT_BTN_COLOR);
    };
    SimplertService.prototype.changeShown = function (booleanParam) {
        this._isShownSource.next(booleanParam);
    };
    SimplertService.prototype.setTitle = function (title) {
        this._titleSource.next(title);
    };
    SimplertService.prototype.setMessage = function (message) {
        this._messageSource.next(message);
    };
    SimplertService.prototype.setType = function (type) {
        this._typeSource.next(type);
    };
    SimplertService.prototype.setColorBtn = function (btnColor) {
        this._colorBtnSource.next(btnColor);
    };
    return SimplertService;
}());
SimplertService = __decorate([
    Injectable()
], SimplertService);
export { SimplertService };
//# sourceMappingURL=E:/CPPBT 2018/angular-src/src/app/services/simplert.service.js.map