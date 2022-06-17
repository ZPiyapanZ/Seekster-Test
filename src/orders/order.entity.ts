import { User } from 'src/auth/user.entity';
import { Service } from 'src/services/service.entity';
import { Entity, ManyToOne, PrimaryColumn, Column } from 'typeorm';
@Entity()
export class Order {
  @PrimaryColumn('varchar', {
    length: 24,
  })
  _id: string;

  @ManyToOne((_type) => User, (user) => user.orders, { eager: false })
  customer: User;

  @ManyToOne((_type) => Service, (service) => service.orders, { eager: false })
  service: Service;

  // @CreateDateColumn({
  //   type: 'timestamp',
  //   default: () => 'CURRENT_TIMESTAMP(6)',
  // })
  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
