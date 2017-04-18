import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable, Subject } from 'rxjs'
import {Router } from '@angular/router'
import { FacebookLoginResponse, FacebookService, FacebookLoginStatus} from 'ng2-facebook-sdk'

@Injectable()
export class AuthService {
  
  isLogin: boolean;
  constructor(private fb: FacebookService, private router: Router) {
      fb.init({
        appId: '271586176627972',
        version: 'v2.8'
      });
   }

   getProfile(){
     const token = localStorage.getItem('token')
     const user_id = localStorage.getItem('user_id')
     console.log('user id', user_id);
     return this.fb.api('/me',"get",{ access_token: token, fields: 'id,name,gender,picture' })
      
   }

   isAuthenticated(): Observable<boolean>{
     const subject = new Subject<boolean>();
     const token = localStorage.getItem('token');
     console.log('auth service token', token)
     if(!token || token === null){
        subject.next(false)
     }else{
        subject.next(true)
     }
     return subject.asObservable();
   }

   isLoggedIn(){
     const token = localStorage.getItem('token');
     console.log('auth service token', token)
     if(!token || token === null){
        return false
     }else{
        return false;
     }
   }

   onLogin(options){
     return this.fb.login(options);
   }
   

   login(){
     const subject = new Subject<boolean>();
     this.fb.login().then(
       (response: FacebookLoginResponse) => {
         localStorage.setItem('token', response.authResponse.accessToken)
         const token = window.localStorage.getItem('token');
         console.log('login token', token);
         subject.next(true)
        },
       (error: any) => {
         console.log('error', error)
         subject.next(false);
        }
     )
     return subject.asObservable();
   }

   logout(){
     window.localStorage.removeItem('token');
     //this.isLoggedIn = false;
     this.router.navigate([''])
   }

}
