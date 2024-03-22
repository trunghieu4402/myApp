import { Component } from '@angular/core';
import { UserStorageService } from './service/storage/user-storage.service';
import { Router } from '@angular/router';
import { BaseService } from './service/Base/Base.service';
import { product } from './Model/product.model';
import { ImageProcessService } from './service/imgproces/ImageProcess.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
Nhan() {
  this.isDisable="none";
}
Products:product[]=[];
ishidden: boolean= true;
isDisable: any="none";
Search(key:any) {
console.log(key);
}
keyup(value: any) {
  console.log(value);
if(value!="")
{
  this.ishidden=false;
  this.isDisable="block";
  this.service.SearchProduct(value,0).pipe(
    map((x:product[],i)=>x.map((pro:product)=>this.imgservice.createImgProduct(pro)))

  ).subscribe((data: product[])=>
    {
      if(data.length<5)
      {
        for(var i=0;i<5;i++)
      {
        this.Products[i]=data[i];
      }

      }
      this.Products=data;
      
     
      console.log(this.Products);
    })

}
else
{
  this.ishidden=true;
  this.isDisable="none";
  console.log("troongs");
}
}
key: any;
Xoa() {
this.key="";
this.ishidden=true;
this.isDisable="none";
}
Click($event: MouseEvent) {
  document.querySelectorAll('a').forEach((item) => {
    item.classList.remove('active');
   
  });
  this.title=($event.currentTarget as HTMLElement).innerText;
  // Add 'active' class to the clicked <a> tag
  ($event.currentTarget as HTMLElement).classList.add('active');
 const URL:any = $event.view?.document.URL;
    window.localStorage.setItem('url',this.router.url);
  // console.log(window.localStorage.getItem('url'));

}
  title:any='Table';
  isAdminLogin = UserStorageService.isAdminLogin();
  isCustomerLogin=UserStorageService.isCustomerLogin();
  UserName = UserStorageService.getUserName();
user: any;
  constructor(private router:Router,
              private service:BaseService,
              private imgservice:ImageProcessService){}
  ngOnInit(): void {
    
    // this.title="Dashborad"
    this.authenticate();
  }
  authenticate()
  {
    this.router.events.subscribe(event=>
      {
        this.isAdminLogin=UserStorageService.isAdminLogin();
        this.isCustomerLogin=UserStorageService.isCustomerLogin();
        this.UserName = UserStorageService.getUserName();
      })

  }
  Logout()
  {
    UserStorageService.Signout();
    this.router.navigateByUrl('login');
  }
  KeyboardEvent(i:any)
  {
    console.log(i);


  }


}
