import { Component, OnInit } from '@angular/core';
import {DatatransferService} from "../../services/datatransfer.service";
import {Router} from "@angular/router";
import {FlashMessagesService} from "angular2-flash-messages";
import {ConstantvariablesService} from "../../services/constantvariables.service";
import {ProfileService} from "../../services/profile.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.component.html',
  styleUrls: ['./edit-password.component.css']
})
export class EditPasswordComponent implements OnInit {

  public user: any;
  oldPassword : String;
  retypenewPassword ; String;
  newPassword : String;

  constructor(private datatransferService: DatatransferService, private router: Router,
              private flashMessage: FlashMessagesService,
              private constantServ: ConstantvariablesService, private profileService: ProfileService, private authService: AuthService) { }

  ngOnInit() {
    this.user = this.datatransferService.getDataTransfer();
  }

  onEditPasswordSubmit() {

    let updateItem;

    let pass1 = this.profileService.encryptedText(this.oldPassword);

    let pass2 = this.user.password;

    if(this.newPassword != null && this.retypenewPassword != null && this.newPassword != null){
      if(pass1 == pass2){
        if(this.newPassword == this.retypenewPassword){
          updateItem = {
            'password': this.profileService.encryptedText(this.newPassword)
          };

          this.profileService.editProfile(updateItem, this.user.id).subscribe(data => {

            this.flashMessage.show('Your password has been successful updated. Please Login using your new password !', {cssClass: 'alert-success', timeout: 5000});
            this.authService.logout();
            this.router.navigate(['/login']);
          }, error => {
            this.flashMessage.show('failed update your password !', {cssClass: 'alert-danger', timeout: 5000});
          });

        }
        else{
          this.flashMessage.show('new password did not match, please type correctly !', {cssClass: 'alert-danger', timeout: 3000});
        }
      }
      else{
        this.flashMessage.show('your old password did not match !', {cssClass: 'alert-danger', timeout: 3000});
      }
    }
    else{
      this.flashMessage.show('Please fill all the form !', {cssClass: 'alert-danger', timeout: 3000});
    }

  }

  goBackMenu(){
    this.router.navigate(['profile']);
  }

}
