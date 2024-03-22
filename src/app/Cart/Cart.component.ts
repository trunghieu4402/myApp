import { PaymentInforService } from './../service/Payment/PaymentInfor.service';
import { product } from './../Model/product.model';
import { CustomerService } from './../service/CustomerService/Customer.service';
import { Component, OnInit } from '@angular/core';
import { UserStorageService } from '../service/storage/user-storage.service';
import { ImageProcessService } from '../service/imgproces/ImageProcess.service';
import { NotifiService } from '../notifi.service';
import { Item } from '../Model/Item.model';
import { FormsModule } from '@angular/forms';
// import { error } from 'node:console';
@Component({
  selector: 'app-Cart',
  templateUrl: './Cart.component.html',
  styleUrls: ['./Cart.component.css']
})
export class CartComponent implements OnInit {
  PickALl:boolean=false;

remove(i:Item) {
  this.service.RemoveItem(i.product.pro_id).subscribe(
    {next:(data:any)=>
      {
        this.ListItems.forEach(item=>
          {
            if(item==i)
            {
              item.quantity-=1;
              if(item.quantity==0)
              {
                this.DeleItem(item.product.pro_id);
              }
            }
          })
          
          this.ReloadTotalPrice();
      },
      error:(error:any)=>
      {
        this.notify.setNotifi(error.error,"Close");
      }
    }
  )
}
DeleItem(pro_id:any)
{
  const list:Item[]=[];
  this.ListItems.forEach(i=>
    {
      if(i.product.pro_id===pro_id)
      {
        return;
      }
      else{
      list.push(i);
      }
    })
    this.ListItems=list;
    this.ReloadTotalPrice();
}
Additem(item:Item) {
  this.service.addtoCart(item.product.pro_id).subscribe(
    {
      next:(res:any)=>
      {
        this.ListItems.forEach(i=>
          {
            if(i==item)
            {
              i.quantity+=1;
            }
          })
          this.ReloadTotalPrice();

      },
      error:(error:any)=>
      {
        this.notify.setNotifi(error.error,"close");
        console.log(error);
      }
    }
  )
}
RemoveItem(i: Item) {
  
  this.service.DeleAllPro(i.product.pro_id).subscribe(
    { next:(res:any)=>
      {
        this.notify.setNotifi(res,"Close");
        this.DeleItem(i.product.pro_id);
      },
      error:(err:any)=>
      {
        this.notify.setNotifi(err.error,"Close");
      }
    }
  )
}
DatHang:any=true;
ReloadTotalPrice()
{
  this.n=0;
  this.Total_Price=0;
  if(this.ListItems.length==0)
  {
    this.CheckAll=false;
    this.Total_Price=0;
    this.DatHang=true;
  }
  else
  {
    this.ListItems.forEach(i=>
      {
        if(i.checked)
        {
          this.Total_Price+=i.quantity*(i.product.pro_Price-(i.product.pro_Discount/100*i.product.pro_Price));
          this.n+=1;
        }
        else
        {
          this.Total_Price=this.Total_Price;
        }
      })
      if(this.Total_Price==0)
      {
        this.DatHang=true;
      }
      else
      {
        this.DatHang=false;
      }
      if(this.n==this.ListItems.length)
      {
        this.CheckAll=true;
      }
      else
      {
        this.CheckAll=false;
      }
  }
}
Order() {
   let ListI :Item[]=[];
   this.ListItems.forEach(i=>{
    if(i.checked==true)
    {
      ListI.push(i);
    }
   })
   this.payment.SetItem(ListI,this.Total_Price);
   localStorage.setItem("List",JSON.stringify(ListI));
   localStorage.setItem("total_price",JSON.stringify(this.Total_Price));
}
  Total_Price:number=0;
  n:number=0;
PickAllItem(event: any) {
  if(this.ListItems==null)
  {
    return
  }
  else
  {
    if(event)
    {
      this.ListItems.forEach(i=>
      {
        i.checked=event;
        // this.Total_Price+=i.quantity*(i.product.pro_Price-(i.product.pro_Price*(i.product.pro_Discount/100)));
      })
      // this.Total_Price =sum;
      this.CheckbtnOrder(1);
    }
    else
    {
      this.ListItems.forEach(i=>
        {
          i.checked=event;
        })
      this.Total_Price=0;
      this.CheckbtnOrder(0);
    }
    this.ReloadTotalPrice();
    
      
  }

}
CheckAll: boolean=false;
update(event: any,item:Item ) {
  this.ListItems.forEach(i=>
    {
      if(i==item)
      {
        i.checked=event
      }
    })
    this.ReloadTotalPrice();
}
  constructor(
    private service:CustomerService,
    private imgprocess:ImageProcessService,
    private notify:NotifiService,
    private payment: PaymentInforService,
  ){ }
  Cart:any;
  isCustomerLogin=UserStorageService.isCustomerLogin();
  userid=UserStorageService.getUserId();
  ngOnInit(){
    this.fillCart();
  }
  ListItems:Item[]=[];
  listItem:product[]=[];
  fillCart()
  {
 
    this.service.getCart()
    .subscribe((data: any)=>  
      {
        
        data.cartItems.forEach((i:any) => {
          let pro:product=this.imgprocess.createImgProduct(i.product);
          this.listItem.push(pro);
           let item:Item={
             product: pro,
             checked: false,
             quantity: i.quantity,
           }
          this.ListItems.push(item);
          console.log(this.ListItems);
        });
        this.Cart= data;
        this.Cart.cartItems.product=this.listItem;
        
        console.log(this.Cart);
        this.Cart.cartItems.forEach((i:any) => {
        });

      })
  }
  CheckbtnOrder(n: any) {
    if(n==0)
    {
      this.DatHang=true;
    
    }
    else
    {
      this.DatHang=false;
    }
  }
}


