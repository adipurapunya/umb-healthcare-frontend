import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {DatatransferService} from "../../services/datatransfer.service";
import {FlashMessagesService} from "angular2-flash-messages";
import {ConstantvariablesService} from "../../services/constantvariables.service";
import {DoctorService} from "../../services/doctor.service";
import {ModalService} from "../../services/modal.service";
import {UtilityService} from "../../services/utility.service";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {

  doctorList: Object;
  currentUser : Object;
  page: number; //current page number
  size: number; //number of item per page
  sizeOpt: any;
  maxpage: number; //maximum page of table view
  registerFeedback: Object;

  doctorObj: Object;
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
              private doctorService: DoctorService,
              private modalService: ModalService,
              private utilityService: UtilityService,
              private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.filterState = false;
    this.searchField = this.constantService.getDoctorField();
    this.searchFieldSel = 'fullName';
    this.sizeOpt = this.constantService.getPagesOption();
    this.sortType = this.constantService.getSortType();
    this.sortTypeSel = 'ASC';
    this.sortParam = this.constantService.getDoctorSortField();
    this.sortParamSel = 'id';
    this.page = 0;
    this.size = 10;
    this.getDoctorList();
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
    this.getDoctorList();
  }

  searchWithoutFilter() {
    this.filterState = false;
    this.getDoctorList();
  }

  onClickNext() {
    if (this.page < (this.maxpage - 1)) {
      this.page++;
      this.getDoctorList();
    }
  }

  onClickSelectedPage(input) {
    if (input > 0 && input < (this.maxpage - 1)) {
      this.page = input - 1;
      this.getDoctorList();
    }
  }

  onClickPrevious() {
    if (this.page > 0) {
      this.page--;
      this.getDoctorList();
    }
  }

  getDoctorList() {
    this.startProgress();
    var usersJSON = JSON.parse(localStorage.getItem('user'));
    if (!this.filterState || this.filterValue === undefined || this.filterValue == "") {
      if (usersJSON.roles == 'ROLE_ADMIN') {
        this.doctorService.getDoctors(this.page, this.size, this.sortTypeSel, this.sortParamSel).subscribe(data => {
          this.maxpage = Math.ceil(data.totalElements / this.size);
          this.doctorList = data.content;
          this.stopProgress();
        }, error => {
          if (error.status == 401) {
            this.flashMessage.show('Your role is unauthorized to get data !', {
              cssClass: 'alert-danger',
              timeout: 3000
            });
          }
        });
      }
      else {
        this.doctorService.getDoctorsByClinic(this.page, this.size, this.sortTypeSel, this.sortParamSel).subscribe(data => {
          this.maxpage = Math.ceil(data.totalElements / this.size);
          this.doctorList = data.content;
          this.stopProgress();
        }, error => {
          if (error.status == 401) {
            this.flashMessage.show('Your role is unauthorized to get data !', {
              cssClass: 'alert-danger',
              timeout: 3000
            });
          }
        });
      }

    } else {
      if (usersJSON.roles == 'ROLE_ADMIN') {
        this.doctorService.getDoctorsBySearchField(this.page, this.size, this.sortTypeSel, this.sortParamSel, this.searchFieldSel, this.filterValue).subscribe(data => {
          this.maxpage = Math.ceil(data.totalElements / this.size);
          this.doctorList = data.content;
          this.stopProgress();
        }, error => {
          if (error.status == 401) {
            this.flashMessage.show('Your role is unauthorized to get data !', {
              cssClass: 'alert-danger',
              timeout: 3000
            });
          }
        });
      }
      else {
        this.doctorService.getDoctorsBySearchFieldByIdClinic(this.page, this.size, this.sortTypeSel, this.sortParamSel, this.searchFieldSel, this.filterValue).subscribe(data => {
          this.maxpage = Math.ceil(data.totalElements / this.size);
          this.doctorList = data.content;
          this.stopProgress();
        }, error => {
          if (error.status == 401) {
            this.flashMessage.show('Your role is unauthorized to get data !', {
              cssClass: 'alert-danger',
              timeout: 3000
            });
          }
        });
      }
    }

  }

  onItemDelete() {
    this.doctorService.deleteDoctor(this.doctorObj).subscribe(data => {
      this.registerFeedback = data;
      //console.log(data);
      this.flashMessage.show('Success delete Doctor data !', {cssClass: 'alert-success', timeout: 3000});
      this.getDoctorList();
      this.router.navigate(['doctorData']);
    }, error => {
      //console.log(error.status);
      if(error.status == 401){
        this.flashMessage.show('Your role is unauthorized to delete data !', {cssClass: 'alert-danger', timeout: 3000});
      }
      else{
        this.flashMessage.show('failed update Doctor !', {cssClass: 'alert-danger', timeout: 3000});
      }
      this.getDoctorList();
      this.router.navigate(['doctorData']);
    });
  }

  openModal(id: string, doctor: Object) {
    this.doctorObj= doctor;
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  gotoEditDoctor(item: any) {
    this.dataTransferService.setDataTransfer(item);
    this.router.navigate(['doctorEdit']);
  }

  goToDoctorDetail(doctor: Object) {
    this.dataTransferService.setDataTransfer(doctor);
    this.router.navigate(['doctorDetails']);
  }

  convertDateTime(date: number) {
    return this.utilityService.milisToDateText(new Date(date));
  }

  goToAddDoctor(){
    //this.dataTransferService.setDataTransfer(patient);
    this.router.navigate(['doctorAdd']);
  }

}
