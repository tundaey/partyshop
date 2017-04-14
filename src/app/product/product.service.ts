import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Product } from './product';
import  'rxjs/Rx'

@Injectable()
export class ProductService {

  products: Product[] = [];
  //url = 'http://localhost:5000/api';
  url = 'https://partyshop-api.herokuapp.com/api' 
//products;

  constructor(private http: Http) { }

  getProducts(offset : number = 0, limit: number = 20){
     return this.http.get(`${this.url}/products/?offset=${offset}&limit=${limit}`)
      .map((response: Response)=> response.json())
  }

  searchProducts(query){
    console.log('query', query)
    return this.http.post(`${this.url}/search`, {query: query})
    .map((response: Response) => response.json())
  }

  getProduct(id){
    return this.http.get(`${this.url}/${id}`)
      .map((response: Response)=> response.json())
  }



}
