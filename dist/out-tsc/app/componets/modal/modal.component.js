var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ElementRef, Input } from '@angular/core';
import * as $ from 'jquery';
import { ModalService } from '../../services/modal.service';
var ModalComponent = (function () {
    function ModalComponent(modalService, el) {
        this.modalService = modalService;
        this.el = el;
        this.element = $(el.nativeElement);
    }
    ModalComponent.prototype.ngOnInit = function () {
        var modal = this;
        // ensure id attribute exists
        if (!this.id) {
            console.error('modal must have an id');
            return;
        }
        // move element to bottom of page (just before </body>) so it can be displayed above everything else
        this.element.appendTo('body');
        // close modal on background click
        this.element.on('click', function (e) {
            var target = $(e.target);
            if (!target.closest('.modal-body').length) {
                modal.close();
            }
        });
        // add self (this modal instance) to the modal service so it's accessible from controllers
        this.modalService.add(this);
    };
    // remove self from modal service when directive is destroyed
    ModalComponent.prototype.ngOnDestroy = function () {
        this.modalService.remove(this.id);
        this.element.remove();
    };
    // open modal
    ModalComponent.prototype.open = function () {
        this.element.show();
        $('body').addClass('modal-open');
    };
    // close modal
    ModalComponent.prototype.close = function () {
        this.element.hide();
        $('body').removeClass('modal-open');
    };
    return ModalComponent;
}());
__decorate([
    Input(),
    __metadata("design:type", String)
], ModalComponent.prototype, "id", void 0);
ModalComponent = __decorate([
    Component({
        moduleId: module.id.toString(),
        selector: 'modal',
        template: '<ng-content></ng-content>'
    }),
    __metadata("design:paramtypes", [ModalService, typeof (_a = typeof ElementRef !== "undefined" && ElementRef) === "function" && _a || Object])
], ModalComponent);
export { ModalComponent };
var _a;
//# sourceMappingURL=E:/CPPBT 2018/angular-src/src/app/componets/modal/modal.component.js.map