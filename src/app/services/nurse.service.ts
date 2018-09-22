import { Injectable } from '@angular/core';
import {Http, Headers} from "@angular/http";
import {environment} from "../../environments/environment.prod";
import { map } from "rxjs/operators";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable()
export class NurseService {

  authToken: any;
  user: any;

  constructor(private http: Http, private _http: HttpClient) { }

  getNurses(page, sze, srt, srtFld) {
    let headers = new Headers();
    //let _headers = new HttpHeaders;
    this.loadToken();
    headers.append('Authorization', this.authToken);
    //_headers.append('Authorization', this.authToken);
    let strpar = '?page=' + page + '&size=' + sze + '&sort=' + srt + '&sortField=' + srtFld;
    return this.http.get(environment.origin_host + 'api/nursesWithPagination' + strpar, {headers: headers}).map(res => res.json());
    //return this._http.get(environment.origin_host + 'api/nursesWithPagination' + strpar, {headers:_headers}).pipe(map((response: any) => response.json()));
  }

  getNursesByClinic(page, sze, srt, srtFld) {
    let headers = new Headers();
    //let _headers = new HttpHeaders;
    this.loadToken();
    var usersJSON = JSON.parse(localStorage.getItem('user'));
    headers.append('Authorization', this.authToken);
    //_headers.append('Authorization', this.authToken);
    let strpar = '?page=' + page + '&size=' + sze + '&sort=' + srt + '&sortField=' + srtFld + '&clinicId=' + usersJSON.clinic.id;
    return this.http.get(environment.origin_host + 'api/nursesWithPaginationByIdClinic' + strpar, {headers: headers}).map(res => res.json());
    //return this._http.get(environment.origin_host + 'api/nursesWithPaginationByIdClinic' + strpar, {headers:_headers}).pipe(map((response: any) => response.json()));
  }

  getNursesBySearchField(page, sze, srt, srtFld, searchFields, searchValue) {
    let headers = new Headers();
    //let _headers = new HttpHeaders;
    this.loadToken();
    headers.append('Authorization', this.authToken);
    //_headers.append('Authorization', this.authToken);
    let strpar = '?page=' + page + '&size=' + sze + '&sort=' + srt + '&sortField=' + srtFld + '&searchField=' + searchFields + '&value=' + searchValue;
    return this.http.get(environment.origin_host + 'api/nursesWithPaginationByField' + strpar, {headers: headers}).map(res => res.json());
    //return this._http.get(environment.origin_host + 'api/nursesWithPaginationByField' + strpar, {headers:_headers}).pipe(map((response: any) => response.json()));
  }

  getNursesBySearchFieldByIdClinic(page, sze, srt, srtFld, searchFields, searchValue) {
    let headers = new Headers();
    //let _headers = new HttpHeaders;
    this.loadToken();
    var usersJSON = JSON.parse(localStorage.getItem('user'));
    headers.append('Authorization', this.authToken);
    //_headers.append('Authorization', this.authToken);
    let strpar = '?page=' + page + '&size=' + sze + '&sort=' + srt + '&sortField=' + srtFld + '&searchField=' + searchFields + '&value=' + searchValue + '&clinicId=' + usersJSON.clinic.id;
    return this.http.get(environment.origin_host + 'api/nursesWithPaginationByFieldByIdClinic' + strpar, {headers: headers}).map(res => res.json());
    //return this._http.get(environment.origin_host + 'api/nursesWithPaginationByFieldByIdClinic' + strpar, {headers:_headers}).pipe(map((response: any) => response.json()));
  }

  deleteNurse(params){
    let headers = new Headers();
    //let _headers = new HttpHeaders;
    this.loadToken();
    headers.append('Authorization', this.authToken);
    //_headers.append('Authorization', this.authToken);
    return this.http.delete(environment.origin_host + 'api/userNurse/' + params.id, {headers: headers}).map(res => res.json());
    //return this._http.delete(environment.origin_host + 'api/userNurse/' + params.id, {headers:_headers}).pipe(map((response: any) => response.json()));
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  editNurse(params: any, id: number) {
    let endPoint = 'api/userNurse/';
    let headers = new Headers();
    //let _headers = new HttpHeaders;
    this.loadToken();
    headers.append('Authorization', this.authToken);
    //_headers.append('Authorization', this.authToken);
    return this.http.put(environment.origin_host + endPoint + id, params, {headers: headers}).map(res => res.json());
    //return this._http.put(environment.origin_host + endPoint + id, params, {headers:_headers}).pipe(map((response: any) => response.json()));
  }

  addNurse(params: any){
    let endPoint = 'register/userNurse';
    let headers = new Headers();
    //let _headers = new HttpHeaders;
    //this.loadToken();
    //headers.append('Authorization', this.authToken);
    return this.http.post(environment.origin_host + endPoint , params, {headers: headers}).map(res => res.json());
    //return this._http.post(environment.origin_host + endPoint, params, {headers:_headers}).pipe(map((response: any) => response.json()));
  }

}
