import { Component, OnInit, Input } from '@angular/core';
import { FormDataService } from './form.service'

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {
  loadingStatus: boolean;
  title = 'Multi-Step Wizard';
    @Input() formData;
    
    constructor(private formDataService: FormDataService) {
      // formDataService.getLoadingStatus().subscribe(
      //   (status) => this.loadingStatus = status
      // )
    }
 
    ngOnInit() {
        this.formData = this.formDataService.getData();
        console.log(this.title + ' loaded!');
    }
}
