import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { UserStorageService } from './../storage/user-storage.service';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
URLBase_Cart="http://localhost:8080/customer/Cart";
constructor( private Http: HttpClient) { }
getCart(userid:any): Observable<any>
{
  let param= new HttpParams();
  param=param.append("id",userid);
  const headers = this.createAuthorizationHeader();
  return this.Http.get(this.URLBase_Cart,{headers:headers,params:param});
  
}
private createAuthorizationHeader():HttpHeaders
 {
  return new HttpHeaders().set(
    'Authorization','Bearer '+UserStorageService.getToken()
  )
 }
 addtoCart(user_id:any,pro_id:any)
 {
  const headers= this.createAuthorizationHeader();
  const body={user_id,pro_id};
  console.log(body);
  return this.Http.post(this.URLBase_Cart+"/add",body,{headers:headers});
 }
 DeleAllPro(user_id:any,pro_id:any)
 {
  const headers= this.createAuthorizationHeader();
  const body={user_id,pro_id};
  return this.Http.post(this.URLBase_Cart+"/deleteAllOfItem",body,{headers:headers});
 }
 RemoveItem(user_id:any, pro_id:any)
 {
  const headers= this.createAuthorizationHeader();
  const body={user_id,pro_id};
  return this.Http.post(this.URLBase_Cart+"/deleteItem",body,{headers:headers});
 }
}
