export class PaymentInfor 
{
     province!: String;
     district!:String;
     town!:String;
     streetNumber!:String;
     phoneNumber!:String;
     name!:String;
     constructor(
        province: String,
        distric:String,
        town:String,
        StreetNumber:String,
        PhoneNumber:String,
        Name:String,)
     {
        this.province=province;
        this.district=distric;
        this.town=town;
        this.streetNumber=StreetNumber;
        this.phoneNumber=PhoneNumber;
        this.name=Name;

     }
}