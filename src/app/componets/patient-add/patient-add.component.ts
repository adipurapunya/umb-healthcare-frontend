import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FlashMessagesService} from "angular2-flash-messages";
import {ConstantvariablesService} from "../../services/constantvariables.service";
import {PatientService} from "../../services/patient.service";
import {ClinicService} from "../../services/clinic.service";
import {ProfileService} from "../../services/profile.service";
import {DatatransferService} from "../../services/datatransfer.service";
import swal,{ SweetAlertOptions } from 'sweetalert2';

@Component({
  selector: 'app-patient-add',
  templateUrl: './patient-add.component.html',
  styleUrls: ['./patient-add.component.css']
})
export class PatientAddComponent implements OnInit {

  public patient: any;

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
  patientCode : String;
  placeBirth : String;
  clinic : String;
  occupation : String;
  deviceCode : String;
  password : String;

  constructor(private datatransferService: DatatransferService,
              private router: Router,
              private flashMessage: FlashMessagesService,
              private constantServ: ConstantvariablesService,
              private patientSvc: PatientService,
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
    this.router.navigate(['patientData']);
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

  initParameters(){
    this.patient.fullName = null;
    this.patient.email = null;
    this.patient.dateBirth = null;
    this.patient.address = null;
    this.patient.phoneNumber = null;
    this.patient.patientCode = null;
    this.patient.placeBirth = null;
    this.patient.clinic = null;
    this.patient.occupation = null;
    this.patient.deviceCode = null;
    this.patient.password = null;
  }


  onAddSubmit() {

    let addItem = {
      'fullName': this.fullName,
      'email': this.email,
      'dateBirth': this.dateBirth,
      'address': this.address,
      'phoneNumber': this.phoneNumber,
      'patientCode': this.patientCode,
      'religion' : this.religionsel,
      'gender' : this.gendersel,
      'placeBirth' : this.placeBirth,
      'clinic' : {
        'id' : this.clinicsel
      },
      'occupation' : this.occupation,
      'deviceCode' : this.deviceCode,
      'status' : {
        'id' : this.statussel
      },
      "password" : this.password,
      "firstRegistrationDate" : new Date()
    };

    if(this.password == null){
      this.showAlert('error','Add Patient Failed !','Password can not be empty',2500,true);
    }
    else if(this.email == null){
      this.showAlert('error','Add Patient Failed !','Email can not be empty',2500,true);
    }
    else if(this.fullName == null){
      this.showAlert('error','Add Patient Failed !','Full Name can not be empty',2500,true);
    }
    else if(this.clinicsel == null){
      this.showAlert('error','Add Patient Failed !','Clinic can not be empty',2500,true);
    }
    else if(this.dateBirth == null){
      this.showAlert('error','Add Patient Failed !','Date of birth can not be empty',2500,true);
    }
    else{
      this.patientSvc.addPatient(addItem).subscribe(data => {

        this.flashMessage.show('Patient has been successfully added !', {cssClass: 'alert-success', timeout: 3000});
        this.showAlert('success','Patient has been successfully added !','You will be redirect to list of patient ',2500,true);
        this.router.navigate(['patientData']);
      }, error => {
        if(error.status == 401){
          this.flashMessage.show('Your role is unauthorized to add data !', {cssClass: 'alert-danger', timeout: 3000});
        }
        else{
          this.flashMessage.show('failed add patient !', {cssClass: 'alert-danger', timeout: 3000});
        }
      });
    }

  }


}
