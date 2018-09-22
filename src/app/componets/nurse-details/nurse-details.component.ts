import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {DatatransferService} from "../../services/datatransfer.service";
import {FlashMessagesService} from "angular2-flash-messages";
import {UtilityService} from "../../services/utility.service";

@Component({
  selector: 'app-nurse-details',
  templateUrl: './nurse-details.component.html',
  styleUrls: ['./nurse-details.component.css']
})
export class NurseDetailsComponent implements OnInit {

  nurse: Object;

  constructor(private router: Router,
              private dataTransferService: DatatransferService,
              private flashMessage: FlashMessagesService,
              private utilityService: UtilityService) { }

  ngOnInit(){
    this.nurse = this.dataTransferService.getDataTransfer();
  }

  convertDateTime(date:number){
    return this.utilityService.milisToDateText(new Date(date));
  }

  goBackMenu(){
    this.router.navigate(['nurseData']);
  }

}
