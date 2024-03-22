

import { APILocationService } from './../service/Location/APILocation.service';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { PaymentInfor } from './../Model/PaymenInfor.model';
import { UserStorageService } from './../service/storage/user-storage.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {map, startWith} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { PaymentInforService } from '../service/Payment/PaymentInfor.service';
import { CustomerService } from '../service/CustomerService/Customer.service';
import { MatDialog } from '@angular/material/dialog';
import { AddLocationComponent } from './AddLocation/AddLocation.component';
import { NotifiService } from '../notifi.service';
import { Item } from '../Model/Item.model';
import { Interface } from 'node:readline/promises';
import { ItemDto } from '../Model/ItemDto.model';
import { Router } from '@angular/router';




@Component({
  selector: 'app-PaymentInfor',
  templateUrl: './PaymentInfor.component.html',
  styleUrls: ['./PaymentInfor.component.css']
})


export class PaymentInforComponent implements OnInit {
  
curren: any;
RemoveAddress(arg0: any) {
console.log(arg0.id);
this.cusservice.DeleteLocation(arg0.id).subscribe(
  {
  next:(res:any)=>
  {
    this.noti.setNotifi(res,"Close");
    this.CustomerLocation= this.CustomerLocation.filter((loca)=>loca!=arg0);
  },
  error:(err:any)=>
  {
    this.noti.setNotifi(err,"Close");
    console.log(err);
  }
  }
)
}
AddLocation() { 
    const dia= this.dialog.open(AddLocationComponent,{
      height:'500px',
      width:'500px'
    });
    dia.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      this.getLocation();
    });
}
  currentInfor!:any;
Nhan(i: PaymentInfor) {
console.log(i);
this.currentInfor=i;
}
  CustomerLocation!:PaymentInfor[];

color: any="blue";
Order() {
    const body = new FormData();
    const List :any[]=[];
    this.ListItem.forEach((i)=>
    {
      const it:ItemDto={
      id_product:i.product.pro_id,
      quantity:i.quantity,
      }
      List.push(it);
    })
    // body.append("ListItem",ListItem);
    this.cusservice.CreateOrder(List,this.currentInfor.id).subscribe(
      {
        next:(res:any)=>
        {
          this.noti.setNotifi(res,"Close");
          this.route.navigateByUrl("home");
        },
        error:(err:any)=>
        {
          this.noti.setNotifi(err,"Close");
          console.log(err);
        }
      }
    )
  
}
  constructor(public dialog: MatDialog,private location:APILocationService,
     private fb:FormBuilder,private pay:PaymentInforService,private cusservice:CustomerService,
     private noti: NotifiService,private route:Router) {
  }
  UserName = UserStorageService.getUserName();
  Email = UserStorageService.getEmail();
  Phone = UserStorageService.getPhoneNumber();
  ListItem:Item[]=[];
  Total_Price:number=0;
  ngOnInit() {
    
      // const d = localStorage.getItem("List");
    this.ListItem=JSON.parse(localStorage.getItem("List")||"0");
    this.Total_Price=JSON.parse(localStorage.getItem("total_price")||"0");
    // this.ListItem=this.pay.GetItem();
    // this.Total_Price=this.pay.GetSum();
    console.log(this.ListItem);
    this.getLocation();
  }
  public getLocation()
  {
    this.cusservice.getLocation().subscribe((data:any)=>
    {
      this.CustomerLocation=data;
      if(this.CustomerLocation.length!=0)
      {
        this.currentInfor=this.CustomerLocation[0];
        console.log(this.currentInfor);
      }
    })

  }
  
}


