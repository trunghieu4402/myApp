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
AddToCart(arg0: number|null) {
  let id_cus=UserStorageService.getUserId();
  console.log(id_cus);
  console.log(arg0);
this.cusservice.addtoCart(id_cus,arg0).subscribe(
  {
    next:(res:any)=>
    {
      this.notifi.setNotifi("add to cart complete","Close");

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
        })

      })
  }

}
