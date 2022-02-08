import { IsNotEmpty } from "class-validator";
import { Productsize } from "../entity/product.size.entity";

export class ProductUpdateDto {
    title?: string;
    description?: string;
    size?: Productsize[];
    price?: number
    
}