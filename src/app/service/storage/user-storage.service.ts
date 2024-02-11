import { Inject, Injectable } from '@angular/core';
import { Session } from 'inspector';
// import { SessionService } from './session.service';
const TOKEN="token";
const USER="USER";
// global['localStorage'] = localStorage;
@Injectable({
  providedIn: 'root'
})
export class UserStorageService {

constructor(
) { }
saveToken(token:any):void
{
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN,token);
  }

}
saveUser(user:any):void

{
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER,JSON.stringify(user));
  }
}
 static getToken()
{
  if (typeof window !== 'undefined') {
    return  window.localStorage.getItem(TOKEN);
  }
  return null;
}
 static getUser(): any
{
  if (typeof window !== 'undefined') {
    let user =localStorage.getItem('USER');
    if (user !== null) {
      return JSON.parse(user);
    } else {
      return null;
    }
  }
  return null;
}
static getUserId():any
{
  let user = this.getUser();
  if(user!==null)
  {
    return user.user_id;
  }
  return null;
}
static getUserName():any
{
  let user = this.getUser();
  if(user!==null)
  {
    return user.username;
  }
  return null;
}
static getUserRole():any
{
  let user = this.getUser();
  if(user!==null)
  {
    return user.role;
  }
  return null;
}
 static isAdminLogin():boolean
{
  if(this.getToken()===null)
  {
    return false;
  }
  else
  {
    
    const role:String =this.getUserRole();
    return role==='ADMIN';
  }
}
 static isCustomerLogin():boolean
{
  if(this.getToken()===null)
  {
    return false;
  }
  else
  {
    const role:String =this.getUserRole();
    return role==='CUSTOMER';
  }
}
static Signout():void
{
  if (typeof window !== 'undefined') {
    localStorage.removeItem(TOKEN);
    localStorage.removeItem(USER);
  }
}
}
