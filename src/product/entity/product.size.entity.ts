import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('products-size')
export class Productsize {
    @PrimaryGeneratedColumn()
    id: number;    

    
    @Column()
    name: string;


}