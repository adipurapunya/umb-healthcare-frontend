var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from '@angular/core';
import { SimplertService } from "../../services/simplert.service";
var SimplertComponent = (function () {
    function SimplertComponent(_simplertService) {
        this._simplertService = _simplertService;
        // api exposed
        this.isUseRadius = false;
        this.isUseIcon = false;
        this.title = "";
        this.type = "";
        this.colorBtn = "#068AC9";
    }
    SimplertComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscriptionShown = this._simplertService.isShown$.subscribe(function (res) { return _this.isShown = res; });
        this.subscriptionTitle = this._simplertService.title$.subscribe(function (res) { return _this.title = res; });
        this.subscriptionMessage = this._simplertService.message$.subscribe(function (res) { return _this.message = res; });
        this.subscriptionType = this._simplertService.type$.subscribe(function (res) { return _this.type = res; });
        this.subscriptionColorBtn = this._simplertService.colorBtn$.subscribe(function (res) { return _this.colorBtn = res; });
    };
    SimplertComponent.prototype.ngOnDestroy = function () {
        this.subscriptionShown.unsubscribe();
        this.subscriptionTitle.unsubscribe();
        this.subscriptionMessage.unsubscribe();
        this.subscriptionType.unsubscribe();
        this.subscriptionColorBtn.unsubscribe();
    };
    SimplertComponent.prototype.closePopup = function () {
        this._simplertService.changeShown(false);
    };
    SimplertComponent.prototype.overlayClick = function (event) {
        if (event.target.className === 'simplert simplert--shown') {
            this._simplertService.changeShown(false);
        }
    };
    return SimplertComponent;
}());
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], SimplertComponent.prototype, "isUseRadius", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], SimplertComponent.prototype, "isUseIcon", void 0);
SimplertComponent = __decorate([
    Component({
        selector: 'SimplertComponent',
        templateUrl: './simplert.component.html',
        styleUrls: ['./simplert.component.scss']
    }),
    __metadata("design:paramtypes", [SimplertService])
], SimplertComponent);
export { SimplertComponent };
//# sourceMappingURL=E:/CPPBT 2018/angular-src/src/app/componets/simplert/simplert.component.js.map