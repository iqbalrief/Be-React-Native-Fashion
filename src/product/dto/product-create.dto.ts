import { IsNotEmpty } from "class-validator";

export class ProductCreateDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;

    
    image: string;

    @IsNotEmpty()
    size: string[];

    @IsNotEmpty()
    price: number

   
}