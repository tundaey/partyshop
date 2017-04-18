import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import {IMyOptions, IMyDateModel} from 'mydatepicker';
import { FormDataService } from '../form.service'

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  data = {};
  myDate = new Date();

  constructor(private formService: FormDataService, private router: Router) { }

  ngOnInit() {
    this.data = this.formService.getData();
    console.log('data', this.data)
  }

   private myDatePickerOptions: IMyOptions = {
        dateFormat: 'dd.mm.yyyy',
        editableDateField: false,
        openSelectorOnInputClick: true
  };

  private placeholder: string = 'Select a date';

  onDateChanged(event: IMyDateModel) {
        // event properties are: event.date, event.jsdate, event.formatted and event.epoc
        console.log('date', event)
        this.data['date'] = event.jsdate
        this.data['email_date'] = event.date
  }

  onNext(){
    console.log('form data', this.data);
    this.formService.setData(this.data)
    this.router.navigate(['/invite/gifts'])
  }

}
