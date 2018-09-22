import { Component, OnInit } from '@angular/core';
import {DoctorService} from "../../services/doctor.service";
import {ConstantvariablesService} from "../../services/constantvariables.service";
import {FlashMessagesService} from "angular2-flash-messages";
import {Router} from "@angular/router";
import {DatatransferService} from "../../services/datatransfer.service";

@Component({
  selector: 'app-doctor-edit',
  templateUrl: './doctor-edit.component.html',
  styleUrls: ['./doctor-edit.component.css']
})
export class DoctorEditComponent implements OnInit {

  public doctor: any;
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
              private doctorSvc: DoctorService) { }

  ngOnInit() {
    this.doctor = this.datatransferService.getDataTransfer();
    let time = new Date(this.doctor.dateBirth);
    this.doctor.dateBirth = formatDateDatabase(time);
    this.religionsel = this.doctor.religion;
    this.gendersel = this.doctor.gender;
    this.statussel = this.doctor.status.id;
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
    this.router.navigate(['doctorData']);
  }

  onEditSubmit() {
    let updateItem = {
      'fullName': this.doctor.fullName,
      'email': this.doctor.email,
      'dateBirth': this.doctor.dateBirth,
      'address': this.doctor.address,
      'phoneNumber': this.doctor.phoneNumber,
      'doctorCode': this.doctor.doctorCode,
      'religion' : this.religionsel,
      'gender' : this.gendersel,
      'placeBirth' : this.doctor.placeBirth,
      'clinic' : this.doctor.clinic,
      'registerNumber' : this.doctor.registerNumber,
      'specialist' : this.doctor.specialist,
      'status' : {
        'id' : this.statussel
      }
    };

    this.doctorSvc.editDoctor(updateItem, this.doctor.id).subscribe(data => {

      this.flashMessage.show('doctor has been successful updated !', {cssClass: 'alert-success', timeout: 3000});
      this.router.navigate(['doctorData']);
    }, error => {
      if(error.status == 401){
        this.flashMessage.show('Your role is unauthorized to delete data !', {cssClass: 'alert-danger', timeout: 3000});
      }
      else{
        this.flashMessage.show('failed update doctor !', {cssClass: 'alert-danger', timeout: 3000});
      }
    });

  }

}
