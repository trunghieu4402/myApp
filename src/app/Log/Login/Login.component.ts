import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AuthService } from '../../service/Authenticate/Auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { error } from 'console';
import { UserStorageService } from '../../service/storage/user-storage.service';

@Component({
  selector: 'app-Login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.css']
})
export class LoginComponent implements OnInit {
Login() {
  const email=this.LoginForm.controls['email'].value;
  const password= this.LoginForm.controls['password'].value;
  this.authService.login(email,password).subscribe((response: any)=>{
    this.snackBar.open('Login is successfull', 'OK', {duration:2000 , panelClass:'secondary',
      horizontalPosition:'center',
      verticalPosition: 'top',
    });
    if(UserStorageService.isAdminLogin())
    {
      console.log("admin");
      this.router.navigate(['/admin/home']);  
    }
    else if(UserStorageService.isCustomerLogin())
    {
      console.log("customer");
      this.router.navigate(['/customer/home']);
    }
        },
    ()=>
    {
      this.snackBar.open('Login is Failed', 'close', {duration:2000 , panelClass:'secondary',
      horizontalPosition:'center',
      verticalPosition: 'top',
    });
    this.LoginForm.controls['email'].setValue(null);
    this.LoginForm.controls['password'].setValue(null);
  }
  )
}
LoginForm!:FormGroup;

  constructor(private router:Router,
               private authService: AuthService,
               private snackBar: MatSnackBar, 
               private fb:FormBuilder) { }

  ngOnInit() {
    this.LoginForm = this.fb.group({
      email:[null,[Validators.required, Validators.email]],
      password:[null,[Validators.required]],    
  })
  if(this.authService.getAuth().valid )
  {
    this.LoginForm.controls['email'].setValue(this.authService.getAuth().controls['email'].value);
    this.LoginForm.controls['password'].setValue(this.authService.getAuth().controls['password'].value);
  }
  
  }

}
