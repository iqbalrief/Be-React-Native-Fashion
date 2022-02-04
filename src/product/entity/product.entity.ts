import { Cart } from "src/cart/entity/cart.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn  } from "typeorm";
import { Upload } from "./product.image.entity";
import { Productsize } from "./product.size.entity";

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @OneToMany(
        ()=>Upload, 
        (foto)=>foto.product,
        {cascade: true}
    )
    image: Upload[];

    @OneToMany(
        ()=>Cart, 
        (cart)=>cart.product,
        {cascade: true}
    )
    cart: Cart[];

    @Column()
    price: number;
    

    @JoinTable()
    @ManyToMany(
        ()=>Productsize,
        (size)=>size.name,
        {cascade: true}
    )
    size: Productsize[]
    
}