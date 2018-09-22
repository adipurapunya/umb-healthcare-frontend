import { Component, OnInit } from '@angular/core';
import {ProfileService} from '../../services/profile.service'
import {DatatransferService} from '../../services/datatransfer.service'
import {ConstantvariablesService} from '../../services/constantvariables.service'
import {Router} from "@angular/router";
import {FlashMessagesService} from "angular2-flash-messages";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  public user: any;
  religionsel: String;
  gendersel: String;
  dateBirthsel: String;
  religionList: any;
  genderList: any;

  constructor(private datatransferService: DatatransferService,
              private router: Router,
              private flashMessage: FlashMessagesService,
              private profileService: ProfileService,
              private constantServ: ConstantvariablesService) { }

  ngOnInit() {

    this.user = this.datatransferService.getDataTransfer();
    this.religionsel = this.user.religion;
    this.gendersel = this.user.gender;
    this.religionList = this.constantServ.getReligionList();
    this.genderList = this.constantServ.getGenderList();
  }

  updateReligionEvent(input:string){
    this.religionsel = JSON.parse(input);
    //console.log(this.religionsel)
  }

  updateGenderEvent(input:string){
    this.gendersel = JSON.parse(input);
    //console.log(this.gendersel);
  }

  onEditSubmit() {

    let updateItem ;

    if(this.user.roles == 'ROLE_ADMIN'){
      updateItem = {
        'fullName': this.user.fullName,
        'email': this.user.email,
        'dateBirth': this.user.dateBirth,
        'address': this.user.address,
        'employeeIdNumber': this.user.employeeIdNumber,
        'phoneNumber': this.user.phoneNumber,
        'adminCode': this.user.adminCode,
        'religion' : this.religionsel,
        'gender' : this.gendersel,
        'placeBirth' : this.user.placeBirth
      }
    }
    else if(this.user.roles == 'ROLE_CLINIC'){
      updateItem = {
        'fullName': this.user.fullName,
        'email': this.user.email,
        'dateBirth': this.user.dateBirth,
        'address': this.user.address,
        'employeeIdNumber': this.user.employeeIdNumber,
        'phoneNumber': this.user.phoneNumber,
        'userCode': this.user.userCode,
        'religion' : this.religionsel,
        'gender' : this.gendersel,
        'placeBirth' : this.user.placeBirth,
        'clinic' : this.user.clinic
      }
    }

    else if(this.user.roles == 'ROLE_NURSE'){
      updateItem = {
        'fullName': this.user.fullName,
        'email': this.user.email,
        'dateBirth': this.user.dateBirth,
        'address': this.user.address,
        'employeeIdNumber': this.user.employeeIdNumber,
        'phoneNumber': this.user.phoneNumber,
        'nurseCode': this.user.nurseCode,
        'religion' : this.religionsel,
        'gender' : this.gendersel,
        'placeBirth' : this.user.placeBirth,
        'clinic' : this.user.clinic,
        'sipp' : this.user.sipp
      }
    }

    else if(this.user.roles == 'ROLE_DOCTOR'){
      updateItem = {
        'fullName': this.user.fullName,
        'email': this.user.email,
        'dateBirth': this.user.dateBirth,
        'address': this.user.address,
        'employeeIdNumber': this.user.employeeIdNumber,
        'phoneNumber': this.user.phoneNumber,
        'doctorCode': this.user.doctorCode,
        'religion' : this.religionsel,
        'gender' : this.gendersel,
        'placeBirth' : this.user.placeBirth,
        'clinic' : this.user.clinic,
        'registerNumber' : this.user.registerNumber,
        'specialist' : this.user.specialist
      }
    }

    else if(this.user.roles == 'ROLE_PATIENT'){
      updateItem = {
        'fullName': this.user.fullName,
        'email': this.user.email,
        'dateBirth': this.user.dateBirth,
        'address': this.user.address,
        'employeeIdNumber': this.user.employeeIdNumber,
        'phoneNumber': this.user.phoneNumber,
        'patientCode': this.user.patientCode,
        'religion' : this.religionsel,
        'gender' : this.gendersel,
        'placeBirth' : this.user.placeBirth,
        'clinic' : this.user.clinic,
        'occupation' : this.user.occupation,
        'deviceCode' : this.user.deviceCode
      }
    }

    this.profileService.editProfile(updateItem, this.user.id).subscribe(data => {

      this.flashMessage.show('Your profile has been successful updated !', {cssClass: 'alert-success', timeout: 3000});
      this.router.navigate(['profile']);
    }, error => {
      this.flashMessage.show('failed update your profile !', {cssClass: 'alert-danger', timeout: 3000});
    });

  }

  goBackMenu(){
    this.router.navigate(['profile']);
  }

}
