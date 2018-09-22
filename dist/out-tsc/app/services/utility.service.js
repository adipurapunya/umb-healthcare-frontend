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
var UtilityService = (function () {
    function UtilityService() {
    }
    UtilityService.prototype.convertNumberToRupiah = function (angka) {
        var rupiah = '';
        var angkarev = angka.toString().split('').reverse().join('');
        for (var i = 0; i < angkarev.length; i++)
            if (i % 3 == 0)
                rupiah += angkarev.substr(i, 3) + '.';
        return 'Rp ' + rupiah.split('', rupiah.length - 1).reverse().join('');
    };
    UtilityService.prototype.milisToDateText = function (date) {
        var monthNames = [
            'Januari', 'Februari', 'Maret',
            'April', 'Mei', 'Juni', 'Juli',
            'Agustus', 'September', 'Oktober',
            'November', 'Desember'
        ];
        var days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();
        var d = new Date(date);
        var dayName = days[d.getDay()];
        var time = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
        //return dayName + ', ' + day + ' ' + monthNames[monthIndex] + ' ' + year;
        return day + ' ' + monthNames[monthIndex] + ' ' + year;
    };
    UtilityService.prototype.milisToDateTextEnglish = function (date) {
        var monthNames = [
            'January', 'February', 'March',
            'April', 'May', 'June', 'Jule',
            'August', 'September', 'October',
            'Nopember', 'December'
        ];
        var days = ['Sunday', 'Monday', 'Thursday', 'Wednesday', 'Tuesday', 'Friday', 'Saturday'];
        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();
        var d = new Date(date);
        var dayName = days[d.getDay()];
        var time = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
        return dayName + ', ' + day + ' ' + monthNames[monthIndex] + ' ' + year + ' : ' + time;
    };
    UtilityService.prototype.milisToDateOnly = function (milis) {
        return new Date(milis).toISOString();
    };
    return UtilityService;
}());
UtilityService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], UtilityService);
export { UtilityService };
//# sourceMappingURL=E:/CPPBT 2018/angular-src/src/app/services/utility.service.js.map