import { Injectable} from '@angular/core'
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router'
import { Observable } from 'rxjs/Rx'
import { AuthService } from './auth.service'

@Injectable()
export class AuthGuard implements CanActivate{
    
    constructor(private auth: AuthService){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        //console.log('guard status', this.auth.isAuthenticated().first())
        //return this.auth.isAuthenticated().first();
        const token = localStorage.getItem('token');
        console.log('guard token', token)
        if(token){
            return true
        }else{
            return false
        }
    }
}