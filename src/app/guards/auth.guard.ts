import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {AuthService} from '../services/auth.service';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authSercice: AuthService, private router: Router){

  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): boolean{

    if(this.authSercice.loggedIn()){

      let getRoles = route.data["roles"] as Array<string>;
      let usersJSON = JSON.parse(localStorage.getItem('user'));

      if(getRoles!=null){
        if(getRoles.indexOf(usersJSON.roles[0]) == -1){
          //console.log("Unauthorized");
          this.router.navigate(['/unauthorized']);
          return false;
        }
      }
      return true;
    }
    else {
      this.router.navigate(['/login']);
      return false;
    }
  }

}
