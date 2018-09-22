import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
//import 'rxjs/add/operator/catch';
import swal,{ SweetAlertOptions } from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  email: String;
  password: String;
  role: String;

  constructor(private authService: AuthService,
              private router:Router,
              private flashMessage:FlashMessagesService) {}

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

  ngOnInit() {
    this.role = 'Admin'
  }

  onLoginSubmit() {
    const user = {
      email: this.email,
      password: this.password,
      role: this.role
    };



    if(user.role != null || user.email != null || user.password != null){

      //console.log("Masuk");
      this.authService.authenticateUser(user).subscribe(data =>  {
        //console.log(data);
        this.authService.storeUserData(data.token, data.user);
        this.flashMessage.show('Login Successful', {cssClass: 'alert-success', timeout: 2000});
        this.showAlert('success','Login Successful !','You will be redirect to dashboard',2000,true);
        this.router.navigate(['/dashboard']);
      }, error => {
        //console.log(error.status);
        if(error.status=="401"){
          this.flashMessage.show('Login Failed / Incorrect Email or Password', {cssClass: 'alert-danger', timeout: 2000});
          this.showAlert('error','Login Failed !','Incorrect Email or Password',2000,true);
          this.router.navigate(['/login']);
        }
      });
    }
    else {
      this.flashMessage.show('Please Fill all the field', {cssClass: 'alert-danger', timeout: 2000});
      this.router.navigate(['/login']);
    }


  }
}
