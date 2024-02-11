import { NgForm, NgModel } from '@angular/forms';
import { Category } from './../../../../../Model/category.model';
import { Component } from '@angular/core';
import { AdminService } from '../../../../admin.service';
import { error } from 'console';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NotifiService } from '../../../../../notifi.service';
@Component({
  selector: 'app-add-form-cate',
  templateUrl: './add-form-cate.component.html',
  styleUrl: './add-form-cate.component.css'
})
export class AddFormCateComponent {
name: any;
describer: any;
category!:Category;
  
  constructor(private service:AdminService,
              private SnackBar:MatSnackBar,
              private router:Router,
              private notifi:NotifiService,
              )
  {}
Save( cate:NgForm) {
  
  console.log(cate.form.value);

  const category :Category= 
  {
    cate_name: cate.form.value.name,
    cate_Describe: cate.form.value.describe,
  };
  console.log(category);
  this.service.addNewCategory(category).subscribe(
    {
      next:(res)=>
      {
        // this.SnackBar.open('Add successfull', 'OK', {duration:2000 , panelClass:'secondary',
        // horizontalPosition:'center',
        // verticalPosition: 'top',
        // });
        this.notifi.setNotifi("Add successfull","OK");
        this.Clear();
        this.reloadRouter();
      },
      error:(err)=>
      {
        this.SnackBar.open('Add Fail', 'OK', {duration:2000 , panelClass:'secondary',
        horizontalPosition:'center',
        verticalPosition: 'top',
        });
      }
    }
  )
}
Clear() {
  this.name=null;
  this.describer=null;
}
reloadRouter()
{
  const curentURL= this.router.url;
  this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    this.router.navigate([curentURL]);
});
}


}
