import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import  { Product } from '../../product/product'
import { BehaviorSubject, Observable } from   'rxjs/Rx'

@Injectable()
export class GiftService {

  products: Product[] = [];
  searched_products: Product[] = [];
  search_count: number = 50;
  search_offset: number = 1;
  search_limit: number = 20;

  //url = 'http://localhost:5000/api';
  url = 'https://partyshop-api.herokuapp.com/api' 

  constructor(private http: Http) { }

  getProducts(offset : number = 0, limit: number = 20){
     return this.http.get(`${this.url}/products/?offset=${offset}&limit=${limit}`)
      .map((response: Response)=> response.json())
  }

  searchProducts(query, offset : number = 0, limit: number = 3){
    console.log('query', query)
    return this.http.post(`${this.url}/search`, {query: query, offset: offset, limit: limit})
    .map((response: Response) => response.json())
  }

  getSearchProducts(query, offset : number = 0, limit: number = 3){
    this.searchProducts(query, offset, limit).subscribe(
      (data) => {
        this.searched_products = data.searchedProducts
      }
    )
  }

  getGifts(offset : number = 0, limit: number = 20){
    this.getProducts(offset, limit).subscribe(
      (data) => {
        console.log('products', data);
        this.products = data.products;
        let obj = {products: this.products, count: data.pages}
        return Observable.of(obj);
        //return Promise.resolve(obj);
    });
  }



}
