import { Injectable } from '@angular/core';
import {Http, Headers} from "@angular/http";
import {environment} from "../../environments/environment.prod";
import { map } from "rxjs/operators";
import {HttpHeaders, HttpClient} from "@angular/common/http";

@Injectable()
export class DoctorService {

  authToken: any;
  user: any;

  constructor(private http: Http, private _http: HttpClient) { }

  getDoctors(page, sze, srt, srtFld) {
    let headers = new Headers();
    //let _headers = new HttpHeaders;
    this.loadToken();
    headers.append('Authorization', this.authToken);
    //_headers.append('Authorization', this.authToken);
    let strpar = '?page=' + page + '&size=' + sze + '&sort=' + srt + '&sortField=' + srtFld;
    return this.http.get(environment.origin_host + 'api/doctorsWithPagination' + strpar, {headers: headers}).map(res => res.json());
    //return this._http.get(environment.origin_host + 'api/doctorsWithPagination' + strpar, {headers:_headers}).pipe(map((response: any) => response.json()));
  }

  getDoctorsByClinic(page, sze, srt, srtFld) {
    let headers = new Headers();
    //let _headers = new HttpHeaders;
    this.loadToken();
    var usersJSON = JSON.parse(localStorage.getItem('user'));
    headers.append('Authorization', this.authToken);
    //_headers.append('Authorization', this.authToken);
    let strpar = '?page=' + page + '&size=' + sze + '&sort=' + srt + '&sortField=' + srtFld + '&clinicId=' + usersJSON.clinic.id;
    return this.http.get(environment.origin_host + 'api/doctorsWithPaginationByIdClinic' + strpar, {headers: headers}).map(res => res.json());
    //return this._http.get(environment.origin_host + 'api/doctorsWithPaginationByIdClinic' + strpar, {headers:_headers}).pipe(map((response: any) => response.json()));
  }

  getDoctorsBySearchField(page, sze, srt, srtFld, searchFields, searchValue) {
    let headers = new Headers();
    //let _headers = new HttpHeaders;
    this.loadToken();
    headers.append('Authorization', this.authToken);
    //_headers.append('Authorization', this.authToken);
    let strpar = '?page=' + page + '&size=' + sze + '&sort=' + srt + '&sortField=' + srtFld + '&searchField=' + searchFields + '&value=' + searchValue;
    return this.http.get(environment.origin_host + 'api/doctorsWithPaginationByField' + strpar, {headers: headers}).map(res => res.json());
    //return this._http.get(environment.origin_host + 'api/doctorsWithPaginationByField' + strpar, {headers:_headers}).pipe(map((response: any) => response.json()));
  }

  getDoctorsBySearchFieldByIdClinic(page, sze, srt, srtFld, searchFields, searchValue) {
    let headers = new Headers();
    //let _headers = new HttpHeaders;
    this.loadToken();
    var usersJSON = JSON.parse(localStorage.getItem('user'));
    headers.append('Authorization', this.authToken);
    //_headers.append('Authorization', this.authToken);
    let strpar = '?page=' + page + '&size=' + sze + '&sort=' + srt + '&sortField=' + srtFld + '&searchField=' + searchFields + '&value=' + searchValue + '&clinicId=' + usersJSON.clinic.id;
    return this.http.get(environment.origin_host + 'api/doctorsWithPaginationByFieldByIdClinic' + strpar, {headers: headers}).map(res => res.json());
    //return this._http.get(environment.origin_host + 'api/doctorsWithPaginationByFieldByIdClinic' + strpar, {headers:_headers}).pipe(map((response: any) => response.json()));
  }

  deleteDoctor(params){
    let headers = new Headers();
    //let _headers = new HttpHeaders;
    this.loadToken();
    headers.append('Authorization', this.authToken);
    //_headers.append('Authorization', this.authToken);
    return this.http.delete(environment.origin_host + 'api/userDoctor/' + params.id, {headers: headers}).map(res => res.json());
    //return this._http.delete(environment.origin_host + 'api/userDoctor/' + params.id, {headers:_headers}).pipe(map((response: any) => response.json()));
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  editDoctor(params: any, id: number) {
    let endPoint = 'api/userDoctor/';
    let headers = new Headers();
    //let _headers = new HttpHeaders;
    this.loadToken();
    headers.append('Authorization', this.authToken);
    //_headers.append('Authorization', this.authToken);
    return this.http.put(environment.origin_host + endPoint + id, params, {headers: headers}).map(res => res.json());
    //return this._http.put(environment.origin_host + endPoint + id, params, {headers:_headers}).pipe(map((response: any) => response.json()));
  }

  addDoctor(params: any){
    let endPoint = 'register/userDoctor';
    let headers = new Headers();
    //let _headers = new HttpHeaders;
    //this.loadToken();
    //headers.append('Authorization', this.authToken);
    return this.http.post(environment.origin_host + endPoint , params, {headers: headers}).map(res => res.json());
    //return this._http.post(environment.origin_host + endPoint, params, {headers:_headers}).pipe(map((response: any) => response.json()));
  }

}
