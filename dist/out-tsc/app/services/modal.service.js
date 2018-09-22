import * as _ from "underscore";
var ModalService = (function () {
    function ModalService() {
        this.modals = [];
    }
    ModalService.prototype.add = function (modal) {
        // add modal to array of active modals
        this.modals.push(modal);
    };
    ModalService.prototype.remove = function (id) {
        // remove modal from array of active modals
        var modalToRemove = _.findWhere(this.modals, { id: id });
        this.modals = _.without(this.modals, modalToRemove);
    };
    ModalService.prototype.open = function (id) {
        // open modal specified by id
        var modal = _.findWhere(this.modals, { id: id });
        modal.open();
    };
    ModalService.prototype.close = function (id) {
        // close modal specified by id
        var modal = _.find(this.modals, { id: id });
        modal.close();
    };
    return ModalService;
}());
export { ModalService };
//# sourceMappingURL=E:/CPPBT 2018/angular-src/src/app/services/modal.service.js.map