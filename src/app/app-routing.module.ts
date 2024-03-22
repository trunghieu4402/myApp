import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LogComponent } from './Log/Log.component';
import { LoginComponent } from './Log/Login/Login.component';
import { SignUpComponent } from './Log/SignUp/SignUp.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DetailProductComponent } from './DetailProduct/DetailProduct.component';
import { CartComponent } from './Cart/Cart.component';
import { UserInformationComponent } from './UserInformation/UserInformation.component';
import { PaymentInforComponent } from './PaymentInfor/PaymentInfor.component';
import { OrderComponent } from './Order/Order.component';

const routes: Routes = [
  {path: "home",component: HomeComponent},
  { path: "customer", 
  loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule)}, 
  {path:"detail/:id",component:DetailProductComponent},
  
  {path:"",component:UserInformationComponent},
{ path: "admin", loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
{
  path:"signup", component:LogComponent,
  children:[{path:"",component:SignUpComponent}]
},

{path:"Cart/Payment-infor",component:PaymentInforComponent},
{
  path:"login", component:LogComponent,
  children:[{path:"",component:LoginComponent}]
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
