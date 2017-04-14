import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { FooterComponent } from './footer/footer.component';
import { ProductComponent } from './product/product.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';

import { routes } from './app.routing';

import { ProductService} from './product/product.service';
import { AuthService} from './auth.service';
import { AuthGuard } from './auth.guard';
import { FacebookService } from 'ng2-facebook-sdk'
import { InviteService } from './invite/invite.service';
import { FormDataService } from './forms/form.service'

import { FormWizardModule } from 'angular2-wizard';
import { TagInputModule } from 'ng2-tag-input';
import { MyDatePickerModule } from 'mydatepicker';



import { PaginateComponent } from './paginate/paginate.component';
import { HomeComponent } from './home.component';
import { InviteComponent } from './invite/invite.component';
import { ProfileComponent } from './profile/profile.component';
import { FormsComponent } from './forms/forms.component';
import { CreateComponent } from './forms/create/create.component';
import { GiftsComponent } from './forms/gifts/gifts.component';
import { VerifyComponent } from './forms/verify/verify.component';
import { NavbarComponent } from './forms/navbar/navbar.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductListComponent,
    FooterComponent,
    ProductComponent,
    ProductDetailComponent,
    PaginateComponent,
    HomeComponent,
    InviteComponent,
    ProfileComponent,
    FormsComponent,
    CreateComponent,
    GiftsComponent,
    VerifyComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    FormWizardModule,
    TagInputModule,
    MyDatePickerModule,
    NglModule.forRoot(),
    HttpModule, 
    routes
  ],
  providers: [ProductService, FacebookService, AuthService, AuthGuard, InviteService, FormDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
