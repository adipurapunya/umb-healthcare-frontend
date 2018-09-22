import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Http,Headers, RequestOptions} from "@angular/http";
import {environment} from "../../environments/environment.prod";
import { map } from "rxjs/operators";

@Injectable()
export class EcgService {

  authToken: any;

  constructor(private http: Http, private _http: HttpClient) { }

  /*
  dailyForecast(){
    return this.http.get("https://samples.openweathermap.org/data/2.5/forecast/daily?id=524901&appid=b1b15e88fa797225412429c1c50c122a1")
      .map(result => result.json());
  }
  */

  getEcgValueByDeviceCodeAndDate(page, sze, srt, srtFld, deviceCode, date){
    let headers = new Headers();
    //let _headers = new HttpHeaders;
    this.loadToken();
    var usersJSON = JSON.parse(localStorage.getItem('user'));
    headers.append('Authorization', this.authToken);
    //_headers.append('Authorization', this.authToken);
    let strpar = '?page=' + page + '&size=' + sze + '&sort=' + srt + '&sortField=' + srtFld + '&ecgCode=' + deviceCode + '&date=' +date;
    return this.http.get(environment.origin_host + 'api/ecgWithPaginationByEcgCodeAndDate' + strpar, {headers: headers}).map(res => res.json());
    //return this._http.get(environment.origin_host + 'api/ecgWithPaginationByEcgCodeAndDate' + strpar, {headers:_headers}).pipe(map((response: any) => response.json()));

  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

}
