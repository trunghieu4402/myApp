import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef,MatDialogClose } from '@angular/material/dialog';

@Component({
  selector: 'app-Messenger',
  templateUrl: './Messenger.component.html',
  styleUrls: ['./Messenger.component.css']
})
export class MessengerComponent implements OnInit {
OK(arg0: any) {
  this.dialogRef.close(arg0);
}
Close() {
this.dialogRef.close();
}
  constructor(public dialogRef: MatDialogRef<MessengerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit() {
    console.log(this.data);
  }

}
