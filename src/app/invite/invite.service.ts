import { Injectable } from '@angular/core';
import { FormWizardModule } from 'angular2-wizard';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import  'rxjs/Rx'

@Injectable()
export class InviteService {
  invite = {};
   //url = 'http://localhost:5000/api'
   url = 'https://partyshop-api.herokuapp.com/api'
  
  constructor(private http: Http) { 
    
  }

  addToInvite(obj, value){
    this.invite[obj] = value
    console.log('added invite', this.invite)
  }

  getInvite(){
    return this.invite;
  }

  

  sendInvite(invite){
    console.log('invite', invite)
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(`${this.url}/invite`, invite, options)
      .map((response: Response)=> response.json())
  }

}
