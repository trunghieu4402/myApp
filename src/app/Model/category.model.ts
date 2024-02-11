
export class Category 
{
     cate_id?:number ;
     cate_name?:String ;
     cate_Describe?:String ;
     constructor(name:String,des:String )
     {
        this.cate_name=name;
        this.cate_Describe=des;
     }
}