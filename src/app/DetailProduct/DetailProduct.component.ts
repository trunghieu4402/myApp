import { product } from './../Model/product.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseService } from '../service/Base/Base.service';
import { ImageProcessService } from '../service/imgproces/ImageProcess.service';
import { map } from 'rxjs';
import { CustomerService } from '../service/CustomerService/Customer.service';
import { UserStorageService } from '../service/storage/user-storage.service';
import { NotifiService } from '../notifi.service';

@Component({
  selector: 'app-DetailProduct',
  templateUrl: './DetailProduct.component.html',
  styleUrls: ['./DetailProduct.component.css']
})
export class DetailProductComponent implements OnInit {
BuyNow(id: number|null) {
  
}
Pre() {
  // console.log(this.currentImg);

    for(let i=0;i<this.ListImg?.length;i++)
    {
      
      if(this.ListImg[i]===this.currentImg)
      {
        if(i==0)
      {
        i=this.ListImg.length;
      }
        this.currentImg=this.ListImg[i-1];
      }
    }
}
Next() {
  for(let j=0; j<this.ListImg?.length;j++)
  {
    if(this.ListImg[j]===this.currentImg)
    {
      if(j==this.ListImg.length-1)
      { 
        this.currentImg=this.ListImg[0];
        return;
      }
      else
      {
        this.currentImg=this.ListImg[j+1];
        return;
      }
      
    }

  }
}
Pick(img: any) {
this.currentImg=img;
console.log(img);
}
  ListImg: any[] = [];
  currentImg:any;
AddToCart(arg0: number|null) {
  console.log(arg0);
this.cusservice.addtoCart(arg0).subscribe(
  {
    next:(res:any)=>
    {
      this.notifi.setNotifi(res,"Close");

    },
    error:(err:any)=>
    {
      this.notifi.setNotifi(err,"Close");
      console.log(err);
    }
  }
);
}
  pro !:product;
  constructor(
    private routerActive:ActivatedRoute,
    private service:BaseService,
    private imgservice:ImageProcessService,
    private cusservice:CustomerService,
    private notifi:NotifiService
  ) { }

  ngOnInit() {
    this.fillData();
  }
  public fillData()
  {
     this.routerActive.params.subscribe(i=>
      {
       let id= i['id'];
       this.service.findByIDPro(id)
       .pipe(
        map((x:product)=>this.imgservice.createImgProduct(x)))
       .subscribe((pro: product)=>
        {
          this.pro=pro
          console.log(pro);
          this.ListImg=pro.products_img;
          console.log(this.ListImg.length);
          this.currentImg=this.ListImg[0];
        })

      })
  }

}
