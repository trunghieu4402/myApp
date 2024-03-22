import { FILE } from 'dns';
import { FileHandle } from './../../../../../Model/file-handle.model';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../../../admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { product } from '../../../../../Model/product.model';
import { blob } from 'stream/consumers';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  imgdefout: File = new File([], 'noimg.jpg', { type: 'image/jpeg' });
  ListCategory:any;
AddForm !: FormGroup;
category!: FormGroup;
  product!: product
deleimg(i:any) {
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
  public fileHandles: FileHandle[]=[];
  img_url!:string | ArrayBuffer | null;
onFileSelected(event:any) {
console.log(event);
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
}
}

Clear():void {
this.AddForm.get('pro_Name')?.setValue(null);
this.AddForm.get('pro_Price')?.setValue(0);
this.AddForm.get('pro_Describe')?.setValue(null);
this.AddForm.get('pro_Quantity')?.setValue(10);
this.AddForm.get('pro_Discount')?.setValue(0);
this.AddForm.get('category')?.get('cate_id')?.setValue(null);
this.fileHandles=[];
}
  constructor( private adminservice: AdminService, private snackBar:MatSnackBar, private router:Router, private fb:FormBuilder, private sanitizer: DomSanitizer){}
  ngOnInit(): void {
    this.AddFormGroup();
    this.getCaegory();
  }
  AddFormGroup()
  {
    this.AddForm = this.fb.group
    (
      {
        pro_Name:[null,[Validators.required]],
        pro_Price:[0,[Validators.required]],
        pro_Describe:[null],
        pro_Quantity:[10,[Validators.required]],
        pro_Discount:[0],
        category:this.fb.group(
          {
            cate_id:[null,[Validators.required]],
          }
        ),
      }
    )

  }
  getCaegory()
  {
    this.adminservice.getAllCategory().subscribe(data=>
      {
        this.ListCategory=data;
      })
  }
Save(){
  this.product= this.AddForm.value;
  console.log(this.AddForm.value);
  
  if(this.fileHandles.length==0)
  {
    console.log(this.imgdefout);
  const fileHandle: FileHandle=
  {
    file: this.imgdefout,
    url: this.sanitizer.bypassSecurityTrustUrl(
      window.URL.createObjectURL(this.imgdefout),
    )
  }
  this.fileHandles.push(fileHandle);
  
  }
  console.log(this.fileHandles);
  this.product.products_img=this.fileHandles;
  const formData =this.prepareFormData(this.product)

  this.adminservice.addProduct(formData).subscribe(
  {
    next:(response:any)=>{
      this.snackBar.open('Add Product successfull', 'OK', {duration:2000 , panelClass:'secondary',
    horizontalPosition:'center',
    verticalPosition: 'top',
    })
    this.Clear();
    this.reloadRouter();
    },
    error:(err)=>
    {
      console.log(err);
      this.snackBar.open('Add Product Failed', 'close', {duration:5000 , panelClass:'secondary',
    horizontalPosition:'center',
    verticalPosition: 'top',
  });

    }
  }
  )
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
reloadRouter()
{
  const curentURL= this.router.url;
  this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    this.router.navigate([curentURL]);
}); 

}
}