import { Component, OnInit } from '@angular/core';
import { Category } from '../../../../../Model/category.model';
import { NgForm } from '@angular/forms';
import { AdminService } from '../../../../admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-EditCategory',
  templateUrl: './EditCategory.component.html',
  styleUrls: ['./EditCategory.component.css']
})
export class EditCategoryComponent implements OnInit {

  id:any;
  name: any;
  describer: any;
  category!:Category;
  oldCategory!:Category;
  constructor(
    private service:AdminService,
    private activeRouter:ActivatedRoute,
    private router:Router,
    private snackBar:MatSnackBar,

  ) { }

  ngOnInit() {
    this.fillData();
  }
  fillData()
  {
    this.activeRouter.queryParams.subscribe(id=>
      {
        console.log(id);
        this.service.getCategorybyId(id).subscribe(data=>
          {
            console.log(data);
            this.id=data.cate_id;
            this.name=data.cate_name;
            this.describer=data.cate_Describe;
            this.oldCategory=data;
            this.category=data;
          })
      })
    
  }
  Save(cate: NgForm) {
    this.category.cate_id=cate.value.id;
    this.category.cate_name=cate.value.name;
    this.category.cate_Describe=cate.value.describer;
    this.service.updateCategory(this.category).subscribe({
      next:(res)=>
      {
        this.snackBar.open('Update Complete', 'OK', {duration:2000 , panelClass:'secondary',
        horizontalPosition:'center',
        verticalPosition: 'top',
        });
       this.reloadRouter();
      },
      error:(err)=>
      {
        this.snackBar.open('Update Failed', 'OK', {duration:2000 , panelClass:'secondary',
        horizontalPosition:'center',
        verticalPosition: 'top',
        });
      }
    }
    )
    }
  Restore()
  {
    this.id=this.oldCategory.cate_id;
    this.name=this.oldCategory.cate_name;
    this.describer=this.oldCategory.cate_Describe;
  }
  reloadRouter()
{
  const curentURL= "admin/productmanagement/category";
  this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    this.router.navigate([curentURL]);
});
}

}
