import { IsNotEmpty } from "class-validator";

export class CartCreateDto {
    @IsNotEmpty()
    quantity: number;

    @IsNotEmpty()
    size : string;

    
    image: string;

    @IsNotEmpty()
    productId: number;

}