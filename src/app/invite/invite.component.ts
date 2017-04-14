import { Component, OnInit } from '@angular/core';
import { Product } from '../product/product';
import { ProductService } from '../product/product.service'
import { InviteService } from './invite.service';
import { Observable } from 'rxjs/Rx'
import {IMyOptions, IMyDateModel} from 'mydatepicker';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html'
})
export class InviteComponent implements OnInit {
   products: Product[] = []
  count: number = 50;
  offset: number = 1;
  limit: number = 3;

  isCompleted: boolean = false;
  invite_error: boolean = false;
  showPrev = true;
  busy: Observable<any>;

  private myDatePickerOptions: IMyOptions = {
        dateFormat: 'dd.mm.yyyy',
  };

  private placeholder: string = 'Select a date';

  onDateChanged(event: IMyDateModel) {
        // event properties are: event.date, event.jsdate, event.formatted and event.epoc
        console.log('date', event)
        this.data.date = event.jsdate
  }


  constructor(private productService: ProductService, private inviteService: InviteService) {
   }

  ngOnInit() {
     this.productService.getProducts().subscribe(
      (data) => {
        console.log('products', data);
        this.products = data.products;
        this.count = data.pages;
    });
  }

  data: any = {
    email: [],
    name: '',
    location: '',
    date: new Date(),
    message: '',
    phone_number: [],
    products: [],
    product_size: this.products.length
  };


  step1: any = {
    showNext: false,
    showPrev: false
  };

  step2: any = {
    showNext: true,
    showPrev: true
  };

  step3: any = {
    showSecret: false
  };

  onStep1Next(event){
    console.log('data', this.data)
  }

  onStep2Next(event){

  }

  onStep3Next(event){
    console.log('data', this.data)
  }

  onComplete(event) {
    this.inviteService.sendInvite(this.data).subscribe(
      (response) => {
        console.log('send invite', response);
        if(!status){
          this.invite_error = true;
          this.isCompleted = true;
        }else{
          this.isCompleted = true;
        }
      },
      (error) => {
        console.log('error', error)
      }
    )
    
  }

  onPageChange(offset){
    console.log('page changed', offset);
    this.offset = offset
    this.productService.getProducts(this.offset, this.limit)
    .subscribe(
      (data) => {
        this.products = data.products;
      }
    )
  }

  onAddTofavorites(product){
    this.data.products.push(product)
  }

}
