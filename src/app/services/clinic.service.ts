import { Injectable } from '@angular/core';
import {Http, Headers} from "@angular/http";
import {environment} from "../../environments/environment.prod";

import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import {HttpHeaders, HttpClient} from "@angular/common/http";

@Injectable()
export class ClinicService {

  authToken: any;
  //user: any;

  constructor(private http: Http, private _http: HttpClient) { }

  getClinics(page, sze, srt, srtFld) {
    let headers = new Headers();
    //let _headers = new HttpHeaders;
    this.loadToken();
    headers.append('Authorization', this.authToken);
    //_headers.append('Authorization', this.authToken);
    let strpar = '?page=' + page + '&size=' + sze + '&sort=' + srt + '&sortField=' + srtFld;
    return this.http.get(environment.origin_host + 'api/userClinicsWithPagination' + strpar, {headers: headers}).map(res => res.json());
    //return this._http.get(environment.origin_host + 'api/userClinicsWithPagination' + strpar, {headers:_headers}).pipe(map((response: any) => response.json()));
  }

  getListOfClinics(){
    let headers = new Headers();
    //let _headers = new HttpHeaders;
    this.loadToken();
    headers.append('Authorization', this.authToken);
    //_headers.append('Authorization', this.authToken);
    return this.http.get(environment.origin_host + 'api/clinics' , {headers: headers}).map(res => res.json());
    //return this._http.get(environment.origin_host + 'api/clinics', {headers:_headers}).pipe(map((response: any) => response.json()));
  }

  getClinicsByClinic(page, sze, srt, srtFld) {
    let headers = new Headers();
    //let _headers = new HttpHeaders;
    this.loadToken();
    var usersJSON = JSON.parse(localStorage.getItem('user'));
    headers.append('Authorization', this.authToken);
    //_headers.append('Authorization', this.authToken);
    let strpar = '?page=' + page + '&size=' + sze + '&sort=' + srt + '&sortField=' + srtFld + '&clinicId=' + usersJSON.clinic.id;
    return this.http.get(environment.origin_host + 'api/userClinicsWithPaginationByIdClinic' + strpar, {headers: headers}).map(res => res.json());
    //return this._http.get(environment.origin_host + 'api/userClinicsWithPaginationByIdClinic' + strpar, {headers:_headers}).pipe(map((response: any) => response.json()));
  }

  getClinicsBySearchField(page, sze, srt, srtFld, searchFields, searchValue) {
    let headers = new Headers();
    //let _headers = new HttpHeaders;
    this.loadToken();
    headers.append('Authorization', this.authToken);
    //_headers.append('Authorization', this.authToken);
    let strpar = '?page=' + page + '&size=' + sze + '&sort=' + srt + '&sortField=' + srtFld + '&searchField=' + searchFields + '&value=' + searchValue;
    return this.http.get(environment.origin_host + 'api/userClinicsWithPaginationByField' + strpar, {headers: headers}).map(res => res.json());
    //return this._http.get(environment.origin_host + 'api/userClinicsWithPaginationByField' + strpar, {headers:_headers}).pipe(map((response: any) => response.json()));
  }

  getClinicsBySearchFieldByIdClinic(page, sze, srt, srtFld, searchFields, searchValue) {
    let headers = new Headers();
    //let _headers = new HttpHeaders;
    this.loadToken();
    var usersJSON = JSON.parse(localStorage.getItem('user'));
    headers.append('Authorization', this.authToken);
    //_headers.append('Authorization', this.authToken);
    let strpar = '?page=' + page + '&size=' + sze + '&sort=' + srt + '&sortField=' + srtFld + '&searchField=' + searchFields + '&value=' + searchValue + '&clinicId=' + usersJSON.clinic.id;
    return this.http.get(environment.origin_host + 'api/userClinicsWithPaginationByFieldByIdClinic' + strpar, {headers: headers}).map(res => res.json());
    //return this._http.get(environment.origin_host + 'api/userClinicsWithPaginationByFieldByIdClinic' + strpar, {headers:_headers}).pipe(map((response: any) => response.json()));
  }

  deleteClinic(params){
    let headers = new Headers();
    //let _headers = new HttpHeaders;
    this.loadToken();
    headers.append('Authorization', this.authToken);
    //_headers.append('Authorization', this.authToken);
    return this.http.delete(environment.origin_host + 'api/userClinic/' + params.id, {headers: headers}).map(res => res.json());
    //return this._http.delete(environment.origin_host + 'api/userClinic/' + params.id, {headers:_headers}).pipe(map((response: any) => response.json()));
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  editClinic(params: any, id: number) {
    let endPoint = 'api/userClinic/';
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    return this.http.put(environment.origin_host + endPoint + id, params, {headers: headers}).map(res => res.json());
  }

  addClinic(params: any){
    let endPoint = 'register/userClinic';
    let headers = new Headers();
    //let _headers = new HttpHeaders;
    //this.loadToken();
    //headers.append('Authorization', this.authToken);
    return this.http.post(environment.origin_host + endPoint , params, {headers: headers}).map(res => res.json());
    //return this._http.post(environment.origin_host + endPoint, params, {headers:_headers}).pipe(map((response: any) => response.json()));
  }

}
