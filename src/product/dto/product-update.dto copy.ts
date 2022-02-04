import { IsNotEmpty } from "class-validator";

export class ProductUpdateDto {
    title?: string;
    description?: string;
    image?: string;
    size?:string;
    price?: number
    
}