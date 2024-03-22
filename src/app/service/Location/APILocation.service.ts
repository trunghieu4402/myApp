import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class APILocationService {
BaseAPI:String="https://vnprovinces.pythonanywhere.com/api/";

constructor(private HttpClient:HttpClient ) { }
public getTinh():any
{
  return this.HttpClient.get(this.BaseAPI+"provinces/?basic=true&limit=100");
}
public getHuyen(id:any):any{
  return this.HttpClient.get(this.BaseAPI+"districts/?province_id="+id+"&basic=true&limit=100");
}
public getXa(id:any):any
{
  return this.HttpClient.get(this.BaseAPI+"wards/?district_id="+id+"&basic=true&limit=100");
}

}
