import { Component, OnInit , OnDestroy, OnChanges } from '@angular/core';
import { RouterModule, Router} from '@angular/router';
import { AuthService } from './auth.service';
import { FormDataService } from './forms/form.service'
import { Subscription, Observable} from 'rxjs/Rx';

import { FacebookLoginResponse, FacebookService, FacebookLoginStatus} from 'ng2-facebook-sdk'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,OnDestroy {
  isAuthenticated: boolean;
  isLoggedIn: Observable<boolean>;
  showMobileMenu: boolean = true;
  
  private subscription: Subscription;

  constructor(private auth: AuthService, private formService: FormDataService, private router: Router, private fb: FacebookService){
    fb.init({
        appId: '271586176627972',
        version: 'v2.8'
      });
      
      //this.isAuthenticated = auth.isLoggedIn();
      const token = localStorage.getItem('token')
      if(token){
        this.isAuthenticated = true
        this.auth.isLogin = true;
      }else{
        this.isAuthenticated = false
      }
      console.log('isAuthenticated', auth.isLoggedIn())
  }

  ngOnInit(){    
  }

  ngOnDestroy(){
    //this.subscription.unsubscribe();
  }

  createInvite(){
    this.showMobileMenu = false;
    //this.router.navigate(['/invite/create'])
  }

  isAuth(){
    return this.isAuthenticated;
    // this.auth.isAuthenticated().subscribe(
    //   authStatus => {this.isAuthenticated = authStatus; console.log('auth status')}
    // );
  }

  login(){

    const loginOptions = {
      enable_profile_selector: true,
      return_scopes: true,
      scope: 'public_profile,user_friends,email,pages_show_list'
    };

    this.fb.login(loginOptions).then(
      (response: FacebookLoginResponse) => {
         console.log('response', response)
         localStorage.setItem('token', response.authResponse.accessToken)
         localStorage.setItem('user_id', response.authResponse.userID)
         this.auth.getProfile().then(
          (data) => {
            console.log('profile data', data)
            localStorage.setItem('name', data.name)
            localStorage.setItem('gender', data.gender)
            localStorage.setItem('picture', data.picture.data.url)
            this.auth.isLogin = true;
            this.router.navigateByUrl('/profile')
          }
        )
        
      }
    ) 
   }


  logOut(){
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('name');
    localStorage.removeItem('name')
    localStorage.removeItem('gender')
    localStorage.removeItem('picture')
    this.isAuthenticated = false
    this.auth.isLogin = false
    this.router.navigate([''])
  }
}
