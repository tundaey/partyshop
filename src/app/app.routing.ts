import { Routes, RouterModule } from '@angular/router';

import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component'
import { HomeComponent } from './home.component'
import { InviteComponent } from './invite/invite.component'
import { ProfileComponent } from './profile/profile.component'
import { PRODUCT_ROUTES } from './product/product.routes';
import { INVITE_ROUTES } from './invite/invite.routes';
import { FORM_ROUTES } from './forms/form.routes';
import { FormsComponent } from './forms/forms.component'

import { AuthGuard } from './auth.guard';

const APP_ROUTES: Routes =  [
    {path : '', component: HomeComponent},
    {path : 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
    {path : 'invite', component: FormsComponent, children: FORM_ROUTES},
    {path : 'invite/:id', component: ProductDetailComponent},
]

export const routes = RouterModule.forRoot(APP_ROUTES)