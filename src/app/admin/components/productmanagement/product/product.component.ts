import { NotifiService } from './../../../../notifi.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { error } from 'node:console';
import { MatDialog } from '@angular/material/dialog';
import { ImgProductDialogComponent } from './ImgProductDialog/ImgProductDialog.component';
import { ImageProcessService } from '../../../../service/imgproces/ImageProcess.service';
import { product } from '../../../../Model/product.model';
import { map } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { MessengerComponent } from '../../../../Messenger/Messenger.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
ShowImg(e: any) {
  console.log(e);
this.dialog.open(ImgProductDialogComponent,{width:'400px',height: '400px',
  data:{product:e}
});
}

ThemSP() {
  // console.log("thêm sp");
  // this.router.navigate(["/admin/productmanagement/product/Add"]);
}

  Delete(id: any) {
    const name="Delete Product";
    const Notifications=" Do you want delete this product";
    const Button="Delete"
    const dialogRef= this.dialog.open(MessengerComponent,{width:"400px", height:"200px",data:
  {
    name: name,messenger:Notifications,button:Button

  }
})
dialogRef.afterClosed().subscribe(res=>
  {
    if(res!=undefined)
    {
      this.sercvice.deleteProduct(id).subscribe(
        {
          next:(response:any)=>
          {
            this.snackBar.open(response, 'OK', {duration:2000 , panelClass:'secondary',
            horizontalPosition:'center',
            verticalPosition: 'top',
            })
          },
          error:(err)=>
          {
            console.log(err)
                  this.snackBar.open(err, 'close', {duration:2000 , panelClass:'secondary',
              horizontalPosition:'center',
              verticalPosition: 'top',
            });
            this.reloadRouter();
          }
  
        }
      )
      
    }
  })
  }
   Edit(arg0:any) {
    this.router.navigate(['/admin/productmanagement/product/Edit'],{queryParams:{id:arg0}})
   }
     displayedColumns: string[] = ['pro_id', 'pro_Name', 'pro_Describe', 'pro_Quantity','pro_Price','pro_Discount','category','img','thaotac'];
   tbSanPham: product[]= [] ;
     constructor( private sercvice: AdminService,
                  private router:Router, 
                  private snackBar: MatSnackBar,
                  private dialog:MatDialog,
                  private imgservice:ImageProcessService,
                  ) {
      
      }
     ngOnInit() {
      this.loadProducts();
     
     }
     loadProducts()
     {
      this.sercvice.getAllProduct()
      .pipe(
        map((x:product[],i)=>x.map((pro:product)=>this.imgservice.createImgProduct(pro)))
      )
      .subscribe(
        (data:product[])=>

        {
          this.tbSanPham = data;
        },
        (err:HttpErrorResponse)=>
        {
          console.log(err);
        }
        
      ) 

     }
     reloadRouter()
{
  const curentURL= this.router.url;
  this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    this.router.navigate([curentURL]);
}); 
}

}
