import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

import { ProductService } from '../../product/product.service'
import { FormDataService } from '../form.service';
import { GiftService } from './gift.service'


@Component({
  selector: 'app-gifts',
  templateUrl: './gifts.component.html',
  styleUrls: ['./gifts.component.css']
})
export class GiftsComponent implements OnInit {
products: any;
searchedProducts: any;
searchResults: boolean = false;
isRequesting : boolean = false;
data: any;
addingProduct: boolean = false;
addToFavorites = 'Adauga la Favorite'
count: number = 50;
offset: number = 1;
limit: number = 20;

openResults : boolean = true;

  constructor(
    private giftService: GiftService, 
    private router: Router,
    private formData: FormDataService) { 
      this.data = formData.getData(); 
      console.log('gifts data', this.data);
  }

  ngOnInit() {
    this.isRequesting = true;
    this.giftService.getProducts().subscribe(
      (data) => {
        console.log('products', data);
        const current_products = this.formData.getGifts();
        console.log('current products', current_products)
        if(current_products.length > 0){
          console.log('hello')
          this.products = current_products
        }else{
          console.log('world')
          this.formData.setProducts(data.products);
          this.products = this.formData.getGifts();
        }
        
        //this.products = data.products;
        this.count = data.pages;
        this.isRequesting = false;
    });
    
  }
  
  onAddTofavorites(product, event){
      const oldProduct = product
      product.adding = true;
      product.added = true;
      this.formData.addToFavorites(oldProduct, product)
      event.target.innerText = 'Adding...'
      setInterval(() => {
        product.adding = false
        this.addingProduct = false;
        //event.target.innerText = 'Remove from Favorites'
      }, 2000)
  }

  removeFromFavorites(product, event){
    this.formData.removeFromFavorites(product);
    //product.adding = true;
    const oldProduct = product
    product.added = undefined;
    //this.formData.addToFavorites(oldProduct, product)
  }


  onNext(){
    this.data.product_size = this.data.products.length
    this.formData.setData(this.data)
    this.router.navigate(['/invite/verify'])
  }

  onPrevious(){
    this.router.navigate(['/invite/create'])
  }

  onPageChange(offset){
    console.log('page changed', offset);
    this.offset = offset
    this.giftService.getProducts(this.offset, this.limit)
    .subscribe(
      (data) => {
        this.products = data.products;
        this.formData.setProducts(this.products);
      }
    )
  }

  onSearch(form){
    console.log('search form',form.value.query);
    this.isRequesting = true;
    const query = form.value.query;
    this.giftService.searchProducts(query).subscribe(
      (data) => {
        console.log('searchProducts', data);
        this.searchResults = true;
        this.searchedProducts = data.searchedProducts;
        this.isRequesting = false;
        form.reset();
      }
    )
  }


}
