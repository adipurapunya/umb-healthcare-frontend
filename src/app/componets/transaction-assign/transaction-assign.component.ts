import {Component, OnInit} from '@angular/core';
import {DatatransferService} from '../../services/datatransfer.service';
import {Router} from '@angular/router';
import {UtilityService} from '../../services/utility.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {ConstantvariablesService} from "../../services/constantvariables.service";
import {NurseService} from "../../services/nurse.service";
import {DoctorService} from "../../services/doctor.service";
import {NgxSpinnerService} from "ngx-spinner";
import {TransactionService} from "../../services/transaction.service";
import swal,{ SweetAlertOptions } from 'sweetalert2';
import {ModalService} from '../../services/modal.service';

@Component({
  selector: 'app-transaction-assign',
  templateUrl: './transaction-assign.component.html',
  styleUrls: ['./transaction-assign.component.css']
})
export class TransactionAssignComponent implements OnInit {

  orderObject: Object;
  detailNurseObject: Object;
  detailDoctorObject: Object;

  currentUser : Object;

  nurseList: any[];
  nurseSelectedObject: Object;

  doctorList: any[];
  doctorSelectedObject: Object;

  maxpage: number; //maximum page of table view

  page: number; //current page number
  size: number; //number of item per page
  sizeOpt: any;

  filterState: boolean;
  filterValue: string;
  filterValueDoctor: string;

  searchField: any;
  searchFieldSel: string;

  searchFieldDoctor: any;
  searchFieldSelDoctor: string;

  sortType: any;
  sortTypeSel: string;

  sortParam: any;
  sortParamSel: string;

  sortParamDoctor: any;
  sortParamSelDoctor: string;

  changing: boolean;

  constructor(private router: Router,
              private dataTransferService: DatatransferService,
              private flashMessage: FlashMessagesService,
              private utilityService: UtilityService,
              private constantService: ConstantvariablesService,
              private nurseService: NurseService,
              private doctorService: DoctorService,
              private spinner: NgxSpinnerService,
              private transactionService: TransactionService,
              private modalService: ModalService) { }

  ngOnInit() {
    this.orderObject = this.dataTransferService.getDataTransfer();
    this.searchField = this.constantService.getNurseField();
    this.searchFieldDoctor = this.constantService.getDoctorField();
    this.sizeOpt = this.constantService.getPagesOption();
    this.sortType = this.constantService.getSortType();
    this.sortTypeSel = 'ASC';
    this.sortParam = this.constantService.getNurseSortField();
    this.sortParamSel = 'id';
    this.sortParamDoctor = this.constantService.getDoctorSortField();
    this.sortParamSelDoctor = 'id';
    this.page = 0;
    this.size = 10;
    this.searchFieldSel = 'fullName';
    this.searchFieldSelDoctor = 'fullName';
    this.currentUser = this.getCurrentUser();
    this.getSelectedNurse();
    this.getSelectedDoctor();
  }

  showAlert(type: any, title: any, text: any, time:any, confrimButton: boolean){
    let alerts = swal({
      type: type,
      title: title,
      text: text,
      showCloseButton: true,
      timer: time,
      allowOutsideClick: false,
      confirmButtonColor: "#78c2ad",
      showConfirmButton: confrimButton
    });
  }

  getCurrentUser(){
    let usersJSON = JSON.parse(localStorage.getItem('user'));
    return usersJSON;
  }

  startProgress(){
    this.spinner.show();
  }

  stopProgress(){
    this.spinner.hide();
  }

  openModalDetailNurse(id: string, trx: any) {
    this.goToDetailNurse(trx);
    this.modalService.open(id);
  }

  openModalDetailDoctor(id: string, trx: any) {
    this.goToDetailDoctor(trx);
    this.modalService.open(id);
  }

  goBackMenu(){
    this.router.navigate(['transaction']);
  }

  searchWithFilter() {
    this.filterState = true;
    this.getNurseList();
  }

  searchWithFilterDoctor() {
    this.filterState = true;
    this.getDoctorList();
  }

  searchWithoutFilter() {
    this.filterState = false;
    this.getNurseList();
  }

  onClickNext() {
    if (this.page < (this.maxpage - 1)) {
      this.page++;
      this.getNurseList();
    }
  }

  onClickSelectedPage(input) {
    if (input > 0 && input < (this.maxpage - 1)) {
      this.page = input - 1;
      this.getNurseList();
    }
  }

  onClickPrevious() {
    if (this.page > 0) {
      this.page--;
      this.getNurseList();
    }
  }

  convertDateTime(val:number){
    return this.utilityService.milisToDateText(new Date(val));
  }

  goToDetailNurse(obj: object){
    this.detailNurseObject = obj;
  }

  goToDetailDoctor(obj: object){
    this.detailDoctorObject = obj;
  }

  getNurseList() {
    let that = this;
    this.nurseList = new Array();

    this.startProgress();
    var usersJSON = JSON.parse(localStorage.getItem('user'));
    if (!this.filterState || this.filterValue === undefined || this.filterValue == "") {
      if (usersJSON.roles == 'ROLE_ADMIN') {
        this.nurseService.getNurses(this.page, this.size, this.sortTypeSel, this.sortParamSel).subscribe(data => {
          this.maxpage = Math.ceil(data.totalElements / this.size);
          for(var i = 0; i < data.content.length; i++ ){
            data.content[i].readysubmit = false ;
            this.nurseList[i] = data.content[i];
          }
          this.stopProgress();
        }, error => {
          if (error.status == 401) {
            this.flashMessage.show('Your role is unauthorized to delete data !', {
              cssClass: 'alert-danger',
              timeout: 3000
            });
          }
        });
      }
      else {
        this.nurseService.getNursesByClinic(this.page, this.size, this.sortTypeSel, this.sortParamSel).subscribe(data => {
          this.maxpage = Math.ceil(data.totalElements / this.size);
          for(var i = 0; i < data.content.length; i++ ){
            data.content[i].readysubmit = false ;
            this.nurseList[i] = data.content[i];
          }
          this.stopProgress();
        }, error => {
          if (error.status == 401) {
            this.flashMessage.show('Your role is unauthorized to delete data !', {
              cssClass: 'alert-danger',
              timeout: 3000
            });
          }
        });
      }

    } else {
      if (usersJSON.roles == 'ROLE_ADMIN') {
        this.nurseService.getNursesBySearchField(this.page, this.size, this.sortTypeSel, this.sortParamSel, this.searchFieldSel, this.filterValue).subscribe(data => {
          this.maxpage = Math.ceil(data.totalElements / this.size);
          for(var i = 0; i < data.content.length; i++ ){
            data.content[i].readysubmit = false ;
            this.nurseList[i] = data.content[i];
          }
          this.stopProgress();
        }, error => {
          if (error.status == 401) {
            this.flashMessage.show('Your role is unauthorized to delete data !', {
              cssClass: 'alert-danger',
              timeout: 3000
            });
          }
        });
      }
      else {
        this.nurseService.getNursesBySearchFieldByIdClinic(this.page, this.size, this.sortTypeSel, this.sortParamSel, this.searchFieldSel, this.filterValue).subscribe(data => {
          this.maxpage = Math.ceil(data.totalElements / this.size);
          for(var i = 0; i < data.content.length; i++ ){
            data.content[i].readysubmit = false ;
            this.nurseList[i] = data.content[i];
          }
          this.stopProgress();
        }, error => {
          if (error.status == 401) {
            this.flashMessage.show('Your role is unauthorized to delete data !', {
              cssClass: 'alert-danger',
              timeout: 3000
            });
          }
        });
      }
    }
  }

  getDoctorList() {
    let that = this;
    this.doctorList = new Array();

    this.startProgress();
    var usersJSON = JSON.parse(localStorage.getItem('user'));
    if (!this.filterState || this.filterValueDoctor === undefined || this.filterValueDoctor == "") {
      if (usersJSON.roles == 'ROLE_ADMIN') {
        this.doctorService.getDoctors(this.page, this.size, this.sortTypeSel, this.sortParamSelDoctor).subscribe(data => {
          this.maxpage = Math.ceil(data.totalElements / this.size);
          for(var i = 0; i < data.content.length; i++ ){
            data.content[i].readysubmit = false ;
            this.doctorList[i] = data.content[i];
          }
          this.stopProgress();
        }, error => {
          if (error.status == 401) {
            this.flashMessage.show('Your role is unauthorized to delete data !', {
              cssClass: 'alert-danger',
              timeout: 3000
            });
          }
        });
      }
      else {
        this.doctorService.getDoctorsByClinic(this.page, this.size, this.sortTypeSel, this.sortParamSelDoctor).subscribe(data => {
          this.maxpage = Math.ceil(data.totalElements / this.size);
          for(var i = 0; i < data.content.length; i++ ){
            data.content[i].readysubmit = false ;
            this.doctorList[i] = data.content[i];
          }
          this.stopProgress();
        }, error => {
          if (error.status == 401) {
            this.flashMessage.show('Your role is unauthorized to delete data !', {
              cssClass: 'alert-danger',
              timeout: 3000
            });
          }
        });
      }

    } else {
      if (usersJSON.roles == 'ROLE_ADMIN') {
        this.doctorService.getDoctorsBySearchField(this.page, this.size, this.sortTypeSel, this.sortParamSelDoctor, this.searchFieldSelDoctor, this.filterValueDoctor).subscribe(data => {
          this.maxpage = Math.ceil(data.totalElements / this.size);
          for(var i = 0; i < data.content.length; i++ ){
            data.content[i].readysubmit = false ;
            this.doctorList[i] = data.content[i];
          }
          this.stopProgress();
        }, error => {
          if (error.status == 401) {
            this.flashMessage.show('Your role is unauthorized to delete data !', {
              cssClass: 'alert-danger',
              timeout: 3000
            });
          }
        });
      }
      else {
        this.doctorService.getDoctorsBySearchFieldByIdClinic(this.page, this.size, this.sortTypeSel, this.sortParamSelDoctor, this.searchFieldSelDoctor, this.filterValue).subscribe(data => {
          this.maxpage = Math.ceil(data.totalElements / this.size);
          for(var i = 0; i < data.content.length; i++ ){
            data.content[i].readysubmit = false ;
            this.doctorList[i] = data.content[i];
          }
          this.stopProgress();
        }, error => {
          if (error.status == 401) {
            this.flashMessage.show('Your role is unauthorized to delete data !', {
              cssClass: 'alert-danger',
              timeout: 3000
            });
          }
        });
      }
    }
  }

  onModelChanged() {
    this.changing = true;
    console.log('model changed');
  }

  onSubmitNurseItem(item: Object) {
    let that = this;
    //console.log(item['id']+ ' ' +item['readysubmit']+' '+that.orderObject['id']);
    if(item['readysubmit']){
      var uploadItem = {
        "idNurse" : item['id'],
        "idTransaction" : {
          "id" : that.orderObject['id']
        },
        "acceptanceStatus" : false,
        "rateStatus" : false
      }
      this.startProgress();
      this.transactionService.assignNurseToTrx(uploadItem).subscribe(data => {
        this.getSelectedNurse();
        this.stopProgress();
      }, error => {
        //console.log(error);
        if(error.status==401){
          this.showAlert('error','Failed insert data !','Your role is unauthorized',2000,true);
        }else if(error.status==403){
          this.showAlert('error','Failed insert data !','These Nurse has been selected before to this transaction',3000,true);
        }

      });
    }
  }

  onSubmitDoctorItem(item: Object) {
    let that = this;
    //console.log(item['id']+ ' ' +item['readysubmit']+' '+that.orderObject['id']);
    if(item['readysubmit']){
      var uploadItem = {
        "idDoctor" : item['id'],
        "idTransaction" : {
          "id" : that.orderObject['id']
        },
        "acceptanceStatus" : false,
        "rateStatus" : false
      }
      this.startProgress();
      this.transactionService.assignDoctorToTrx(uploadItem).subscribe(data => {
        this.getSelectedDoctor();
        this.stopProgress();
      }, error => {
        //console.log(error);
        if(error.status==401){
          this.showAlert('error','Failed insert data !','Your role is unauthorized',2000,true);
        }else if(error.status==403){
          this.showAlert('error','Failed insert data !','These Doctor has been selected before to this transaction',3000,true);
        }
      });
    }
  }

  deleteAssignedNurse(item: any){
    this.transactionService.deleteSelectedNurse(item.idTransaction.id, item.id).subscribe(data => {
      //console.log(data.content);
      this.nurseSelectedObject = data.content;
    }, error => {
      //console.log(error.status);
      if(error.status==403){
        this.showAlert('error','Failed delete data !','Your role is unauthorized',2000,true);
      }
    });
    //this.nurseList = new Array();
  }

  deleteAssignedDoctor(item: any){
    this.transactionService.deleteSelectedDoctor(item.idTransaction.id, item.id).subscribe(data => {
      //console.log(data.content);
      this.doctorSelectedObject = data.content;
    }, error => {
      //console.log(error.status);
      if(error.status==403){
        this.showAlert('error','Failed delete data !','Your role is unauthorized',2000,true);
      }
    });
    //this.nurseList = new Array();
  }

  getSelectedNurse(){
    this.transactionService.getSelectedNurse(this.orderObject['id']).subscribe(data => {
      //console.log(data.content);
      this.nurseSelectedObject = data.content;
    }, error => {
      console.log(error);
    });
  }

  getSelectedDoctor(){
    this.transactionService.getSelectedDoctor(this.orderObject['id']).subscribe(data => {
      //console.log(data.content);
      this.doctorSelectedObject = data.content;
    }, error => {
      console.log(error);
    });
  }

  clearForm(){
    this.nurseList = new Array();
  }

  clearFormDoctor(){
    this.doctorList = new Array();
  }

}
