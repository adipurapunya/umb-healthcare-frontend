import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import {TranslateService} from 'ng2-translate'
//import {TranslateService} from '@ngx-translate/core';
import {NgxSpinnerService} from "ngx-spinner";
import swal,{ SweetAlertOptions } from 'sweetalert2';
import {DatatransferService} from "../../services/datatransfer.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: Object;

  constructor(public authService: AuthService,
              private router:Router,
              private flashMessage:FlashMessagesService,
              private translate: TranslateService,
              private spinner: NgxSpinnerService,
              private dataTransferService: DatatransferService) {

    translate.addLangs(["in","en","ch","ar"]);
    translate.setDefaultLang("en");
    //let browserLang = translate.getBrowserLang();
    //translate.use(browserLang.match(/en|in/) ? browserLang : "en");
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

  changeLanguage(lang){
    this.startProgress();
    this.translate.use(lang);
    this.stopProgress();
  }

  goToAboutUs(){
    this.router.navigate(['/aboutus']);
  }

  goToTeam(){
    this.router.navigate(['/team']);
  }

  goToOurProduct(){
    this.router.navigate(['/ourproduct']);
  }

  onLogoutClick(){
    this.authService.logout();
    this.flashMessage.show('You are logged out',{cssClass:'alert-success',timeout:3000});
    this.showAlert('warning','You are logged out !','You will be redirect to login page',2500,true);
    this.router.navigate(['/login']);
    return false;
  }

  startProgress(){
    this.spinner.show();
  }

  stopProgress(){
    this.spinner.hide();
  }

  ngOnInit() {
    //this.user = this.authService.getRole();
  }

  getCurrentUser(){
    let usersJSON = JSON.parse(localStorage.getItem('user'));
    return usersJSON;
  }

  goToEcgDetail(patient: Object){
    this.dataTransferService.setDataTransfer(patient);
    this.router.navigate(['ecgData']);
  }

}
