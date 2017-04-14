import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { AuthService } from './auth.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  isAuthenticated: boolean
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

   login(){
    const loginOptions = {
      enable_profile_selector: true,
      return_scopes: true,
      scope: 'public_profile,user_friends,email,pages_show_list'
    };
    this.auth.onLogin(loginOptions).then(
      (response) => {
         console.log('response', response)
        localStorage.setItem('token', response.authResponse.accessToken)
        localStorage.setItem('user_id', response.authResponse.userID)
        this.auth.getProfile().then(
          (data) => {
            console.log('data', data)
            //localStorage.setItem('name', data.name)
            this.auth.isLogin = true;
            this.router.navigateByUrl('/invite')
          }
        )
        
      }
    ) 
   }

}
