import { Component, OnInit } from '@angular/core';
import {ClinicService} from "../../services/clinic.service";
import {ConstantvariablesService} from "../../services/constantvariables.service";
import {FlashMessagesService} from "angular2-flash-messages";
import {Router} from "@angular/router";
import {DatatransferService} from "../../services/datatransfer.service";

@Component({
  selector: 'app-clinic-edit',
  templateUrl: './clinic-edit.component.html',
  styleUrls: ['./clinic-edit.component.css']
})
export class ClinicEditComponent implements OnInit {

  public clinic: any;
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
              private clinicSvc: ClinicService) { }

  ngOnInit() {
    this.clinic = this.datatransferService.getDataTransfer();
    let time = new Date(this.clinic.dateBirth);
    this.clinic.dateBirth = formatDateDatabase(time);
    this.religionsel = this.clinic.religion;
    this.gendersel = this.clinic.gender;
    this.statussel = this.clinic.status.id;
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
    this.router.navigate(['clinicData']);
  }

  onEditSubmit() {
    let updateItem = {
      'fullName': this.clinic.fullName,
      'email': this.clinic.email,
      'dateBirth': this.clinic.dateBirth,
      'address': this.clinic.address,
      'phoneNumber': this.clinic.phoneNumber,
      'userCode': this.clinic.userCode,
      'religion' : this.religionsel,
      'gender' : this.gendersel,
      'placeBirth' : this.clinic.placeBirth,
      'clinic' : this.clinic.clinic,
      'status' : {
        'id' : this.statussel
      }
    };

    this.clinicSvc.editClinic(updateItem, this.clinic.id).subscribe(data => {

      this.flashMessage.show('user clinic has been successful updated !', {cssClass: 'alert-success', timeout: 3000});
      this.router.navigate(['clinicData']);
    }, error => {
      if(error.status == 401){
        this.flashMessage.show('Your role is unauthorized to delete data !', {cssClass: 'alert-danger', timeout: 3000});
      }
      else{
        this.flashMessage.show('failed update user clinic !', {cssClass: 'alert-danger', timeout: 3000});
      }
    });
  }

}
