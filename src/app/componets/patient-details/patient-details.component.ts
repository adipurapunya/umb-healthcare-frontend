import { Component, OnInit } from '@angular/core';
import {UtilityService} from "../../services/utility.service";
import {FlashMessagesService} from "angular2-flash-messages";
import {DatatransferService} from "../../services/datatransfer.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css']
})
export class PatientDetailsComponent implements OnInit {

  patient: Object;

  constructor(private router: Router,
              private dataTransferService: DatatransferService,
              private flashMessage: FlashMessagesService,
              private utilityService: UtilityService) { }

  ngOnInit(){
    this.patient = this.dataTransferService.getDataTransfer();
  }

  convertDateTime(date:number){
    return this.utilityService.milisToDateText(new Date(date));
  }

  goBackMenu(){
    this.router.navigate(['patientData']);
  }


}
