import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { UserStorageService } from './../storage/user-storage.service';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateOrder } from '../../Model/CreateOrder.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
URLBase_Cart="http://localhost:8080/customer/Cart";
URLBase_Order="http://localhost:8080/customer/Order";
URLLocation="http://localhost:8080/customer/address";
constructor( private Http: HttpClient) { }
getCart(): Observable<any>
{
  let param= new HttpParams();
  const headers = this.createAuthorizationHeader();
  return this.Http.get(this.URLBase_Cart,{headers:headers});
  
}

private createAuthorizationHeader():HttpHeaders
 {
  return new HttpHeaders().set(
    'Authorization','Bearer '+UserStorageService.getToken()
  )
 }
 addtoCart(pro_id:any)
 {
  const headers= this.createAuthorizationHeader();
  // const body={pro_id};
  // console.log(body);
  return this.Http.post(this.URLBase_Cart+"/add",pro_id,{headers:headers});
 }
 DeleAllPro(pro_id:any)
 {
  const headers= this.createAuthorizationHeader();
  return this.Http.post(this.URLBase_Cart+"/deleteAllOfItem",pro_id,{headers:headers});
 }
 RemoveItem(pro_id:any)
 {
  const headers= this.createAuthorizationHeader();
  return this.Http.post(this.URLBase_Cart+"/deleteItem",pro_id,{headers:headers});
 }
 CreateOrder(List:any,infor:any):Observable<any>
 {
  console.log(List);
  console.log(infor);
  const order:CreateOrder={ListItem:List,address_id:infor};
  console.log(JSON.stringify(order));
  const body= new FormData();
  body.append("ListItem",new Blob([ JSON.stringify(List)], {type:'application/json'}));
  body.append("address_id",new Blob([ JSON.stringify(infor)], {type:'application/json'}));

  const headers= this.createAuthorizationHeader();
  return this.Http.post(this.URLBase_Order+"/CreateOrder",body,{headers:headers});
 }
 getLocation():any
{
  const headers = this.createAuthorizationHeader();
  return this.Http.get(this.URLLocation,{headers:headers});
}
CreateLocation(body:any):any
{
  console.log(body);
  const headers= this.createAuthorizationHeader();
  return this.Http.post(this.URLLocation+"/CreateAddress",body,{headers:headers});
}
DeleteLocation(id:any):any
{
  const param= new HttpParams().set('id', id);
  const headers= this.createAuthorizationHeader();
  return this.Http.delete(this.URLLocation+"/DeleteAddress",{params:param,headers:headers});
}
GetOrder():any
{
  const headers= this.createAuthorizationHeader();
  return this.Http.get(this.URLBase_Order,{headers:headers});
}
}
