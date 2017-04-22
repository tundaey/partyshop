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
favoritedProducts: any;
searchResults: boolean = false;
isRequesting : boolean = false;
data: any;
addingProduct: boolean = false;
addToFavorites = 'Adauga la Favorite'
count: number = 50;
offset: number = 1;
limit: number = 3;

search_count: number = 50;
search_offset: number = 1;
search_limit: number = 3;

openResults : boolean = true;
openSearchResults : boolean = true;

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
        if(current_products.length > 0){
          console.log('hello')
          this.products = current_products;
        }else{
          console.log('world')
          this.formData.setProducts(data.products);
          this.products = this.formData.getGifts();
           this.favoritedProducts = this.products.slice(0, 3);
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

  hideResult(){
    this.openResults = !this.openResults;
  }

  hideSearchResult(){
    this.openSearchResults = !this.openSearchResults;
  }

  onPrevious(){
    this.router.navigate(['/invite/create'])
  }

  onPageChange(offset){
    console.log('page changed', offset);
    this.isRequesting = true;
    this.offset = offset
    this.giftService.getProducts(this.offset, this.limit)
    .subscribe(
      (data) => {
        this.formData.setProducts(data.products);
        this.products = this.formData.getGifts();
        this.isRequesting = false;
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
        //form.reset();
      }
    )
  }

  onSearchPageChange(offset, form){
    console.log('seach next page', offset);
    const query = form.value.query;
    console.log('page changed', offset);
    this.isRequesting = true;
    this.search_offset = offset
    this.giftService.searchProducts(query, this.search_offset, this.search_limit)
    .subscribe(
      (data) => {
        this.formData.setProducts(this.products);
        this.searchedProducts = data.searchedProducts
        this.isRequesting = false;
      }
    )
  }


}
