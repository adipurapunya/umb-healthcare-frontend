import { Component, OnInit } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

import {FlashMessagesService} from "angular2-flash-messages";
import {Router} from "@angular/router";
import {DatatransferService} from "../../services/datatransfer.service";
import {ConstantvariablesService} from '../../services/constantvariables.service'
import {TransactionService} from "../../services/transaction.service";
import {ModalService} from '../../services/modal.service';
import {UtilityService} from '../../services/utility.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  private stompClient;
  private connected: boolean = false;
  private serverUrl = 'http://localhost:40510';
  private title = 'WebSockets chat';

  trxList: Object;
  currentUser : Object;
  page: number; //current page number
  size: number; //number of item per page
  sizeOpt: any;
  maxpage: number; //maximum page of table view
  registerFeedback: Object;

  trxObj: Object;
  dist: boolean;

  searchField: any;
  searchFieldSel: string;
  filterState: boolean;
  filterValue: string;
  sortType: any;
  sortTypeSel: string;
  sortParam: any;
  sortParamSel: string;

  constructor(private router: Router,
              private dataTransferService: DatatransferService,
              private flashMessage: FlashMessagesService,
              private constantService: ConstantvariablesService,
              private transactionService: TransactionService,
              private modalService: ModalService,
              private utilityService: UtilityService,
              private spinner: NgxSpinnerService) { }

  ngOnInit() {
    //this.connectWebSocket();
    this.filterState = false;
    this.searchField = this.constantService.getTrxField();
    this.searchFieldSel = 'orderNumber';
    this.sizeOpt = this.constantService.getPagesOption();
    this.sortType = this.constantService.getSortType();
    this.sortTypeSel = 'ASC';
    this.sortParam = this.constantService.getTrxSortField();
    this.sortParamSel = 'id';
    this.page = 0;
    this.size = 5;
    this.getTransactionList();
    this.dist = false;
    this.currentUser = this.getCurrentUser();
  }

  startProgress(){
    this.spinner.show();
  }

  stopProgress(){
    this.spinner.hide();
  }

  getCurrentUser(){
    let usersJSON = JSON.parse(localStorage.getItem('user'));
    return usersJSON;
  }

  searchWithFilter() {
    this.filterState = true;
    this.getTransactionList();
  }

  searchWithoutFilter() {
    this.filterState = false;
    this.getTransactionList();
  }

  onClickNext() {
    if (this.page < (this.maxpage - 1)) {
      this.page++;
      this.getTransactionList();
    }
  }

  onClickSelectedPage(input) {
    if (input > 0 && input < (this.maxpage - 1)) {
      this.page = input - 1;
      this.getTransactionList();
    }
  }

  onClickPrevious() {
    if (this.page > 0) {
      this.page--;
      this.getTransactionList();
    }
  }

  openModal(id: string, trx: Object) {
    this.trxObj= trx;
    this.modalService.open(id);
  }

  onItemDelete() {
    this.transactionService.deleteTransaction(this.trxObj).subscribe(data => {
      this.registerFeedback = data;
      //console.log(data);
      this.flashMessage.show('Success delete transaction data !', {cssClass: 'alert-success', timeout: 3000});
      this.getTransactionList();
      this.router.navigate(['transaction']);
    }, error => {
      //console.log(error.status);
      if(error.status == 401){
        this.flashMessage.show('Your role is unauthorized to delete data transaction !', {cssClass: 'alert-danger', timeout: 3000});
      }
      else{
        this.flashMessage.show('failed delete transaction !', {cssClass: 'alert-danger', timeout: 3000});
      }
      this.getTransactionList();
      this.router.navigate(['transaction']);
    });
  }

  connectWebSocket() {
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({}, function (frame) {
      this.connected = true;
      that.stompClient.subscribe('/**', (message) => {
        if (message.body) {
          //let msj = JSON.parse(message.body);
          console.log('BODY ', message.toString());
          //that.addNotification('Pemesanan Jasa Perawat', msj);
        }
      });
    });
  }

  convertDateTime(val:number){
    return this.utilityService.milisToDateText(new Date(val));
  }

  getTransactionList() {
    this.startProgress();
    var usersJSON = JSON.parse(localStorage.getItem('user'));
    if (!this.filterState || this.filterValue === undefined || this.filterValue == "") {
      if (usersJSON.roles == 'ROLE_ADMIN') {
        this.transactionService.getAllTransactionWithPagination(this.page, this.size, this.sortTypeSel, this.sortParamSel).subscribe(data => {
          this.maxpage = Math.ceil(data.totalElements / this.size);
          this.trxList = data.content;
          this.stopProgress();
        }, error => {
          if (error.status == 401) {
            this.flashMessage.show('Your role is unauthorized to see data !', {
              cssClass: 'alert-danger',
              timeout: 3000
            });
          }
        });
      }
      else if(usersJSON.roles == 'ROLE_PATIENT'){
        this.transactionService.getAllTransactionWithPaginationByIdPatient(this.page, this.size, this.sortTypeSel, this.sortParamSel).subscribe(data => {
          this.maxpage = Math.ceil(data.totalElements / this.size);
          this.trxList = data.content;
          this.stopProgress();
        }, error => {
          if (error.status == 401) {
            this.flashMessage.show('Your role is unauthorized to see data !', {
              cssClass: 'alert-danger',
              timeout: 3000
            });
          }
        });
      }
      else {
        this.transactionService.getAllTransactionWithPaginationByIdClinic(this.page, this.size, this.sortTypeSel, this.sortParamSel).subscribe(data => {
          this.maxpage = Math.ceil(data.totalElements / this.size);
          this.trxList = data.content;
          this.stopProgress();
        }, error => {
          if (error.status == 401) {
            this.flashMessage.show('Your role is unauthorized to see data !', {
              cssClass: 'alert-danger',
              timeout: 3000
            });
          }
        });
      }

    } else {
      if (usersJSON.roles == 'ROLE_ADMIN') {
        this.transactionService.getAllTransactionWithPaginationBySearchField(this.page, this.size, this.sortTypeSel, this.sortParamSel, this.searchFieldSel, this.filterValue).subscribe(data => {
          this.maxpage = Math.ceil(data.totalElements / this.size);
          this.trxList = data.content;
          this.stopProgress();
        }, error => {
          if (error.status == 401) {
            this.flashMessage.show('Your role is unauthorized to see data !', {
              cssClass: 'alert-danger',
              timeout: 3000
            });
          }
        });
      }
      else if(usersJSON.roles == 'ROLE_PATIENT'){
        this.transactionService.getAllTransactionWithPaginationBySearchFieldByIdPatient(this.page, this.size, this.sortTypeSel, this.sortParamSel, this.searchFieldSel, this.filterValue).subscribe(data => {
          this.maxpage = Math.ceil(data.totalElements / this.size);
          this.trxList = data.content;
          this.stopProgress();
        }, error => {
          if (error.status == 401) {
            this.flashMessage.show('Your role is unauthorized to see data !', {
              cssClass: 'alert-danger',
              timeout: 3000
            });
          }
        });
      }
      else {
        this.transactionService.getAllTransactionWithPaginationBySearchFieldByIdClinic(this.page, this.size, this.sortTypeSel, this.sortParamSel, this.searchFieldSel, this.filterValue).subscribe(data => {
          this.maxpage = Math.ceil(data.totalElements / this.size);
          this.trxList = data.content;
          this.stopProgress();
        }, error => {
          if (error.status == 401) {
            this.flashMessage.show('Your role is unauthorized to see data !', {
              cssClass: 'alert-danger',
              timeout: 3000
            });
          }
        });
      }
    }
  }

  gotoEditTrx(item: any) {
    this.dataTransferService.setDataTransfer(item);
    this.router.navigate(['trxEdit']);
  }

  goToTrxDetail(trx: Object) {
    this.dataTransferService.setDataTransfer(trx);
    this.router.navigate(['trxDetail']);
  }

  goToAssign(trx: Object){
    this.dataTransferService.setDataTransfer(trx);
    this.router.navigate(['trxAssign']);
  }

}
