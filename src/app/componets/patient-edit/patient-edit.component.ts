import { Component, OnInit } from '@angular/core';
import {FlashMessagesService} from "angular2-flash-messages";
import {Router} from "@angular/router";
import {DatatransferService} from "../../services/datatransfer.service";
import {ConstantvariablesService} from "../../services/constantvariables.service";
import {PatientService} from "../../services/patient.service";

@Component({
  selector: 'app-patient-edit',
  templateUrl: './patient-edit.component.html',
  styleUrls: ['./patient-edit.component.css']
})
export class PatientEditComponent implements OnInit {

  public patient: any;
  religionsel: String;
  gendersel: String;
  statussel: String;
  dateBirthsel: String;
  religionList: any;
  genderList: any;
  statusList: any;

  constructor(private datatransferService: DatatransferService,
              private router: Router,
              private flashMessage: FlashMessagesService,
              private constantServ: ConstantvariablesService,
              private patientSvc: PatientService) { }

  ngOnInit() {

    this.patient = this.datatransferService.getDataTransfer();
    let time = new Date(this.patient.dateBirth);
    this.patient.dateBirth = formatDateDatabase(time);
    this.religionsel = this.patient.religion;
    this.gendersel = this.patient.gender;
    this.statussel = this.patient.status.id;
    this.religionList = this.constantServ.getReligionList();
    this.genderList = this.constantServ.getGenderList();
    this.statusList = this.constantServ.getStatusList();

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

  updateReligionEvent(input:string){
    this.religionsel = JSON.parse(input);
    //console.log(this.religionsel)
  }

  updateGenderEvent(input:string){
    this.gendersel = JSON.parse(input);
    //console.log(this.gendersel);
  }

  updateStatusEvent(input:string){
    this.statussel = JSON.parse(input);
    //console.log(this.gendersel);
  }

  goBackMenu(){
    this.router.navigate(['patientData']);
  }

  onEditSubmit() {

    let updateItem = {
      'fullName': this.patient.fullName,
      'email': this.patient.email,
      'dateBirth': this.patient.dateBirth,
      'address': this.patient.address,
      'phoneNumber': this.patient.phoneNumber,
      'patientCode': this.patient.patientCode,
      'religion' : this.religionsel,
      'gender' : this.gendersel,
      'placeBirth' : this.patient.placeBirth,
      'clinic' : this.patient.clinic,
      'occupation' : this.patient.occupation,
      'deviceCode' : this.patient.deviceCode,
      'status' : {
        'id' : this.statussel
      }
    };

    this.patientSvc.editPatient(updateItem, this.patient.id).subscribe(data => {

      this.flashMessage.show('Patient has been successful updated !', {cssClass: 'alert-success', timeout: 3000});
      this.router.navigate(['patientData']);
    }, error => {
      if(error.status == 401){
        this.flashMessage.show('Your role is unauthorized to delete data !', {cssClass: 'alert-danger', timeout: 3000});
      }
      else{
        this.flashMessage.show('failed update patient !', {cssClass: 'alert-danger', timeout: 3000});
      }
    });

  }


}
