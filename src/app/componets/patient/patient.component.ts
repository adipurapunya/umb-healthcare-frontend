import {Component, OnInit} from '@angular/core';
import {FlashMessagesService} from "angular2-flash-messages";
import {Router} from "@angular/router";
import {DatatransferService} from "../../services/datatransfer.service";
import {ConstantvariablesService} from '../../services/constantvariables.service'
import {PatientService} from "../../services/patient.service";
import {ModalService} from '../../services/modal.service';
import {UtilityService} from '../../services/utility.service';

import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  patientList: Object;
  currentUser : Object;
  page: number; //current page number
  size: number; //number of item per page
  sizeOpt: any;
  maxpage: number; //maximum page of table view
  registerFeedback: Object;

  patientObj: Object;
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
              private patientService: PatientService,
              private modalService: ModalService,
              private utilityService: UtilityService,
              private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.filterState = false;
    this.searchField = this.constantService.getPatientField();
    this.searchFieldSel = 'fullName';
    this.sizeOpt = this.constantService.getPagesOption();
    this.sortType = this.constantService.getSortType();
    this.sortTypeSel = 'ASC';
    this.sortParam = this.constantService.getPatientSortField();
    this.sortParamSel = 'id';
    this.page = 0;
    this.size = 10;
    this.getPatientList();
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
    this.getPatientList();
  }

  searchWithoutFilter() {
    this.filterState = false;
    this.getPatientList();
  }

  onClickNext() {
    if (this.page < (this.maxpage - 1)) {
      this.page++;
      this.getPatientList();
    }
  }

  onClickSelectedPage(input) {
    if (input > 0 && input < (this.maxpage - 1)) {
      this.page = input - 1;
      this.getPatientList();
    }
  }

  onClickPrevious() {
    if (this.page > 0) {
      this.page--;
      this.getPatientList();
    }
  }

  getPatientList() {
    this.startProgress();
    var usersJSON = JSON.parse(localStorage.getItem('user'));
    if (!this.filterState || this.filterValue === undefined || this.filterValue == "") {
      if (usersJSON.roles == 'ROLE_ADMIN') {
        this.patientService.getPatients(this.page, this.size, this.sortTypeSel, this.sortParamSel).subscribe(data => {
          this.maxpage = Math.ceil(data.totalElements / this.size);
          this.patientList = data.content;
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
        this.patientService.getPatientsByClinic(this.page, this.size, this.sortTypeSel, this.sortParamSel).subscribe(data => {
          this.maxpage = Math.ceil(data.totalElements / this.size);
          this.patientList = data.content;
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
        this.patientService.getPatientsBySearchField(this.page, this.size, this.sortTypeSel, this.sortParamSel, this.searchFieldSel, this.filterValue).subscribe(data => {
          this.maxpage = Math.ceil(data.totalElements / this.size);
          this.patientList = data.content;
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
        this.patientService.getPatientsBySearchFieldByIdClinic(this.page, this.size, this.sortTypeSel, this.sortParamSel, this.searchFieldSel, this.filterValue).subscribe(data => {
          this.maxpage = Math.ceil(data.totalElements / this.size);
          this.patientList = data.content;
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
    this.patientService.deletePatient(this.patientObj).subscribe(data => {
      this.registerFeedback = data;
      //console.log(data);
      this.flashMessage.show('Success delete patient data !', {cssClass: 'alert-success', timeout: 3000});
      this.getPatientList();
      this.router.navigate(['patientData']);
    }, error => {
      //console.log(error.status);
      if(error.status == 401){
        this.flashMessage.show('Your role is unauthorized to delete data !', {cssClass: 'alert-danger', timeout: 3000});
      }
      else{
        this.flashMessage.show('failed update patient !', {cssClass: 'alert-danger', timeout: 3000});
      }
      this.getPatientList();
      this.router.navigate(['patientData']);
    });
  }

  openModal(id: string, patient: Object) {
    this.patientObj= patient;
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  gotoEditPatient(item: any) {
    this.dataTransferService.setDataTransfer(item);
    this.router.navigate(['patientEdit']);
  }

  goToPatientDetail(patient: Object) {
    this.dataTransferService.setDataTransfer(patient);
    this.router.navigate(['patientDetails']);
  }

  goToEcgDetail(patient: Object){
    this.dataTransferService.setDataTransfer(patient);
    this.router.navigate(['ecgData']);
  }

  goToAddPatrient(){
    //this.dataTransferService.setDataTransfer(patient);
    this.router.navigate(['patientAdd']);
  }

  convertDateTime(date: number) {
    return this.utilityService.milisToDateText(new Date(date));
  }

}
