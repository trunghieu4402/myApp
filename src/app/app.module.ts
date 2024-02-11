import { product } from './Model/product.model';
import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { LogComponent } from './Log/Log.component';
import { LoginComponent } from './Log/Login/Login.component';
import { SignUpComponent } from './Log/SignUp/SignUp.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpHeaderResponse } from '@angular/common/http';

import { CustomerModule } from './customer/customer.module';
import { HomeComponent } from './home/home.component';
import { AdminModule } from './admin/admin.module';
import { ProductmanagementComponent } from './admin/components/productmanagement/productmanagement.component';
import { AuthService } from './service/Authenticate/Auth.service';
import { UserStorageService } from './service/storage/user-storage.service';
import { DetailProductComponent } from './DetailProduct/DetailProduct.component';
import { CartComponent } from './Cart/Cart.component';
@NgModule({
  declarations: [			
    AppComponent,
    LogComponent,
    LoginComponent,
    SignUpComponent,
    HomeComponent,
    ProductmanagementComponent,
    DetailProductComponent,
      CartComponent
   ],
  imports: [
    AdminModule,
    MaterialModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CustomerModule,
  ],
  providers: [
    provideClientHydration(),
    AuthService,
    UserStorageService,
    HttpHeaderResponse,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
