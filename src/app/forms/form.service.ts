import { Injectable }  from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs/Rx'

import { FormData }       from './form';
import { GiftService } from './gifts/gift.service';
import { Product } from '../product/product';

@Injectable()
export class FormDataService {
    
    data = {
        email: [],
        name: '',
        location: '',
        date: new Date(),
        email_date: {},
        message: '',
        phone_number: [],
        products: [],
        product_size: 0
    }

    products: Product[];
    //products: Observable<Product[]>
    count: number = 50;
    offset: number = 1;
    limit: number = 20;
    products_loaded: boolean;

    constructor(private giftService: GiftService){
        this.products_loaded = false;
        giftService.getProducts().subscribe(
            (data) => {
            console.log('service products', data.products);
            this.products = data.products;
            this.products_loaded = true;
            this.count = data.pages;
        });
    }

    getProducts(){
        const obj =  { 
            products: this.products, 
            count: this.count,
            offset: this.offset,
            limit: this.limit
        }
        
        let subject = new BehaviorSubject(obj);
        return subject.asObservable()
    }

    getLoadingStatus(){
        let subject = new BehaviorSubject(this.products_loaded)
        return subject.asObservable();
    }

    setProducts(products){
        this.products = products
    }

    getGifts(){
        return this.products;
    }

    addToFavorites(oldProduct, newProduct){
        console.log('new product', newProduct)
        this.products[this.products.indexOf(oldProduct)] = newProduct;
        this.data.products.push(oldProduct);
    }

    removeFromFavorites(product){
        console.log('remove', this.products.indexOf(product))
        this.data.products.splice(this.data.products.indexOf(product),1)
    }
    
    getData(): FormData {
        return this.data;
    }

    setData(data) {
        this.data = data;
    }
}