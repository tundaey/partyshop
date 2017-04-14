import { Routes } from '@angular/router'

import { ProductDetailComponent} from './product-detail/product-detail.component';

export const PRODUCT_ROUTES: Routes = [
    {path: ':id', component: ProductDetailComponent}
]