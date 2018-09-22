import { Component, OnInit } from '@angular/core';
import {FlashMessagesService} from "angular2-flash-messages";
import {Router} from "@angular/router";
import {DatatransferService} from "../../services/datatransfer.service";
import {ConstantvariablesService} from "../../services/constantvariables.service";
import {TransactionService} from "../../services/transaction.service";

@Component({
  selector: 'app-transaction-edit',
  templateUrl: './transaction-edit.component.html',
  styleUrls: ['./transaction-edit.component.css']
})
export class TransactionEditComponent implements OnInit {

  public trx: any;
  statusTrxsel: String;
  statusTrxList: any;

  paymentTrxsel: String;
  paymentTrxList: any;

  currentUser : Object;

  constructor(private datatransferService: DatatransferService,
              private router: Router,
              private flashMessage: FlashMessagesService,
              private constantServ: ConstantvariablesService,
              private trxSvc: TransactionService) { }

  ngOnInit() {
    this.trx = this.datatransferService.getDataTransfer();
    let time = new Date(this.trx.dateTreatementStart);
    this.trx.dateTreatementStart = formatDateDatabase(time);

    this.statusTrxsel = this.trx.transactionStatusId.id;
    this.statusTrxList = this.constantServ.getTransactionStatusList();

    this.paymentTrxsel = this.trx.paymentFixedPriceStatusId.id;
    this.paymentTrxList = this.constantServ.getTransactionStatusPaymentList();

    function formatDateDatabase(date) {

      var day = date.getDate();
      var monthIndex = date.getMonth() + 1;
      var year = date.getFullYear();

      if(day <10 ){
        day = "0" + date.getDate();
      }
      if(monthIndex<10){
        monthIndex = "0" + (date.getMonth() + 1);
      }

      return   year+ '-' + monthIndex + '-' + day;
    }

    this.currentUser = this.getCurrentUser();
  }

  onEditSubmit() {

    let updateItem = {
      'transactionStatusId' : {
        'id' : this.statusTrxsel
      },
      'paymentFixedPriceStatusId' : {
        'id' : this.paymentTrxsel
      },
      'predictionPrice' : this.trx.predictionPrice,
      'fixedPrice' : this.trx.fixedPrice,
      'diagnosis' : this.trx.diagnosis,
      'medicine' : this.trx.medicine,
      'nurseAction' : this.trx.nurseAction
    };

    this.trxSvc.editTransaction(updateItem, this.trx.id).subscribe(data => {

      this.flashMessage.show('Transaction data has been successful updated !', {cssClass: 'alert-success', timeout: 3000});
      this.router.navigate(['transaction']);
    }, error => {
      if(error.status == 401){
        this.flashMessage.show('Your role is unauthorized to delete data !', {cssClass: 'alert-danger', timeout: 3000});
      }
      else{
        this.flashMessage.show('failed update transaction data !', {cssClass: 'alert-danger', timeout: 3000});
      }
    });

  }

  goBackMenu(){
    this.router.navigate(['transaction']);
  }

  getCurrentUser(){
    let usersJSON = JSON.parse(localStorage.getItem('user'));
    return usersJSON;
  }

}
