import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../auth.service' 

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  @Input() isLoggedIn: boolean;
  constructor(private auth: AuthService) { }

  ngOnInit() {
    //console.log('header login', this.loginStatus)
    //this.loginStatus = this.auth.isLoggedIn
  }

  login(){
    this.auth.login();
  }

  logout(){
    console.log('logout')
    this.auth.logout();
  }

}
