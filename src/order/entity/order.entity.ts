import { Cart } from "src/cart/entity/cart.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('order')
export class Order{
  @PrimaryGeneratedColumn() 
  id: number;
  
  @Column()
  shipingfee: number;

  @Column()
  totalprice: number;

  @CreateDateColumn()
  createdAt: string;

  
  


  @OneToMany(
    ()=>Cart, 
    (cart)=>cart.order,
    {cascade: true}
)
cart: Cart[];
  
}