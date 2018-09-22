import { Injectable } from '@angular/core';
import {Http, Headers} from "@angular/http";
import {environment} from "../../environments/environment.prod";

import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import {HttpHeaders, HttpClient} from "@angular/common/http";

@Injectable()
export class ServicesService {

  authToken: any;

  constructor(private http: Http, private _http: HttpClient) { }

  getAllServicesWithPaginationByIdClinic(page, size, srt, srtFld){
    var usersJSON = JSON.parse(localStorage.getItem('user'));
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    let strpar = '?page=' + page + '&size=' + size + '&sort=' + srt + '&sortField=' + srtFld + '&clinicId=' + usersJSON.clinic.id;
    return this.http.get(environment.origin_host + 'api/listOfservicesWithPaginationByIdClinic' + strpar, {headers: headers}).map(res => res.json());
  }


  getAllServicesWithPagination(page, size, srt, srtFld){
    var usersJSON = JSON.parse(localStorage.getItem('user'));
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    let strpar = '?page=' + page + '&size=' + size + '&sort=' + srt + '&sortField=' + srtFld;
    return this.http.get(environment.origin_host + 'api/listOfservicesWithPagination' + strpar, {headers: headers}).map(res => res.json());
  }

  getAllServicesWithPaginationBySearchFieldByIdClinic(page, size, srt, srtFld, searchFields, searchValue){
    var usersJSON = JSON.parse(localStorage.getItem('user'));
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    let strpar = '?page=' + page + '&size=' + size + '&sort=' + srt + '&sortField=' + srtFld + '&searchField=' + searchFields + '&value=' + searchValue + '&clinicId=' + usersJSON.clinic.id;
    return this.http.get(environment.origin_host + 'api/listOfservicesWithPaginationBySearchFieldByIdClinic' + strpar, {headers: headers}).map(res => res.json());
  }

  getAllServicesWithPaginationBySearchField(page, size, srt, srtFld, searchFields, searchValue){
    var usersJSON = JSON.parse(localStorage.getItem('user'));
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    let strpar = '?page=' + page + '&size=' + size + '&sort=' + srt + '&sortField=' + srtFld + '&searchField=' + searchFields + '&value=' + searchValue;
    return this.http.get(environment.origin_host + 'api/listOfservicesWithPaginationBySearchField' + strpar, {headers: headers}).map(res => res.json());
  }

  deleteService(params){
    var usersJSON = JSON.parse(localStorage.getItem('user'));
    let idClinic = usersJSON.clinic.id;
    let idService = params.id;
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    let strpar = '?clinicId=' + idClinic + '&serviceId=' + idService;
    return this.http.delete(environment.origin_host + 'api/deleteListOfServicesByIdClinicByIdService' + strpar, {headers: headers}).map(res => res.json());
  }

  editService(params: any, id: number){
    var usersJSON = JSON.parse(localStorage.getItem('user'));
    let idClinic = usersJSON.clinic.id

    let endPoint = 'api/listOfservices/'+id;
    let strpar = '?clinicId=' + idClinic;
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    return this.http.put(environment.origin_host + endPoint + strpar, params, {headers: headers}).map(res => res.json());
  }

  addService(params: any){
    var usersJSON = JSON.parse(localStorage.getItem('user'));
    let idClinic = usersJSON.clinic.id
    let endPoint = 'api/listOfservices';
    let strpar = '?clinicId=' + idClinic;
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    return this.http.post(environment.origin_host + endPoint + strpar , params, {headers: headers}).map(res => res.json());
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

}
