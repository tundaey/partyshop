import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http'

@Injectable()
export class ProfileService {

//url = 'http://localhost:5000/api';
  url = 'https://partyshop-api.herokuapp.com/api' 
  constructor(private http: Http) {

   }

   saveProfile(profile){
    console.log('profile', profile)
    return this.http.post(`${this.url}/profile`, {profile: profile})
    .map((response: Response) => response.json())
  }

  getProfile(id){
    return this.http.get(`${this.url}/profile/${id}`)
    .map((response: Response) => response.json())
  }

}


