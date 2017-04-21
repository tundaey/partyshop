import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { FormDataService } from '../form.service';
import { InviteService } from '../../invite/invite.service'

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {

  isCompleted: boolean = false;
  invite_error: boolean = false;
  isSubmitting: boolean = false;
  limit = 6;
  offset = 1;
  count = 10
  products: any;
  data: any;

  constructor(private formData: FormDataService, private inviteService: InviteService, private router: Router) {
    this.data = formData.getData();
    this.products = this.data.products.slice(0,6);
    this.count = this.data.products.length;
   }

  ngOnInit() {
  }

  onPrevious(){
    this.router.navigate(['/invite/gifts'])
  }

  removeFromFavorites(product, event){
    this.formData.removeFromFavorites(product);
    this.products.splice(this.products.indexOf(product),1)
    //product.adding = true;
    const oldProduct = product
    product.added = undefined;
    //this.formData.addToFavorites(oldProduct, product)
  }

  onFinish(){
    console.log('data', this.data);
    this.isSubmitting = true;
    this.inviteService.sendInvite(this.data).subscribe(
      (response) => {
        console.log('send invite', response);
        if(!status){
          this.invite_error = true;
          this.isCompleted = true;
          this.isSubmitting = false;
          this.formData.setData({})
        }else{
          this.isCompleted = true;
          this.isSubmitting = false;
        }
      },
      (error) => {
        console.log('error', error)
      }
    )
  }

  onPageChange(offset){
    console.log('verify next page', offset);

  }

}
