import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FlashMessagesService} from "angular2-flash-messages";
import {ConstantvariablesService} from "../../services/constantvariables.service";
import {DoctorService} from "../../services/doctor.service";
import {ClinicService} from "../../services/clinic.service";
import {ProfileService} from "../../services/profile.service";
import {DatatransferService} from "../../services/datatransfer.service";
import swal,{ SweetAlertOptions } from 'sweetalert2';

@Component({
  selector: 'app-doctor-add',
  templateUrl: './doctor-add.component.html',
  styleUrls: ['./doctor-add.component.css']
})
export class DoctorAddComponent implements OnInit {

  public doctor: any;

  religionsel: String;
  gendersel: String;
  statussel: String;
  clinicsel: String;

  religionList: any;
  genderList: any;
  statusList: any;
  clinicsList: any;

  fullName : String;
  email : String;
  dateBirth : String;
  address : String;
  phoneNumber : String;
  doctorCode : String;
  placeBirth : String;
  clinic : String;
  specialist : String;
  registerNumber : String;
  password : String;

  constructor(private datatransferService: DatatransferService,
              private router: Router,
              private flashMessage: FlashMessagesService,
              private constantServ: ConstantvariablesService,
              private doctorSvc: DoctorService,
              private profileSvc: ProfileService,
              private clinicService: ClinicService) { }

  ngOnInit() {
    //this.patient = null;//this.datatransferService.getDataTransfer();
    //this.initParameters();
    this.religionList = this.constantServ.getReligionList();
    this.genderList = this.constantServ.getGenderList();
    this.statusList = this.constantServ.getStatusList();
    this.getClinicList();

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
    this.router.navigate(['doctorData']);
  }

  getClinicList(){
    var usersJSON = JSON.parse(localStorage.getItem('user'));

    this.clinicService.getListOfClinics().subscribe(data => {
      if (usersJSON.roles == 'ROLE_ADMIN') {
        this.clinicsList = data;
      }
      else{
        for(var item of data){
          if(usersJSON.clinic.id == item.id){
            //console.log(item.nameOfClinic);
            let arrayTemp = [];
            arrayTemp.push(item);
            this.clinicsList = arrayTemp;
          }
        }
      }
    }, error => {
      if (error.status == 401) {
        this.flashMessage.show('Your role is unauthorized to show this data !', {
          cssClass: 'alert-danger',
          timeout: 3000
        });
      }
    });
  }

  onAddSubmit() {

    let addItem = {
      'fullName': this.fullName,
      'email': this.email,
      'dateBirth': this.dateBirth,
      'address': this.address,
      'phoneNumber': this.phoneNumber,
      'doctorCode': this.doctorCode,
      'religion' : this.religionsel,
      'gender' : this.gendersel,
      'placeBirth' : this.placeBirth,
      'clinic' : {
        'id' : this.clinicsel
      },
      'registerNumber' : this.registerNumber,
      'specialist' : this.specialist,
      'status' : {
        'id' : this.statussel
      },
      "password" : this.password,
      "firstRegistrationDate" : new Date()
    };

    if(this.password == null){
      this.showAlert('error','Add Doctor Failed !','Password can not be empty',2500,true);
    }
    else if(this.email == null){
      this.showAlert('error','Add Doctor Failed !','Email can not be empty',2500,true);
    }
    else if(this.fullName == null){
      this.showAlert('error','Add Doctor Failed !','Full Name can not be empty',2500,true);
    }
    else if(this.clinicsel == null){
      this.showAlert('error','Add Doctor Failed !','Clinic can not be empty',2500,true);
    }
    else if(this.dateBirth == null){
      this.showAlert('error','Add Doctor Failed !','Date of birth can not be empty',2500,true);
    }
    else{
      this.doctorSvc.addDoctor(addItem).subscribe(data => {

        this.flashMessage.show('Doctor has been successfully added !', {cssClass: 'alert-success', timeout: 3000});
        this.showAlert('success','Doctor has been successfully added !','You will be redirect to list of Doctor ',2500,true);
        this.router.navigate(['doctorData']);
      }, error => {
        if(error.status == 401){
          this.flashMessage.show('Your role is unauthorized to add data !', {cssClass: 'alert-danger', timeout: 3000});
        }
        else{
          this.flashMessage.show('failed add Doctor !', {cssClass: 'alert-danger', timeout: 3000});
        }
      });
    }

  }

}
