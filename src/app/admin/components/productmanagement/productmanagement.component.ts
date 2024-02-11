import { NumberInput } from '@angular/cdk/coercion';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTabGroup } from '@angular/material/tabs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productmanagement',
  templateUrl: './productmanagement.component.html',
  styleUrls: ['./productmanagement.component.css']
})
export class ProductmanagementComponent implements OnInit {
  @ViewChild('tab')
  tab!: MatTabGroup;
   curentIndex:any = 0;
change( index:any) {
  if(index==1)
  {
    this.router.navigate(['/admin/productmanagement/category']);

  }
  else
  {
 
    this.router.navigate(['/admin/productmanagement/product']);
    
  }
  if(typeof window !== 'undefined')
  {
    localStorage.setItem("tabindex",index);
  }
  
}

  constructor(private router:Router) { }

  ngOnInit() {  
    if(typeof window !== 'undefined')
    {
      this.curentIndex=localStorage.getItem("tabindex");
    }
    
  }
}
