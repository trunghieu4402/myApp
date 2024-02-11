import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotifiService {

  constructor( private snackBar: MatSnackBar) { }
  setNotifi(messenge:string, bt:string)
  {
    this.snackBar.open(messenge, bt, {duration:2000 , panelClass:'secondary',
      horizontalPosition:'center',
      verticalPosition: 'top',
      });
  }
}
