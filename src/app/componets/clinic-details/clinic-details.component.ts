import { Component, OnInit } from '@angular/core';
import {UtilityService} from "../../services/utility.service";
import {FlashMessagesService} from "angular2-flash-messages";
import {DatatransferService} from "../../services/datatransfer.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-clinic-details',
  templateUrl: './clinic-details.component.html',
  styleUrls: ['./clinic-details.component.css']
})
export class ClinicDetailsComponent implements OnInit {

  clinic: Object;

  constructor(private router: Router,
              private dataTransferService: DatatransferService,
              private flashMessage: FlashMessagesService,
              private utilityService: UtilityService) { }

  ngOnInit(){
    this.clinic = this.dataTransferService.getDataTransfer();
  }

  convertDateTime(date:number){
    return this.utilityService.milisToDateText(new Date(date));
  }

  goBackMenu(){
    this.router.navigate(['clinicData']);
  }

}
