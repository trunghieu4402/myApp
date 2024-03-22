import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { APILocationService } from '../../service/Location/APILocation.service';
import { PaymentInforService } from '../../service/Payment/PaymentInfor.service';
import { PaymentInfor } from '../../Model/PaymenInfor.model';
import { CustomerService } from '../../service/CustomerService/Customer.service';
import { Console, error } from 'console';
import { MatDialogRef } from '@angular/material/dialog';
import { NotifiService } from '../../notifi.service';

@Component({
  selector: 'app-AddLocation',
  templateUrl: './AddLocation.component.html',
  styleUrls: ['./AddLocation.component.css']
})
export class AddLocationComponent implements OnInit {

  
  ListCity:any[]=[];
  ListHuyen:any[]=[];
  ListXa:any[]=[];
  InFormationForm !: FormGroup;
  constructor(private location:APILocationService, private fb:FormBuilder, private Payservice:PaymentInforService,
    private CusService:CustomerService,public dialogRef: MatDialogRef<AddLocationComponent>,private noti:NotifiService) { }

  ngOnInit() {
    {
      this.AddFormGroup();
      this.location.getTinh().subscribe((data:any)=>
        {
            this.ListCity=data.results;
        }
      )
    }
  }
  SaveLocation() {
    // this.CusInfor = new PaymentInfor();
    let CusInfor!:PaymentInfor;
    let T!:String;
    let H!:String;
    let X!:String;

  this.ListCity.forEach((i)=>
  {
    if(i.id==this.InFormationForm.value.province)
    {
      T=i.full_name;
    
    }
  })
  this.ListHuyen.forEach((i)=>
  {
    if(i.id==this.InFormationForm.value.district)
    {
      H=i.full_name;
    
    }
  })
  this.ListXa.forEach((i)=>
  {
    if(i.id==this.InFormationForm.value.town)
    {
      X=i.full_name;
    
    }
  })
  CusInfor = new PaymentInfor(T,H,X,this.InFormationForm.value.streetNumber,this.InFormationForm.value.phoneNumber,this.InFormationForm.value.Name);


    console.log(this.InFormationForm.value);
    this.CusService.CreateLocation(CusInfor).subscribe(
      {
        next:(res:any)=>
        {
          this.noti.setNotifi("Add Complete","Close");
          this.dialogRef.close(CusInfor);
        },
        error:(err:any)=>
        {
          this.noti.setNotifi(err,"Close");

        }
      }
    )
   
    }
  public AddFormGroup()
  {
    this.InFormationForm = this.fb.group
    (
      {
        Name:[null,[Validators.required]],
        phoneNumber:[null,[Validators.required]],
        province:[null,[Validators.required]],
        district:[null,[Validators.required]],
        town:[null,[Validators.required]],
        streetNumber:[null,[Validators.required]]
      }
    )
  }  
 getHuyen(id:any):void
  {
    this.location.getHuyen(id).subscribe((data:any)=>
      {
        console.log(data);
          this.ListHuyen=data.results;
      }
    )
  }
  getXa(id:any)
  {
    this.location.getXa(id).subscribe((data:any)=>
      {
          this.ListXa=data.results;
      }
    )
  } 
  XA() {
    console.log(this.InFormationForm.value);
  }
  Huyen() {
    this.getXa(this.InFormationForm.value.district);
  }
  Tinh() {
    console.log(this.InFormationForm);
  this.getHuyen(this.InFormationForm.value.province);
  }


}
