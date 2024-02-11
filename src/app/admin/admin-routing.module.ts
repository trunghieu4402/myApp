import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductmanagementComponent } from './components/productmanagement/productmanagement.component';
import { ProductComponent } from './components/productmanagement/product/product.component';
import { CategoryComponent } from './components/productmanagement/category/category.component';
import { HomeComponent } from '../home/home.component';
import { AddFormCateComponent } from './components/productmanagement/category/add-form-cate/add-form-cate.component';
import { AddProductComponent } from './components/productmanagement/product/add-product/add-product.component';
import { FixProdcutComponent } from './components/productmanagement/product/fix-prodcut/fix-prodcut.component';
import { EditCategoryComponent } from './components/productmanagement/category/EditCategory/EditCategory.component';
import { CustomermanagementComponent } from './components/customermanagement/customermanagement.component';

const routes: Routes = [
  {path:'home', component:HomeComponent},
  //   {path:'productmanagement',component:ProductmanagementComponent, children:
  // [
  //   {path:'product', component:ProductComponent},
  //   {path:'category',component:CategoryComponent},
  // ]},
  { path: 'productmanagement', component: ProductmanagementComponent, children: [
    { path: '', redirectTo: 'product', pathMatch: 'full' },
    { path: 'product', component: ProductComponent, children:
      [
        {path:'Add', component:AddProductComponent},
        {path:'Edit', component:FixProdcutComponent},
      ] 
    },
    { path: 'category', component: CategoryComponent, children:
      [ 
        {path:'Add', component:AddFormCateComponent},
        {path:'Edit', component:EditCategoryComponent},
      ] 
    }
  ]},
  {path:'CustomerManagement', component:CustomermanagementComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
