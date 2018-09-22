import { Component, OnInit } from '@angular/core';
import {NurseService} from "../../services/nurse.service";
import {ConstantvariablesService} from "../../services/constantvariables.service";
import {FlashMessagesService} from "angular2-flash-messages";
import {Router} from "@angular/router";
import {DatatransferService} from "../../services/datatransfer.service";

@Component({
  selector: 'app-nurse-edit',
  templateUrl: './nurse-edit.component.html',
  styleUrls: ['./nurse-edit.component.css']
})
export class NurseEditComponent implements OnInit {

  public nurse: any;
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
              private nurseSvc: NurseService) { }

  ngOnInit() {
    this.nurse = this.datatransferService.getDataTransfer();
    let time = new Date(this.nurse.dateBirth);
    this.nurse.dateBirth = formatDateDatabase(time);
    this.religionsel = this.nurse.religion;
    this.gendersel = this.nurse.gender;
    this.statussel = this.nurse.status.id;
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
    this.router.navigate(['nurseData']);
  }

  onEditSubmit() {
    let updateItem = {
      'fullName': this.nurse.fullName,
      'email': this.nurse.email,
      'dateBirth': this.nurse.dateBirth,
      'address': this.nurse.address,
      'phoneNumber': this.nurse.phoneNumber,
      'nurseCode': this.nurse.nurseCode,
      'religion' : this.religionsel,
      'gender' : this.gendersel,
      'placeBirth' : this.nurse.placeBirth,
      'clinic' : this.nurse.clinic,
      'sipp' : this.nurse.sipp,
      'status' : {
        'id' : this.statussel
      }
    };

    this.nurseSvc.editNurse(updateItem, this.nurse.id).subscribe(data => {

      this.flashMessage.show('nurse has been successful updated !', {cssClass: 'alert-success', timeout: 3000});
      this.router.navigate(['nurseData']);
    }, error => {
      if(error.status == 401){
        this.flashMessage.show('Your role is unauthorized to delete data !', {cssClass: 'alert-danger', timeout: 3000});
      }
      else{
        this.flashMessage.show('failed update nurse !', {cssClass: 'alert-danger', timeout: 3000});
      }
    });

  }

}
