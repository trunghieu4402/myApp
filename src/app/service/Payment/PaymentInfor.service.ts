import { Injectable } from '@angular/core';
import { Item } from '../../Model/Item.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentInforService {
  Base:String ="";

constructor(private http:HttpClient) { }
ListItem:Item[]=[];
total:number=0;
SetItem(List:Item[],tt:number)
{
  this.ListItem=List;
  this.total=tt;
//   let L=JSON.stringify(this.ListItem);
// localStorage.setItem("List",L);
// localStorage.setItem("total",JSON.stringify(this.total));
}
GetItem()
{
  return this.ListItem;
}
GetSum()
{
  return this.total;
}
}
