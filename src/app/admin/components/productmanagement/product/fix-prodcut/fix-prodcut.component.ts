import { NotifiService } from './../../../../../notifi.service';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AdminService } from '../../../../admin.service';
import { catchError, map, throwError } from 'rxjs';
import { product } from '../../../../../Model/product.model';
import { ImageProcessService } from '../../../../../service/imgproces/ImageProcess.service';
import { FileHandle } from '../../../../../Model/file-handle.model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-fix-prodcut',
  templateUrl: './fix-prodcut.component.html',
  styleUrls: ['./fix-prodcut.component.css']
})
export class FixProdcutComponent implements OnInit {
  newPro!:product;
  fileHandles: FileHandle[]=[];
  FixForm!: FormGroup;
ListCategory :any;
OldProducts!:product;
deleimg(i: any) {
  console.log(i);
  const file: FileHandle[]=[];
  this.fileHandles.forEach(element => {
    if(i!==element)
    {
      file.push(element);
    }
    this.fileHandles=file;
    console.log(this.fileHandles);
  });
}
onFileSelected(event:any) {

  if(event.target.files)
  {
    const file =event.target.files[0];
    const fileHandle: FileHandle=
    {
      file: file,
      url: this.sanitizer.bypassSecurityTrustUrl(
        window.URL.createObjectURL(file),
      )
    }
    this.fileHandles.push(fileHandle);
    console.log(this.fileHandles);
  }
  }
Restore() {
this.FixForm =this.fb.group(
  {
    pro_id:[this.OldProducts.pro_id],
              pro_Name:[this.OldProducts.pro_Name,[Validators.required]],
              pro_Price:[this.OldProducts.pro_Price,[Validators.required]],
              pro_Describe:[this.OldProducts.pro_Describe],
              pro_Quantity:[this.OldProducts.pro_Quantity,[Validators.required]],
              pro_Discount:[this.OldProducts.pro_Discount],
              category:this.fb.group(
                {
                  cate_id:[this.OldProducts.category.cate_id,[Validators.required]],
                }
              ),

  }
);
this.fileHandles=this.OldProducts.products_img;
}
reloadRouter()
{
  const curentURL= "/admin/productmanagement/product";
  console.log(curentURL);
  this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    this.router.navigate([curentURL]);
}); 
}
Save() {
 this.newPro = this.FixForm.value;
 this.newPro.products_img=this.fileHandles;
 console.log(this.OldProducts);
console.log(this.newPro);
const Pro:FormData=this.prepareFormData(this.newPro);
this.service.updateProduct(Pro).pipe(
  catchError(error => {
    this.NotifiService.setNotifi("Update Failed",'close');
    return throwError(error.error);
  })
).subscribe(
  {
    next:(response:any)=>
    {
     this.NotifiService.setNotifi('Update Complete','ok');
    //  return throws(response);
      this.reloadRouter();
    }
  }
);
}
prepareFormData(product:product):FormData
{
  console.log(product);
  const formData = new FormData();
  formData.append('product',
  new Blob([ JSON.stringify(product)], {type:'application/json'})
  );
  for(var i=0;i<product.products_img.length;i++)
  {
    formData.append(
      'ImageFile',
      product.products_img[i].file,
      product.products_img[i].file.name
    );
  }
  return formData;
}


  constructor(
    private service: AdminService,
    private router:Router,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private activerouter:ActivatedRoute,
    private NotifiService: NotifiService,
    private imgservice:ImageProcessService,
    private sanitizer:DomSanitizer,
  ) { }

  ngOnInit() {
    this.FixForm= this.fb.group(
      {
          pro_id:[null],
          pro_Name:[null,[Validators.required]],
          pro_Price:[0,[Validators.required]],
          pro_Describe:[null],
          pro_Quantity:[null,[Validators.required]],
          pro_Discount:[0],
          category:this.fb.group(
            {
              cate_id:[1,[Validators.required]],
            }
          ),
      })
    this.fillData();
    this.getCategory();
  }
  getCategory()
  {
    this.service.getAllCategory().subscribe({
      next:(data)=>
      {
        this.ListCategory=data;
      },
      error:(err)=>
      {
        console.log(err);
      }
    })
  }
  fillData()
  {
    this.activerouter.queryParams.subscribe(params => {
       this.service.getProductByID(params)
      //  .pipe(map((x:product[],i)=>x.map((pro:product)=>this.imgservice.createImgProduct(pro))))
       .subscribe((data: product)=>
      {
        data=this.imgservice.createImgProduct(data);
        this.OldProducts=data;
        console.log(this.OldProducts);
        this.FixForm= this.fb.group(
          {
              pro_id:[data.pro_id],
              pro_Name:[data.pro_Name,[Validators.required]],
              pro_Price:[data.pro_Price,[Validators.required]],
              pro_Describe:[data.pro_Describe],
              pro_Quantity:[data.pro_Quantity,[Validators.required]],
              pro_Discount:[data.pro_Discount],
              category:this.fb.group(
                {
                  cate_id:[data.category.cate_id,[Validators.required]],
                }
              ),
          }
        )
        this.fileHandles=data.products_img;
      })
      });
   
  }

}
