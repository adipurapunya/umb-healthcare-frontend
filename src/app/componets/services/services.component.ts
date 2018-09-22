import {Component, OnInit} from '@angular/core';
import {FlashMessagesService} from "angular2-flash-messages";
import {Router} from "@angular/router";
import {DatatransferService} from "../../services/datatransfer.service";
import {ConstantvariablesService} from '../../services/constantvariables.service'
import {ServicesService} from "../../services/services.service";
import {ModalService} from '../../services/modal.service';
import {UtilityService} from '../../services/utility.service';

import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

  servicestList: Object;
  servicestListAdmin: Object;
  currentUser : any;
  registerFeedback: Object;

  page: number; //current page number
  size: number; //number of item per page
  sizeOpt: any;
  maxpage: number; //maximum page of table view

  searchField: any;
  searchFieldSel: string;
  filterState: boolean;
  filterValue: string;
  sortType: any;
  sortTypeSel: string;
  sortParam: any;
  sortParamSel: string;

  serviceObj: Object;

  constructor(private router: Router,
              private dataTransferService: DatatransferService,
              private flashMessage: FlashMessagesService,
              private constantService: ConstantvariablesService,
              private servicesService: ServicesService,
              private modalService: ModalService,
              private utilityService: UtilityService,
              private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.filterState = false;
    this.searchField = this.constantService.getServicesField();
    this.searchFieldSel = 'nameOfservices';
    this.sizeOpt = this.constantService.getPagesOption();
    this.sortType = this.constantService.getSortType();
    this.sortTypeSel = 'ASC';
    this.sortParam = this.constantService.getServicesSortField();
    this.sortParamSel = 'id';
    this.page = 0;
    this.size = 10;
    this.getServicesList();
    this.currentUser = this.getCurrentUser();
  }

  goToEditService(item: any){
    this.dataTransferService.setDataTransfer(item);
    this.router.navigate(['serviceEdit']);
  }

  goToAddService(){
    this.router.navigate(['serviceAdd']);
  }

  startProgress(){
    this.spinner.show();
  }

  stopProgress(){
    this.spinner.hide();
  }

  searchWithFilter() {
    this.filterState = true;
    this.getServicesList();
  }

  searchWithoutFilter() {
    this.filterState = false;
    this.getServicesList();
  }

  onClickNext() {
    if (this.page < (this.maxpage - 1)) {
      this.page++;
      this.getServicesList();
    }
  }

  onClickSelectedPage(input) {
    if (input > 0 && input < (this.maxpage - 1)) {
      this.page = input - 1;
      this.getServicesList();
    }
  }

  onClickPrevious() {
    if (this.page > 0) {
      this.page--;
      this.getServicesList();
    }
  }

  getCurrentUser(){
    let usersJSON = JSON.parse(localStorage.getItem('user'));
    return usersJSON;
  }

  openModal(id: string, service: Object) {
    this.serviceObj = service;
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
  onItemDelete(){
    this.servicesService.deleteService(this.serviceObj).subscribe(data => {
      this.registerFeedback = data;
      //console.log(data);
      this.flashMessage.show('Success delete service data !', {cssClass: 'alert-success', timeout: 3000});
      this.getServicesList();
      this.router.navigate(['services']);
    }, error => {
      //console.log(error.status);
      if(error.status == 401){
        this.flashMessage.show('Your role is unauthorized to delete data !', {cssClass: 'alert-danger', timeout: 3000});
      }
      else{
        this.flashMessage.show('failed delete service !', {cssClass: 'alert-danger', timeout: 3000});
      }
      this.getServicesList();
      this.router.navigate(['services']);
    });
  }

  getServicesList(){
    this.startProgress();
    var usersJSON = JSON.parse(localStorage.getItem('user'));
    if (!this.filterState || this.filterValue === undefined || this.filterValue == "") {
      if (usersJSON.roles == 'ROLE_ADMIN') {
        this.servicesService.getAllServicesWithPagination(this.page, this.size, this.sortTypeSel, this.sortParamSel).subscribe(data => {
          this.maxpage = Math.ceil(data.totalElements / this.size);
          this.servicestListAdmin = data.content;
          this.stopProgress();
        }, error => {
          if (error.status == 401) {
            this.flashMessage.show('Your role is unauthorized to see data !', {
              cssClass: 'alert-danger',
              timeout: 3000
            });
          }
        });
      }else{
        this.servicesService.getAllServicesWithPaginationByIdClinic(this.page, this.size, this.sortTypeSel, this.sortParamSel).subscribe(data => {
          this.maxpage = Math.ceil(data.totalElements / this.size);
          this.servicestList = data.content;
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
    else{
      if (usersJSON.roles == 'ROLE_ADMIN') {
        this.servicesService.getAllServicesWithPaginationBySearchField(this.page, this.size, this.sortTypeSel, this.sortParamSel, this.searchFieldSel, this.filterValue).subscribe(data => {
          this.maxpage = Math.ceil(data.totalElements / this.size);
          this.servicestListAdmin = data.content;
          this.stopProgress();
        }, error => {
          if (error.status == 401) {
            this.flashMessage.show('Your role is unauthorized to see data !', {
              cssClass: 'alert-danger',
              timeout: 3000
            });
          }
        });
      }else{
        this.servicesService.getAllServicesWithPaginationBySearchFieldByIdClinic(this.page, this.size, this.sortTypeSel, this.sortParamSel, this.searchFieldSel, this.filterValue).subscribe(data => {
          this.maxpage = Math.ceil(data.totalElements / this.size);
          this.servicestList = data.content;
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

  convertToRupiah(val:number){
    return this.utilityService.convertNumberToRupiah(val);
  }

}
