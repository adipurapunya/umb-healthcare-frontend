import { Component, OnInit } from '@angular/core';
import {UtilityService} from "../../services/utility.service";
import {FlashMessagesService} from "angular2-flash-messages";
import {DatatransferService} from "../../services/datatransfer.service";
import {Router} from "@angular/router";
import {ModalService} from '../../services/modal.service';
import {TransactionService} from "../../services/transaction.service";
import swal,{ SweetAlertOptions } from 'sweetalert2';

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.css']
})
export class TransactionDetailComponent implements OnInit {

  trxNurse: Object;
  trxDoctor: Object;
  trxServices: Object;
  trxVitalSign: Object;
  trxVitalSignInput: any;
  trx: Object;
  totalPrice : number;
  public initializeData: any;

  constructor(private router: Router,
              private dataTransferService: DatatransferService,
              private flashMessage: FlashMessagesService,
              private utilityService: UtilityService,
              private modalService: ModalService,
              private transactionService: TransactionService) { }

  ngOnInit() {
    this.trx = this.dataTransferService.getDataTransfer();
    this.initializeDataFuction();
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

  initializeDataFuction(){
    this.initializeData = {
      "sistol" : 0,
      "diastol" : 0,
      "temperature" :0,
      "heartBeat" :0,
      "respiratory" :0,
      "pulseOximetry" :0,
    }
    this.trxVitalSignInput = this.initializeData;
  }

  goBackMenu(){
    this.router.navigate(['transaction']);
  }

  convertToRupiah(val:number){
    return this.utilityService.convertNumberToRupiah(val);
  }

  convertDateTime(val:number){
    return this.utilityService.milisToDateText(new Date(val));
  }

  openModalNurse(id: string, trx: any) {
    this.getSelectedNurse(trx.id);
    this.modalService.open(id);
  }

  openModalDoctor(id: string, trx: any) {
    this.getSelectedDoctor(trx.id);
    this.modalService.open(id);
  }

  openModalServices(id: string, trx: any) {
    this.getSelectedServices(trx.id);
    this.modalService.open(id);
  }

  openModalVitalSign(id: string, trx: any) {
    this.getListOfVitalSign(trx.id);
    this.modalService.open(id);
  }

  openModalVitalSignInput(id: string, trx: any){
    this.getListOfVitalSign(trx.id);
    this.modalService.open(id);
  }


  getSelectedNurse(id: number){
    this.transactionService.getSelectedNurse(id).subscribe(data => {
      this.trxNurse= data.content;
    }, error => {
      console.log(error);
    });
  }

  getSelectedDoctor(id: number){
    this.transactionService.getSelectedDoctor(id).subscribe(data => {
      this.trxDoctor= data.content;
    }, error => {
      console.log(error);
    });
  }

  getSelectedServices(id: number) {
    this.transactionService.getSelectedServices(id).subscribe(data => {
      this.trxServices = data.content;
      let length = data.content.length;
      let tempTot = 0;
      for(var i=0; i<length; i++){
        tempTot = tempTot + data.content[i].services.price;
      }
      this.totalPrice = tempTot;
    }, error => {
      console.log(error);
    })
  }

  getListOfVitalSign(id: number){
    this.transactionService.getVitalSign(id).subscribe(data => {
      this.trxVitalSign = data;
      this.trxVitalSignInput = data;
    }, error => {
      console.log(error);
    })
  }

  onInput(){
    this.initializeData = {
      "sistol" : this.trxVitalSignInput.sistol,
      "diastol" : this.trxVitalSignInput.diastol,
      "temperature" : this.trxVitalSignInput.temperature,
      "heartBeat" : this.trxVitalSignInput.heartBeat,
      "respiratory" : this.trxVitalSignInput.respiratory,
      "pulseOximetry" : this.trxVitalSignInput.pulseOximetry,
    }
    this.trxVitalSignInput = this.initializeData;

    this.transactionService.inputVitalSign(this.trxVitalSignInput, this.trx).subscribe(data => {
      this.flashMessage.show('Vital sign has been updated !', {cssClass: 'alert-success', timeout: 3000});
      this.showAlert('success','Successful Update !','Vital sign has been updated',3000,true);
    }, error => {
      if(error.status == 401){
        this.flashMessage.show('Your role is unauthorized to input data !', {cssClass: 'alert-danger', timeout: 3000});
        this.showAlert('error','Update Failed','Your role is unauthorized to input data !',2000,true);
      }
      else{
        this.flashMessage.show('failed update Vital sign data !', {cssClass: 'alert-danger', timeout: 3000});
        this.showAlert('error','Update Failed','failed update Vital sign data !',2000,true);
      }
    });

  }

}
