
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { OrderComponent } from '../Order/Order.component';
import { UserInformationComponent } from '../UserInformation/UserInformation.component';
import { CartComponent } from '../Cart/Cart.component';

const routes: Routes = [
  {path:'home', component: HomeComponent},
  {path:"Order",component:OrderComponent},
  {path:"information/:username",component:UserInformationComponent},
  {
    path:"Cart",component:CartComponent,
    // children:[{path:"Payment-infor",component:PaymentInforComponent}]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
