import { Component, OnInit } from '@angular/core';
import {FlashMessagesService} from "angular2-flash-messages";
import {Router} from "@angular/router";
import {ServicesService} from "../../services/services.service";
import swal,{ SweetAlertOptions } from 'sweetalert2';

@Component({
  selector: 'app-services-add',
  templateUrl: './services-add.component.html',
  styleUrls: ['./services-add.component.css']
})
export class ServicesAddComponent implements OnInit {

  nameOfservices : String;
  codeOfservices : String;
  price : number;

  constructor(private router: Router,
              private flashMessage: FlashMessagesService,
              private servicesService: ServicesService) { }

  ngOnInit() {
  }

  onAddSubmit(){

    var usersJSON = JSON.parse(localStorage.getItem('user'));
    let idClinic = usersJSON.clinic.id

    let data = {
      'clinic': {
        "id" : idClinic
      },
      'services' : {
        'id' : null,
        'nameOfservices': this.nameOfservices,
        'codeOfservices': this.codeOfservices,
        'price': this.price,
        'statusActive' : true
      }
    }

    this.servicesService.addService(data).subscribe(data => {

      this.flashMessage.show('Service has been successfully added !', {cssClass: 'alert-success', timeout: 3000});
      this.showAlert('success','Service has been successfully added !','You will be redirect to list of Services ',2500,true);
      this.router.navigate(['services']);
    }, error => {
      if(error.status == 401){
        this.flashMessage.show('Your role is unauthorized to add Service data !', {cssClass: 'alert-danger', timeout: 3000});
      }
      else{
        this.flashMessage.show('failed add Service !', {cssClass: 'alert-danger', timeout: 3000});
      }
    });

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
  goBackMenu(){
    this.router.navigate(['services']);
  }

}
