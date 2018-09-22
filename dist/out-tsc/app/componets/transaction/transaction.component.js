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
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
var TransactionComponent = (function () {
    function TransactionComponent() {
        this.connected = false;
        this.serverUrl = 'http://localhost:40510';
        this.title = 'WebSockets chat';
    }
    TransactionComponent.prototype.ngOnInit = function () {
        this.connectWebSocket();
    };
    TransactionComponent.prototype.connectWebSocket = function () {
        var ws = new SockJS(this.serverUrl);
        this.stompClient = Stomp.over(ws);
        var that = this;
        this.stompClient.connect({}, function (frame) {
            this.connected = true;
            that.stompClient.subscribe('/**', function (message) {
                if (message.body) {
                    //let msj = JSON.parse(message.body);
                    console.log('BODY ', message.toString());
                    //that.addNotification('Pemesanan Jasa Perawat', msj);
                }
            });
        });
    };
    return TransactionComponent;
}());
TransactionComponent = __decorate([
    Component({
        selector: 'app-transaction',
        templateUrl: './transaction.component.html',
        styleUrls: ['./transaction.component.css']
    }),
    __metadata("design:paramtypes", [])
], TransactionComponent);
export { TransactionComponent };
//# sourceMappingURL=E:/CPPBT 2018/angular-src/src/app/componets/transaction/transaction.component.js.map