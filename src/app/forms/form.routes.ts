import { Routes } from '@angular/router'

import { ProductListComponent } from '../product/product-list/product-list.component'
import { CreateComponent } from './create/create.component';
import { GiftsComponent } from './gifts/gifts.component';
import { VerifyComponent } from './verify/verify.component';

export const FORM_ROUTES: Routes = [
    {path: 'create', component: CreateComponent},
    {path: 'gifts', component: GiftsComponent},
    {path: 'verify', component: VerifyComponent}
]
