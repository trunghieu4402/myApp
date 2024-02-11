import { CdkTableDataSourceInput } from '@angular/cdk/table';
import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import e from 'express';
import { error } from 'console';
import { AddFormCateComponent } from './add-form-cate/add-form-cate.component';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MessengerComponent } from '../../../../Messenger/Messenger.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
tbDanhMuc: any;
displayedColumns: string[] = ['cate_id', 'cate_name', 'cate_Describe','ThaoTac'];
Delete(arg0: any) {
  const name="Delete Category";
  const Notifications=" All products in this Category will be delete";
  const Button="Delete"
  const dialogRef = this.dialog.open(MessengerComponent, {
    width:'500px',height:'150px',
    data: {name: name,messenger:Notifications,button:Button},
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    if(result!=undefined)
    {
      this.adminservice.deleteCategory(arg0).subscribe({
        next:(res)=>
        {
          this.snackBar.open('Delete Successfull', 'OK', {duration:2000 , panelClass:'secondary',
          horizontalPosition:'center',
          verticalPosition: 'top',
          });
          this.reloadRouter();
        },
        error:(err)=>
        {
          this.snackBar.open('Delete Fail', 'OK', {duration:2000 , panelClass:'secondary',
          horizontalPosition:'center',
          verticalPosition: 'top',
          });
        }
      })
    }
  });

}
Edit(arg0: any) {
  this.router.navigate(["/admin/productmanagement/category/Edit"],{queryParams:{id:arg0}})
}

  constructor( private adminservice: AdminService,
               private snackBar:MatSnackBar,
               private router:Router,
               public dialog: MatDialog) { }

  ngOnInit() {
    this.adminservice.getAllCategory().subscribe(
      data=>
      {
        this.tbDanhMuc=data;
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
