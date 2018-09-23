import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {DatatransferService} from "../../services/datatransfer.service";
import {FlashMessagesService} from "angular2-flash-messages";
import {ConstantvariablesService} from "../../services/constantvariables.service";
import {ClinicService} from "../../services/clinic.service";
import {ModalService} from "../../services/modal.service";
import {UtilityService} from "../../services/utility.service";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-clinic',
  templateUrl: './clinic.component.html',
  styleUrls: ['./clinic.component.css']
})
export class ClinicComponent implements OnInit {

  clinicList: Object;
  currentUser : Object;
  page: number; //current page number
  size: number; //number of item per page
  sizeOpt: any;
  maxpage: number; //maximum page of table view
  registerFeedback: Object;

  clinicObj: Object;
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
              private clinicService: ClinicService,
              private modalService: ModalService,
              private utilityService: UtilityService,
              private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.filterState = false;
    this.searchField = this.constantService.getClinicField();
    this.searchFieldSel = 'fullName';
    this.sizeOpt = this.constantService.getPagesOption();
    this.sortType = this.constantService.getSortType();
    this.sortTypeSel = 'ASC';
    this.sortParam = this.constantService.getClinicSortField();
    this.sortParamSel = 'id';
    this.page = 0;
    this.size = 10;
    this.getClinicList();
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
    this.getClinicList();
  }

  searchWithoutFilter() {
    this.filterState = false;
    this.getClinicList();
  }

  onClickNext() {
    if (this.page < (this.maxpage - 1)) {
      this.page++;
      this.getClinicList();
    }
  }

  onClickSelectedPage(input) {
    if (input > 0 && input < (this.maxpage - 1)) {
      this.page = input - 1;
      this.getClinicList();
    }
  }

  onClickPrevious() {
    if (this.page > 0) {
      this.page--;
      this.getClinicList();
    }
  }

  getClinicList() {
    this.startProgress();
    var usersJSON = JSON.parse(localStorage.getItem('user'));
    if (!this.filterState || this.filterValue === undefined || this.filterValue == "") {
      if (usersJSON.roles == 'ROLE_ADMIN') {
        this.clinicService.getClinics(this.page, this.size, this.sortTypeSel, this.sortParamSel).subscribe(data => {
          this.maxpage = Math.ceil(data.totalElements / this.size);
          this.clinicList = data.content;
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
        this.clinicService.getClinicsByClinic(this.page, this.size, this.sortTypeSel, this.sortParamSel).subscribe(data => {
          this.maxpage = Math.ceil(data.totalElements / this.size);
          this.clinicList = data.content;
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
        this.clinicService.getClinicsBySearchField(this.page, this.size, this.sortTypeSel, this.sortParamSel, this.searchFieldSel, this.filterValue).subscribe(data => {
          this.maxpage = Math.ceil(data.totalElements / this.size);
          this.clinicList = data.content;
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
        this.clinicService.getClinicsBySearchFieldByIdClinic(this.page, this.size, this.sortTypeSel, this.sortParamSel, this.searchFieldSel, this.filterValue).subscribe(data => {
          this.maxpage = Math.ceil(data.totalElements / this.size);
          this.clinicList = data.content;
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

  onItemDelete() {
    this.clinicService.deleteClinic(this.clinicObj).subscribe(data => {
      this.registerFeedback = data;
      //console.log(data);
      this.flashMessage.show('Success delete user clinic data !', {cssClass: 'alert-success', timeout: 3000});
      this.getClinicList();
      this.router.navigate(['userClinicData']);
    }, error => {
      //console.log(error.status);
      if(error.status == 401){
        this.flashMessage.show('Your role is unauthorized to delete data !', {cssClass: 'alert-danger', timeout: 3000});
      }
      else{
        this.flashMessage.show('failed update user clinic !', {cssClass: 'alert-danger', timeout: 3000});
      }
      this.getClinicList();
      this.router.navigate(['userClinicData']);
    });
  }

  openModal(id: string, clinic: Object) {
    this.clinicObj= clinic;
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  gotoEditClinic(item: any) {
    this.dataTransferService.setDataTransfer(item);
    this.router.navigate(['userClinicEdit']);
  }

  goToClinicDetail(clinic: Object) {
    this.dataTransferService.setDataTransfer(clinic);
    this.router.navigate(['userClinicDetails']);
  }

  convertDateTime(date: number) {
    return this.utilityService.milisToDateText(new Date(date));
  }

  goToAddClinic(){
    this.router.navigate(['userClinicAdd']);
  }

}
