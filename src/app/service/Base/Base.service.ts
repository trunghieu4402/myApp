import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { product } from '../../Model/product.model';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  URL_BASE ="http://localhost:8080/base";

constructor( private HttpClient:HttpClient ) { }
public getAllProdcuts():any
{
  // const headers = new HttpHeaders().set('Content-Type','application/json');
  return this.HttpClient.get(this.URL_BASE);
}
public SearchProduct(value:any,id:any):any{
  let param = new HttpParams();
  param=param.append("value",value);
 param= param.append("id",id);
  return this.HttpClient.get(this.URL_BASE+"/search",{params:param})
}
public findByIDPro(id:any):any{
  let param = new HttpParams();
  param=param.append("id",id);
  return this.HttpClient.get(this.URL_BASE+"/SearchByID",{params:param })
}

}
