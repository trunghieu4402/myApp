import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../service/Authenticate/Auth.service';
import { ok } from 'assert';
import { error } from 'console';

@Component({
  selector: 'app-SignUp',
  templateUrl: './SignUp.component.html',
  styleUrls: ['./SignUp.component.css']
})
export class SignUpComponent implements OnInit {
togglehide() {
this.hidePassword=!this.hidePassword;
}
hidePassword= true;
submit() {
  const password = this.FormSignUp.controls['password'].value;
  const confirmpassword = this.FormSignUp.controls['confirmpassword'].value;
  if(password!=confirmpassword)
  {
    this.snakbar.open("password do not match","Close", {duration:5000, panelClass:'error-snackbar', horizontalPosition:'center',
    verticalPosition: 'top', });
    this.FormSignUp.controls['confirmpassword'].setValue(null);
    return;
  }
  else
  {
    console.log(this.FormSignUp.value);
    this.authService.register(this.FormSignUp.value).subscribe((response)=>
      {
        this.snakbar.open("Signup is successfull", " Close", {duration:5000, panelClass:'secondary', horizontalPosition:'center',
        verticalPosition: 'top',});
        console.log(response);
        this.authService.setAuth(this.FormSignUp.controls['email'].value,password);
        this.router.navigate(['/login']);

      },
      (error)=>
      {
        this.snakbar.open("Signup is Failed", " Close", {duration:5000, panelClass:'error_snackbar', horizontalPosition:'center',
        verticalPosition: 'top',});
      }
      )

  }

}
  FormSignUp!:FormGroup;
  constructor( private fb : FormBuilder,
               private snakbar: MatSnackBar,
               private router:Router,
                private authService:AuthService
              
                  ) { }
  ngOnInit() {
    this.FormSignUp = this.fb.group({
      name:[null,[Validators.required, Validators.minLength(3)]],
      email:[null,[Validators.required, Validators.email]],
      phone:[null,[Validators.required]],
      password:[null,[Validators.required, Validators.minLength(6)]],
      confirmpassword:[null,[Validators.required, Validators.minLength(6)]]      
  })
  }
}
