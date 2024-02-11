import { Category } from './category.model';
import { FileHandle } from './file-handle.model';
// import { ProductComponent } from './../admin/components/productmanagement/product/product.component';
export interface product 
{
    pro_id:number |null;
    pro_Name:string;
    pro_Price:number;
    pro_Describe:string;
    pro_Quantity:number;
    pro_Discount:number;
    category:Category;
    products_img: FileHandle[];
}
