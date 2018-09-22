import {Injectable} from "@angular/core";
import { HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class Interceptor implements HttpInterceptor{

  intercept(req: HttpRequest<any>, next: HttpHandler){

    const token = localStorage.getItem('id_token');

    const request = req.clone({
      headers : req.headers.set('Authorization', token)
    });
    //console.log(request);
    //console.log(request.body);
    return next.handle(request);
  }
}
