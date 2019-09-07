import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree,CanActivate} from '@angular/router';
import { Observable } from 'rxjs';
import{AngularFireAuth} from "@angular/fire/auth"
import { auth } from 'firebase';
import{map} from "rxjs/operators"
import { isNullOrUndefined } from 'util';
import{Router} from "@angular/router"
@Injectable({
  providedIn: 'root'
})
export class NoGuard implements CanActivate {
  constructor(private Afauth:AngularFireAuth,
    private router: Router){}
    canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ): Observable<boolean>| Promise<boolean>|boolean{
  
      return this.Afauth.authState.pipe(map(auth=>{
        if(isNullOrUndefined(auth)){
          
          return true;
        }else{
          this.router.navigate(['/tabs'])
          return false;
        }
       
      }))
  
    }
}
