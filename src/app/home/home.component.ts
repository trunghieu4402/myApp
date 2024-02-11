import { map } from 'rxjs';
import { AdminService } from '../admin/admin.service';
import { BaseService } from '../service/Base/Base.service';
import { product } from './../Model/product.model';
import { Component, OnInit } from '@angular/core';
import { ImageProcessService } from '../service/imgproces/ImageProcess.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

   ListProduct:product[]=[];
  constructor(
    private service:BaseService,
    private imgservice:ImageProcessService,

  ) { }

  ngOnInit() {
    this.FillData();
    
    
  }
  FillData()
  {
    this.service.getAllProdcuts().pipe(
      map((x:product[],i)=>x.map((pro:product)=>this.imgservice.createImgProduct(pro)))

    ).subscribe((data: product[])=>
      {
        this.ListProduct=data;
        console.log(this.ListProduct);
      })

  }
}
