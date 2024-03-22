
import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../service/CustomerService/Customer.service';

interface Order
{
  order_id:any;
  total_amount:any;
  status:any;
}
@Component({
  selector: 'app-Order',
  templateUrl: './Order.component.html',
  styleUrls: ['./Order.component.css']
})
export class OrderComponent implements OnInit {

  constructor(
    private CusService:CustomerService,

  ) { }
  ListOrder:Order[]=[];

  ngOnInit() {
    this.loadAllOrder();

  }
  loadAllOrder()
  {
    this.CusService.GetOrder().subscribe((data:any)=>
    {
      console.log(data);
    }
    )
  }

}
