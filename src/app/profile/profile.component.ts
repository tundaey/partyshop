import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth.service';
import {ProfileService} from './profile.service'

import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms'

import {IMyOptions, IMyDateModel} from 'mydatepicker';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  profile = {};
  myForm : FormGroup;
  isSubmitting: boolean = false
  
  constructor(private auth: AuthService, private profileService: ProfileService) {

    this.myForm = new FormGroup({
      'email': new FormControl(this.profile['email']),
      'name': new FormControl(this.profile['name']),
      'children': new FormArray([ 
          new FormGroup({
            'name': new FormControl('Tee', Validators.required),
            'dob': new FormControl(new Date)
          })
       ])
    })

    const id = localStorage.getItem('user_id');
    profileService.getProfile(id).subscribe((userProfile) => {
      console.log(userProfile)
      this.removeChild(0)
      this.profile = userProfile;
      const children: FormArray = this.profile['children'].map((child)=>{
        (<FormArray>this.myForm.controls['children']).push(new FormGroup({
            'name': new FormControl(child.name, Validators.required),
             'dob': new FormControl(child.dob, Validators.required)}))
         }) 
            
      this.myForm.setValue({
        name: this.profile['name'],
        email: this.profile['email'],
        children: children
      })


    })

   }

   addChild(){
     (<FormArray>this.myForm.controls['children']).push(new FormGroup({
       'name': new FormControl('', Validators.required),
       'dob': new FormControl('', Validators.required)
     }))
   }

   removeChild(index: number){
     console.log('remove', index);
     (<FormArray>this.myForm.controls['children']).removeAt(index)
   }

   ngOnInit() {
    
  }

    private myDatePickerOptions: IMyOptions = {
        dateFormat: 'dd.mm.yyyy',
        editableDateField: false,
        openSelectorOnInputClick: true
  };

  //private placeholder: string = 'Select a date';

  onDateChanged(event: IMyDateModel) {
        // event properties are: event.date, event.jsdate, event.formatted and event.epoc
        console.log('date', event)
        //this.data['date'] = event.jsdate
  }

  onSubmit(){
    this.isSubmitting = true
    var profileData = this.myForm.value;
    profileData['id'] = localStorage.getItem('user_id');
    this.profileService.saveProfile(profileData)
    .subscribe((data) => {
      console.log('data', data);
      this.profile = data;
      const children: FormArray = this.profile['children'].map((child)=>{
        new FormGroup({
            'name': new FormControl(child.name, Validators.required),
            'dob': new FormControl(child.dob, Validators.required)})
      })
       
       this.isSubmitting = false   
      this.myForm.setValue({
        name: this.profile['name'],
        email: this.profile['email'],
        children: children
      })
      
    })
  }


}
