import { IsNotEmpty } from "class-validator";

export class OrderCreateDto {
    @IsNotEmpty()
    shipingfee: number;

    @IsNotEmpty()
    totalprice: number;   
}