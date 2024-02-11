import { UserStorageService } from './../storage/user-storage.service';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup } from '@angular/forms';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private URL_BASE="http://localhost:8080/base/";
  LoginForm !: FormGroup;

constructor(private http: HttpClient, private fb:FormBuilder, private UserStorageService:UserStorageService) {
  this.LoginForm = this.fb.group({
    email:null,
    password:null
  })

 }
 ngOnInit(): void {
  
}
register (signupRequest : any): Observable<any>
{
  return this.http.post<any>(this.URL_BASE+"signup",signupRequest);
}
login(email:any, password:any):any
{
  const headers = new HttpHeaders().set('Content-Type','application/json');
  const body = {email,password};
  return this.http.post(this.URL_BASE+'authenticate', body, {headers, observe:'response'}).pipe(
    map((res)=>{
      const token=res.headers.get('Authorization')?.substring(7);
      const user =res.body;
      if(token && user)
      {
        this.UserStorageService.saveToken(token);
        this.UserStorageService.saveUser(user);
        return true;
      }
      return false
    })
    );
}

// login(LoginRequest:any):any
// {
//   const header= new HttpHeaders().set('Content-Type','application/json');
//   const body =LoginRequest;
//   return this.http.post(this.URL_BASE+"authenticate", body, {header,observe:'response'}).pipe(map
//     ((res)=>
//     {
//       const token=res.header.get('authorization').substring(7);
//       const user =res.body;
//       if(token && user)
//       {
//         this.UserStorageService.saveToken(token);
//         this.UserStorageService.saveUser(user);
//         return true;
//       }
//       return false
//     })
//     );
// }
setAuth(email:any, password:any )
{
  this.LoginForm.controls['email'].setValue(email);
  this.LoginForm.controls['password'].setValue(password);
}
getAuth()
{
  return this.LoginForm;
}

}
