import { ItemDto } from "./ItemDto.model";

export interface CreateOrder
{
    ListItem:ItemDto[];
    address_id:any;
}