import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStorageService } from '../service/storage/user-storage.service';
import { product } from '../Model/product.model';
import { Category } from '../Model/category.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

private Base_URL_Product="http://localhost:8080/admin/Product";
private Base_url_category="http://localhost:8080/admin/Category";
// private http: Inject(HttpClient);
constructor( private http:HttpClient) { }
 getAllProduct(): Observable<any>
 {
  const headers = this.createAuthorizationHeader();
  return this.http.get(this.Base_URL_Product,{headers});
 }
 private createAuthorizationHeader():HttpHeaders
 {
  return new HttpHeaders().set(
    'Authorization','Bearer '+UserStorageService.getToken()
  )
 }
 getAllCategory(): Observable<any>
 {
  const headers = this.createAuthorizationHeader();
  return this.http.get(this.Base_url_category,{headers});
 }
 addProduct(bodyRequest: any): Observable<any>
 {
  console.log(bodyRequest);
  const headers = this.createAuthorizationHeader();
  return this.http.post(this.Base_URL_Product +'/createProduct',bodyRequest,{headers:headers});
 }
 deleteProduct(id:any)
 {
  const param= new HttpParams().set('id', id);
  const headers = this.createAuthorizationHeader();
  return this.http.delete(this.Base_URL_Product+'/deleteProduct',{params:param,headers:headers})
 }
 getProductByID(id:any) :any
 {
  const param = new HttpParams().set('id',id.id);
  const headers = this.createAuthorizationHeader();
  return this.http.get<any>(this.Base_URL_Product+'/SearchByID',{params:param,headers:headers});
 }
 updateProduct( bodyRequest : any): Observable<any>
 {
  const headers = this.createAuthorizationHeader();
  // const body=JSON.stringify(bodyRequest);
  // return this.http.put<any>(this.Base_URL_Product +'/updateProduct',bodyRequest,{headers:headers});
  return this.http.put<any>(this.Base_URL_Product+'/updateProduct',bodyRequest,{headers:headers});
 }
 addNewCategory(cate:Category):Observable<any> 
 {
  const headers = this.createAuthorizationHeader();
  return this.http.post<any>(this.Base_url_category+'/createCategory',cate,{headers:headers})
 }
 deleteCategory(id:any)
 {
  const param= new HttpParams().set('id', id);
  const headers = this.createAuthorizationHeader();
  return this.http.delete(this.Base_url_category+'/deleteCategory',{params:param,headers:headers})
 }
 getCategorybyId(id:any):Observable<Category>
 {
  const param= new HttpParams().set('id', id.id);
  const headers = this.createAuthorizationHeader();
  return this.http.get<Category>(this.Base_url_category+'/GetCategoryById',{params:param,headers:headers})
 }
 updateCategory(cate:Category)
 {
  const headers = this.createAuthorizationHeader();
  // const body=JSON.stringify(bodyRequest);
  // console.log(bodyRequest);
  // return this.http.put<any>(this.Base_URL_Product +'/updateProduct',bodyRequest,{headers:headers});
  return this.http.put(this.Base_url_category+'/updateCategory',cate,{headers:headers});

 }
}
