import { Injectable } from '@angular/core';
import { product } from '../../Model/product.model';
import { FileHandle } from '../../Model/file-handle.model';
import { FILE } from 'dns';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ImageProcessService {

constructor( private sati:DomSanitizer) { }
createImgProduct(product:product)
{
  const imgProducts : any[] = product.products_img;
  const ListImg:FileHandle[]=[]
  for(var i=0;i<imgProducts.length;i++)
  {
    const img = imgProducts[i];
    const imgBlob=this.dataURItoBlob(img.picByte, img.img_type);
    const imgFile = new File([imgBlob], img.img_name,{type:img.img_type});
    const finalFileHandle: FileHandle={
      file:imgFile,
      url:this.sati.bypassSecurityTrustUrl(window.URL.createObjectURL(imgFile))
    };
    ListImg.push(finalFileHandle);
  }
  product.products_img=ListImg;
  return product;
}
public dataURItoBlob(picByte:any,imgType:any)
{
  const byteString= window.atob(picByte);
  const arrayBF= new ArrayBuffer(byteString.length);
  const int8Array= new Uint8Array(arrayBF);
  for(let i=0;i<byteString.length;i++)
  {
    int8Array[i]=byteString.charCodeAt(i);
  }
  const blob= new Blob([int8Array],{type:imgType})
  return blob;
}

}
