import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {DatatransferService} from "../../services/datatransfer.service";
import {FlashMessagesService} from "angular2-flash-messages";
import {ConstantvariablesService} from "../../services/constantvariables.service";
import {NurseService} from "../../services/nurse.service";
import {ModalService} from "../../services/modal.service";
import {UtilityService} from "../../services/utility.service";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-nurse',
  templateUrl: './nurse.component.html',
  styleUrls: ['./nurse.component.css']
})
export class NurseComponent implements OnInit {

  nurseList: Object;
  currentUser : Object;
  page: number; //current page number
  size: number; //number of item per page
  sizeOpt: any;
  maxpage: number; //maximum page of table view
  registerFeedback: Object;

  nurseObj: Object;
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
              private nurseService: NurseService,
              private modalService: ModalService,
              private utilityService: UtilityService,
              private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.filterState = false;
    this.searchField = this.constantService.getNurseField();
    this.searchFieldSel = 'fullName';
    this.sizeOpt = this.constantService.getPagesOption();
    this.sortType = this.constantService.getSortType();
    this.sortTypeSel = 'ASC';
    this.sortParam = this.constantService.getNurseSortField();
    this.sortParamSel = 'id';
    this.page = 0;
    this.size = 10;
    this.getNurseList();
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
    this.getNurseList();
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

  getNurseList() {
    this.startProgress();
    var usersJSON = JSON.parse(localStorage.getItem('user'));
    if (!this.filterState || this.filterValue === undefined || this.filterValue == "") {
      if (usersJSON.roles == 'ROLE_ADMIN') {
        this.nurseService.getNurses(this.page, this.size, this.sortTypeSel, this.sortParamSel).subscribe(data => {
          this.maxpage = Math.ceil(data.totalElements / this.size);
          this.nurseList = data.content;
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
          this.nurseList = data.content;
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
          this.nurseList = data.content;
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
          this.nurseList = data.content;
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

  onItemDelete() {
    this.nurseService.deleteNurse(this.nurseObj).subscribe(data => {
      this.registerFeedback = data;
      //console.log(data);
      this.flashMessage.show('Success delete nurse data !', {cssClass: 'alert-success', timeout: 3000});
      this.getNurseList();
      this.router.navigate(['nurseData']);
    }, error => {
      //console.log(error.status);
      if(error.status == 401){
        this.flashMessage.show('Your role is unauthorized to delete data !', {cssClass: 'alert-danger', timeout: 3000});
      }
      else{
        this.flashMessage.show('failed update nurse !', {cssClass: 'alert-danger', timeout: 3000});
      }
      this.getNurseList();
      this.router.navigate(['nurseData']);
    });
  }

  openModal(id: string, nurse: Object) {
    this.nurseObj= nurse;
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  gotoEditNurse(item: any) {
    this.dataTransferService.setDataTransfer(item);
    this.router.navigate(['nurseEdit']);
  }

  goToNurseDetail(nurse: Object) {
    this.dataTransferService.setDataTransfer(nurse);
    this.router.navigate(['nurseDetails']);
  }

  convertDateTime(date: number) {
    return this.utilityService.milisToDateText(new Date(date));
  }

  goToAddNurse(){
    //this.dataTransferService.setDataTransfer(patient);
    this.router.navigate(['nurseAdd']);
  }

}
