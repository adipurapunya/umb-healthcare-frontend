import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {environment} from '../../environments/environment'
import * as CryptoJS from 'crypto-js';
import { map } from "rxjs/operators";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable()
export class ProfileService {

  authToken: any;
  user: any;

  constructor(private http: Http, private _http: HttpClient) {
  }

  getProfile() {
    let endPoint = '';
    let headers = new Headers();
    //let _headers = new HttpHeaders;
    this.loadToken();
    this.loadUser();

    if(this.user.roles == 'ROLE_ADMIN'){
      endPoint = 'api/userAdmin/';
    }
    else if(this.user.roles == 'ROLE_CLINIC'){
      endPoint = 'api/userClinic/';
    }
    else if(this.user.roles == 'ROLE_NURSE'){
      endPoint = 'api/userNurse/';
    }
    else if(this.user.roles == 'ROLE_DOCTOR'){
      endPoint = 'api/userDoctor/';
    }
    else if(this.user.roles == 'ROLE_PATIENT'){
      endPoint = 'api/userPatient/';
    }

    headers.append('Authorization', this.authToken);
    //_headers.append('Authorization', this.authToken);
    return this.http.get(environment.origin_host + endPoint + this.user.id, {headers: headers}).map(res => res.json());
    //return this._http.get(environment.origin_host + endPoint + this.user.id, {headers:_headers}).pipe(map((response: any) => response.json()));
  }

  editProfile(params: any, id: number) {
    let endPoint = '';
    let headers = new Headers();
    //let _headers = new HttpHeaders;
    this.loadToken();
    headers.append('Authorization', this.authToken);
    //_headers.append('Authorization', this.authToken);

    if(this.user.roles == 'ROLE_ADMIN'){
      endPoint = 'api/userAdmin/';
    }
    else if(this.user.roles == 'ROLE_CLINIC'){
      endPoint = 'api/userClinic/';
    }
    else if(this.user.roles == 'ROLE_NURSE'){
      endPoint = 'api/userNurse/';
    }
    else if(this.user.roles == 'ROLE_DOCTOR'){
      endPoint = 'api/userDoctor/';
    }
    else if(this.user.roles == 'ROLE_PATIENT'){
      endPoint = 'api/userPatient/';
    }

    return this.http.put(environment.origin_host + endPoint + id, params, {headers: headers}).map(res => res.json());
    //return this._http.put(environment.origin_host + endPoint + id, params, {headers:_headers}).pipe(map((response: any) => response.json()));
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loadUser() {
    const user = localStorage.getItem('user');
    this.user = JSON.parse(user);
  }

  getUser(){
    return this.user;
  }

  encryptedText = function (text) {
    var iterationCount = 1000;
    var keySize = 128;
    var passPhrase = environment.passPhrase;
    var dataToDecrypt = text; //The base64 encoded string output from Java;
    var iv = environment.iv;
    var salt = environment.salt;

    var AesUtil = function (keySize, iterationCount) {
      this.keySize = keySize / 32;
      this.iterationCount = iterationCount;
    };

    AesUtil.prototype.generateKey = function (salt, passPhrase) {
      var key = CryptoJS.PBKDF2(passPhrase, CryptoJS.enc.Hex.parse(salt),
        {keySize: this.keySize, iterations: this.iterationCount});
      return key;
    };

    AesUtil.prototype.encrypt = function (salt, iv, passPhrase, plainText) {
      var key = this.generateKey(salt, passPhrase);
      var encrypted = CryptoJS.AES.encrypt(
        plainText,
        key,
        {iv: CryptoJS.enc.Hex.parse(iv)});
      return encrypted.toString();
    };

    var aesUtil = new AesUtil(keySize, iterationCount);
    var plaintext = aesUtil.encrypt(salt, iv, passPhrase, dataToDecrypt);

    return plaintext;
  }

}
