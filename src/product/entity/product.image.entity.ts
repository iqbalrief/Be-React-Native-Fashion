import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";

@Entity('images')
export class Upload {
    @PrimaryGeneratedColumn()
    id: number;    

    @Column()
    filename: string;

    @ManyToOne(
        ()=>Product, 
        (produk)=>produk.image,
    )
    product: Product
  
}