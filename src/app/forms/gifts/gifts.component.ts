import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

import { ProductService } from '../../product/product.service'
import { FormDataService } from '../form.service';


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
limit: number = 3;

openResults : boolean = true;

  constructor(
    private productService: ProductService, 
    private router: Router,
    private formData: FormDataService) { 
      this.data = formData.getData(); 
      console.log('gifts data', this.data);
  }

  ngOnInit() {
    this.formData.getProducts().subscribe(
        (returnedProducts) => {
          console.log('returned products', returnedProducts)
          this.products = returnedProducts.products
          console.log('gift products', this.products)
          this.count = returnedProducts.count
          this.offset = returnedProducts.offset
          this.limit = returnedProducts.limit;
        }
      )
  }
  
  onAddTofavorites(product, event){
      const oldProduct = product
      product.adding = true;
      product.added = true
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

  changeAddButtonState(adding, added, buttonText){

  }

  changeRemoveButtonState(adding, added){

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
    this.productService.getProducts(this.offset, this.limit)
    .subscribe(
      (data) => {
        this.products = data.products;
      }
    )
  }

  onSearch(form){
    console.log('search form',form.value.query);
    this.isRequesting = true;
    const query = form.value.query;
    this.productService.searchProducts(query).subscribe(
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
