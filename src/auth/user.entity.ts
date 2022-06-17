import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Order } from 'src/orders/order.entity';
import { Exclude } from 'class-transformer';
@Entity()
export class User {
  @PrimaryColumn('varchar', {
    length: 24,
  })
  _id: string;
  @Column()
  fullName: string;
  @Column({ unique: true })
  username: string;
  @Column()
  password: string;

  @OneToMany((_type) => Order, (order) => order.customer, { eager: true })
  @Exclude({ toPlainOnly: true })
  orders: Order[];
}
