import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FileHandle } from '../../../../../Model/file-handle.model';

@Component({
  selector: 'app-ImgProductDialog',
  templateUrl: './ImgProductDialog.component.html',
  styleUrls: ['./ImgProductDialog.component.css','/src/styles.css']
})
export class ImgProductDialogComponent implements OnInit {
  private list!:FileHandle[];
  constructor(public dialogRef: MatDialogRef<ImgProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { 

  }
  ngOnInit() {
    const listImg:FileHandle[]=this.data.product.products_img;
console.log(listImg);
this.list=listImg;
console.log(this.list);

  }

}
