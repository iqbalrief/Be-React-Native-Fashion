import { Product } from "src/product/entity/product.entity";
import { User } from "src/user/Models/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity('carts')
export class Cart{
  @PrimaryGeneratedColumn() 
  id: number;
  
  @Column()
  quantity: number;

  @Column()
  size: string;

  @Column()
  image: string;

  @ManyToOne(() => User, (user) => user.cart)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Product, (product) => product.cart)
  @JoinColumn()
  product: Product;

  
}