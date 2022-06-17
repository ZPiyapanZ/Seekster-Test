import { Order } from 'src/orders/order.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import * as crypto from 'crypto';
@Entity()
export class Service {
  @PrimaryColumn('varchar', {
    length: 24,
  })
  _id: string;
  @Column()
  name: string;
  @Column()
  price: number;
  @Column()
  picture: string;
  @Column()
  description: string;

  @OneToMany((_type) => Order, (order) => order.service, { eager: true })
  @Exclude({ toPlainOnly: true })
  orders: Order[];
}
