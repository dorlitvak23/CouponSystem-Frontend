import CompanyUserModel from "./CompanyUserModel";

export class CouponModel{
    public id?: number;
    public company?: CompanyUserModel;
    public title?: string;
    public category?: string;
    public description?: string;
    public startDate?: Date;
    public endDate?: Date;
    public amount?: number;
    public price?: number;
    public image?: string;

   

    public constructor(id?: number,company?: CompanyUserModel, title?: string, category?: string, description?: string, startDate?: Date, endDate?: Date, amount?: number, price?: number, image?: string) {
        this.id = id;
        this.company = company;
        this.title = title;
        this.category = category;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.amount = amount;
        this.price = price;
        this.image = image;
    }

    
}
