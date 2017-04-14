import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms'

import {IMyOptions, IMyDateModel} from 'mydatepicker';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  profile = {};
  myForm : FormGroup

  constructor(private auth: AuthService) {
    this.profile['name'] = localStorage.getItem('name')
    this.profile['picture'] = localStorage.getItem('picture')
    this.myForm = new FormGroup({
      'email': new FormControl(),
      'name': new FormControl(this.profile['name']),
      'children': new FormArray([
        new FormGroup({
          name: new FormControl('Tee Gee'),
          dob: new FormControl()
        }),
        
      ])
    })
   }

   addChild(){
     (<FormArray>this.myForm.controls['children']).push(new FormGroup({
       'name': new FormControl('', Validators.required),
       'dob': new FormControl('', Validators.required)
     }))
   }

   ngOnInit() {
    
    //his.profile['name'] = localStorage.getItem('name')
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


}
