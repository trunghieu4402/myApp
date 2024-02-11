import { AdminComponent } from './../../../../WEBBanHang/src/app/admin/admin.component';
import { ProductManagementComponent } from './../../../../WEBBanHang/src/app/admin/component/productManagement/productManagement.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProductComponent } from './components/productmanagement/product/product.component';
import { CategoryComponent } from './components/productmanagement/category/category.component';
import { AddFormCateComponent } from './components/productmanagement/category/add-form-cate/add-form-cate.component';
import { AddProductComponent } from './components/productmanagement/product/add-product/add-product.component';
import { FixProdcutComponent } from './components/productmanagement/product/fix-prodcut/fix-prodcut.component';
import { ImgProductDialogComponent } from './components/productmanagement/product/ImgProductDialog/ImgProductDialog.component';

import { EditCategoryComponent } from './components/productmanagement/category/EditCategory/EditCategory.component';


@NgModule({
  declarations: [
    AdminComponent,
    ProductManagementComponent,
    ProductComponent,
    CategoryComponent,
    AddFormCateComponent,
    AddProductComponent,
    FixProdcutComponent,
    ImgProductDialogComponent,
EditCategoryComponent,
 
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    RouterModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ]
})
export class AdminModule { }
