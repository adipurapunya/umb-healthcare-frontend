import { Component, OnInit } from '@angular/core';
import {UtilityService} from "../../services/utility.service";
import {FlashMessagesService} from "angular2-flash-messages";
import {DatatransferService} from "../../services/datatransfer.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-doctor-details',
  templateUrl: './doctor-details.component.html',
  styleUrls: ['./doctor-details.component.css']
})
export class DoctorDetailsComponent implements OnInit {

  doctor: Object;

  constructor(private router: Router,
              private dataTransferService: DatatransferService,
              private flashMessage: FlashMessagesService,
              private utilityService: UtilityService) { }

  ngOnInit(){
    this.doctor = this.dataTransferService.getDataTransfer();
  }

  convertDateTime(date:number){
    return this.utilityService.milisToDateText(new Date(date));
  }

  goBackMenu(){
    this.router.navigate(['doctorData']);
  }

}
