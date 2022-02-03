import { Cart } from "src/cart/entity/cart.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    hashedRt?: string;

    @OneToMany(
        ()=>Cart, 
        (cart)=>cart.user,
        {cascade: true}
    )
   cart : Cart[];

}