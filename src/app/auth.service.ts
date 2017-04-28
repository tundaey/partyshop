import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable, Subject } from 'rxjs'
import { Http, Response } from '@angular/http'
import {Router } from '@angular/router'
import { FacebookLoginResponse, FacebookService, FacebookLoginStatus} from 'ng2-facebook-sdk'

@Injectable()
export class AuthService {

  //url = 'http://localhost:5000/api';
  url = 'https://partyshop-api.herokuapp.com/api' 
  
  isLogin: boolean;
  constructor(private fb: FacebookService, private router: Router, private http: Http) {
      fb.init({
        appId: '271586176627972',
        version: 'v2.8'
      });
   }

   getProfile(){
     const token = localStorage.getItem('token')
     const user_id = localStorage.getItem('user_id')
     console.log('user id', user_id);
     return this.fb.api('/me',"get",{ access_token: token, fields: 'id,name,gender,picture,email' })   
   }

   saveUser(user){
      console.log('profile', user)
    return this.http.post(`${this.url}/user`, {user: user})
    .map((response: Response) => response.json())
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
