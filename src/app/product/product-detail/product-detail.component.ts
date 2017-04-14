import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProductService } from '../product.service';
import { Product } from '../product'

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html'
})
export class ProductDetailComponent implements OnInit, OnDestroy {

  id: number;
  sub: any;
  product: Product;
  constructor(private route: ActivatedRoute, private productService: ProductService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(
      (params: any) =>{
        this.id = params['id'];
        console.log(this.id)
        this.productService.getProduct(this.id).subscribe(
          (data) => {
            this.product = data.product;
            console.log('product', this.product);
        });
      }
    )
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
