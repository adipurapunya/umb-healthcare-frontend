import { Injectable } from '@angular/core';
import {Http, Headers} from "@angular/http";
import {environment} from "../../environments/environment.prod";

import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import {HttpHeaders, HttpClient} from "@angular/common/http";

@Injectable()
export class TransactionService {

  authToken: any;
  trx: any;

  constructor(private http: Http, private _http: HttpClient) { }

  getAllTransactionWithPagination(page, sze, srt, srtFld) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    let strpar = '?page=' + page + '&size=' + sze + '&sort=' + srt + '&sortField=' + srtFld;
    return this.http.get(environment.origin_host + 'api/transactionWithPagination' + strpar, {headers: headers}).map(res => res.json());
  }

  getAllTransactionWithPaginationByIdClinic(page, sze, srt, srtFld) {
    let headers = new Headers();
    this.loadToken();
    var usersJSON = JSON.parse(localStorage.getItem('user'));
    headers.append('Authorization', this.authToken);
    let strpar = '?page=' + page + '&size=' + sze + '&sort=' + srt + '&sortField=' + srtFld + '&clinicId=' + usersJSON.clinic.id;
    return this.http.get(environment.origin_host + 'api/transactionWithPaginationByIdClinic' + strpar, {headers: headers}).map(res => res.json());
  }

  getAllTransactionWithPaginationByIdPatient(page, sze, srt, srtFld) {
    let headers = new Headers();
    this.loadToken();
    var usersJSON = JSON.parse(localStorage.getItem('user'));
    headers.append('Authorization', this.authToken);
    let strpar = '?page=' + page + '&size=' + sze + '&sort=' + srt + '&sortField=' + srtFld + '&patientId=' + usersJSON.id;
    return this.http.get(environment.origin_host + 'api/transactionWithPaginationByIdPatient' + strpar, {headers: headers}).map(res => res.json());
  }

  getAllTransactionWithPaginationBySearchField(page, sze, srt, srtFld, searchFields, searchValue) {
    let headers = new Headers();
    //let _headers = new HttpHeaders;
    this.loadToken();
    headers.append('Authorization', this.authToken);
    //_headers.append('Authorization', this.authToken);
    let strpar = '?page=' + page + '&size=' + sze + '&sort=' + srt + '&sortField=' + srtFld + '&searchField=' + searchFields + '&value=' + searchValue;
    return this.http.get(environment.origin_host + 'api/transactionWithPaginationByField' + strpar, {headers: headers}).map(res => res.json());
    //return this._http.get(environment.origin_host + 'api/patiensWithPaginationByField' + strpar, {headers:_headers}).pipe(map((response: any) => response.json()));
  }

  getAllTransactionWithPaginationBySearchFieldByIdClinic(page, sze, srt, srtFld, searchFields, searchValue) {
    let headers = new Headers();
    //let _headers = new HttpHeaders;
    this.loadToken();
    var usersJSON = JSON.parse(localStorage.getItem('user'));
    headers.append('Authorization', this.authToken);
    //_headers.append('Authorization', this.authToken);
    let strpar = '?page=' + page + '&size=' + sze + '&sort=' + srt + '&sortField=' + srtFld + '&searchField=' + searchFields + '&value=' + searchValue + '&clinicId=' + usersJSON.clinic.id;
    return this.http.get(environment.origin_host + 'api/transactionWithPaginationByFieldByIdClinic' + strpar, {headers: headers}).map(res => res.json());
    //return this._http.get(environment.origin_host + 'api/patiensWithPaginationByFieldByIdClinic' + strpar, {headers:_headers}).pipe(map((response: any) => response.json()));
  }

  getAllTransactionWithPaginationBySearchFieldByIdPatient(page, sze, srt, srtFld, searchFields, searchValue) {
    let headers = new Headers();
    //let _headers = new HttpHeaders;
    this.loadToken();
    var usersJSON = JSON.parse(localStorage.getItem('user'));
    headers.append('Authorization', this.authToken);
    //_headers.append('Authorization', this.authToken);
    let strpar = '?page=' + page + '&size=' + sze + '&sort=' + srt + '&sortField=' + srtFld + '&searchField=' + searchFields + '&value=' + searchValue + '&patientId=' + usersJSON.id;
    return this.http.get(environment.origin_host + 'api/transactionWithPaginationByFieldByIdPatient' + strpar, {headers: headers}).map(res => res.json());
    //return this._http.get(environment.origin_host + 'api/patiensWithPaginationByFieldByIdClinic' + strpar, {headers:_headers}).pipe(map((response: any) => response.json()));
  }

  editTransaction(params: any, id: number) {
    let endPoint = 'api/transaction/';
    let headers = new Headers();
    //let _headers = new HttpHeaders;
    this.loadToken();
    headers.append('Authorization', this.authToken);
    //_headers.append('Authorization', this.authToken);
    return this.http.put(environment.origin_host + endPoint + id, params, {headers: headers}).map(res => res.json());
    //return this._http.put(environment.origin_host + endPoint + id, params, {headers:_headers}).pipe(map((response: any) => response.json()));
  }

  assignNurseToTrx(body: Object){
    let headers = new Headers();
    let endPoint = 'api/transaction/assignNurse/';
    this.loadToken();
    headers.append('Authorization', this.authToken);
    return this.http.post(environment.origin_host + endPoint , body, {headers: headers}).map(res => res.json());
  }

  getSelectedNurse(idTrx: number){
    let headers = new Headers();

    let endPoint = 'api/transaction/getNurseList/'+idTrx;
    this.loadToken();
    headers.append('Authorization', this.authToken);
    return this.http.get(environment.origin_host + endPoint, {headers: headers}).map(res => res.json());
  }

  deleteSelectedNurse(idTrx: number, id: number){
    let headers = new Headers();
    var body = 'idTrx=' + idTrx + '&id=' + id;
    let endPoint = 'api/transaction/deleteNurseList';
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(environment.origin_host + endPoint, body,{headers: headers}).map(res => res.json());
  }

  assignDoctorToTrx(body: Object){
    let headers = new Headers();
    let endPoint = 'api/transaction/assignDoctor/';
    this.loadToken();
    headers.append('Authorization', this.authToken);
    return this.http.post(environment.origin_host + endPoint , body, {headers: headers}).map(res => res.json());
  }

  getSelectedDoctor(idTrx: number){
    let headers = new Headers();

    let endPoint = 'api/transaction/getDoctorList/'+idTrx;
    this.loadToken();
    headers.append('Authorization', this.authToken);
    return this.http.get(environment.origin_host + endPoint, {headers: headers}).map(res => res.json());
  }

  getSelectedServices(idTrx: number){
    let headers = new Headers();
    let endPoint = 'api/transaction/getServicesList/'+idTrx;
    this.loadToken();
    headers.append('Authorization', this.authToken);
    return this.http.get(environment.origin_host + endPoint, {headers: headers}).map(res => res.json());
  }

  getVitalSign(idTrx: number){
    let headers = new Headers();
    let endPoint = 'api/transaction/getVitalSign/'+idTrx;
    this.loadToken();
    headers.append('Authorization', this.authToken);
    return this.http.get(environment.origin_host + endPoint, {headers: headers}).map(res => res.json());
  }

  inputVitalSign(body: Object, idTrx: any){
    let headers = new Headers();
    let endPoint = 'api/transaction/addVitalSign/'+idTrx.id;
    this.loadToken();
    headers.append('Authorization', this.authToken);
    return this.http.post(environment.origin_host + endPoint, body ,{headers: headers}).map(res => res.json());
  }

  deleteSelectedDoctor(idTrx: number, id: number){
    let headers = new Headers();
    var body = 'idTrx=' + idTrx + '&id=' + id;
    let endPoint = 'api/transaction/deleteDoctorList';
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(environment.origin_host + endPoint, body,{headers: headers}).map(res => res.json());
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }


  deleteTransaction(params){
    let headers = new Headers();
    //let _headers = new HttpHeaders;
    this.loadToken();
    headers.append('Authorization', this.authToken);
    //_headers.append('Authorization', this.authToken);
    return this.http.delete(environment.origin_host + 'api/transaction/' + params.id, {headers: headers}).map(res => res.json());
    //return this._http.delete(environment.origin_host + 'api/userPatient/' + params.id, {headers:_headers}).pipe(map((response: any) => response.json()));
  }

}
