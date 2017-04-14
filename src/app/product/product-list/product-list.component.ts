import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http'
import { Observable } from 'rxjs/Rx'


import { Product } from '../product';
import { ProductService } from '../product.service'
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = []
  count: number = 50;
  offset: number = 1;
  limit: number = 9;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getProducts().subscribe(
      (data) => {
        console.log('products', data);
        this.products = data.products;
        this.count = data.pages;
    });
  }

  onSelect(product){
    console.log(product)
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

}
