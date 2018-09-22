import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';
import swal,{ SweetAlertOptions } from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  fullName: String;
  email: String;
  password: String;
  role: String;
  clinicSel : Object;
  verificationCode : String;

  constructor(private validateService: ValidateService ,
              private flashMessage:FlashMessagesService,
              private authService: AuthService,
              private  router:Router) {}

  ngOnInit() {
    this.role = 'Clinic';
    this.clinicSel = '2';
  }

  showAlerts(type: any, title: any, text: any, time:any, confrimButton: boolean){
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

  onRegisterSubmit (){
    //console.log(this.name);
    //const role = this.role;

    const  user = {
      email: this.email,
      password: this.password,
      fullName: this.fullName,
      role:  this.role,
      clinic: {
        id : this.clinicSel
      }
    };

    if(user.role != null && user.email != null && user.password != null && user.fullName != null) {
      // Validate Email
      if(!this.validateService.validateEmail(user.email)){
        this.flashMessage.show('Please Use valid email', {cssClass: 'alert-danger', timeout: 5000});
        return false;
      }
      else if(this.verificationCode == 'ABC123'){
        // Register User
        this.authService.registerUser(user).subscribe(data => {
          if (data.email != null) {
            this.flashMessage.show('Conratulations, now you are registered as ' + data.email + ' and please go to log in', {
              cssClass: 'alert-success',
              timeout: 5000
            });
            this.showAlerts('success','Register Successful !','You will be redirect to login page',2000,true);
            //console.log("Berhasil Input data");
            this.router.navigate(['/login']);
          } else {
            this.flashMessage.show('Failed Register', {cssClass: 'alert-danger', timeout: 3000});
            this.showAlerts('error','Failed Register !','Please try again',2000,true);
            this.router.navigate(['/register']);
            //console.log("Gagal Input data");
          }
        }, error => {
          console.log(error);
          this.flashMessage.show('Unknown Error', {cssClass: 'alert-danger', timeout: 3000});
          this.showAlerts('error','Failed Register !','Unknown Error',2000,true);
          this.router.navigate(['/register']);
        });
      }
      else{
        this.flashMessage.show('Verification Code is not valid', {cssClass: 'alert-danger', timeout: 3000});
        this.showAlerts('error','Failed Register !','Unknown Error',2000,true);
        this.router.navigate(['/register']);
      }


    }
    else{
      this.flashMessage.show('Please Fill all the field', {cssClass: 'alert-danger', timeout: 3000});
      this.showAlerts('error','Failed Register !','Please Fill all the field',2000,true);
      this.router.navigate(['/register']);
    }

  }

}
