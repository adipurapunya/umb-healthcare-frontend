import { Component, OnInit } from '@angular/core';
import {FlashMessagesService} from "angular2-flash-messages";
import {Router} from "@angular/router";
import {DatatransferService} from "../../services/datatransfer.service";
import {ServicesService} from "../../services/services.service";
import {ConstantvariablesService} from "../../services/constantvariables.service";

@Component({
  selector: 'app-services-edit',
  templateUrl: './services-edit.component.html',
  styleUrls: ['./services-edit.component.css']
})
export class ServicesEditComponent implements OnInit {

  public service: any;

  statusSel: String;
  statusList: any;

  currentUser : Object;

  constructor(private datatransferService: DatatransferService,
              private router: Router,
              private flashMessage: FlashMessagesService,
              private servicesService: ServicesService,
              private constantServ: ConstantvariablesService) { }

  ngOnInit() {
    this.service = this.datatransferService.getDataTransfer();
    this.currentUser = this.getCurrentUser();
    this.statusList = this.constantServ.getStatusServiceList();
    this.statusSel = this.service.statusActive;
  }

  goBackMenu(){
    this.router.navigate(['services']);
  }

  getCurrentUser(){
    let usersJSON = JSON.parse(localStorage.getItem('user'));
    return usersJSON;
  }

  onEditSubmit() {
    let updateItem = {
      'nameOfservices': this.service.nameOfservices,
      'codeOfservices': this.service.codeOfservices,
      'price': this.service.price,
      'statusActive': this.statusSel
    };

    this.servicesService.editService(updateItem, this.service.id).subscribe(data => {
      this.flashMessage.show('service has been successful updated !', {cssClass: 'alert-success', timeout: 3000});
      this.router.navigate(['services']);
    }, error => {
      if(error.status == 401){
        this.flashMessage.show('Your role is unauthorized to delete data !', {cssClass: 'alert-danger', timeout: 3000});
      }
      else{
        console.log('code '+error.status);
        this.flashMessage.show('failed update services !', {cssClass: 'alert-danger', timeout: 3000});
      }
    });
  }

}
