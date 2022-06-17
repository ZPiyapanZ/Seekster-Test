import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { User } from 'src/auth/user.entity';
import { Service } from 'src/services/service.entity';
import * as crypto from 'crypto';
@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}
  async createOrder(user: User, service: Service): Promise<Order> {
    const generateKey = crypto.randomBytes(12).toString('hex');
    const order = this.orderRepository.create({
      _id: generateKey,
      customer: user,
      service,
    });
    await this.orderRepository.save(order);
    return order;
  }

  async getOrders(user: User): Promise<any> {
    // const query = this.orderRepository.find({
    //   relations: ['service', 'customer'],
    //   where: {
    //     customer: {
    //       _id: user._id,
    //     },
    //   },
    // });
    const query = this.orderRepository
      .createQueryBuilder('order')
      .leftJoin('order.service', 'service')
      .leftJoin('order.customer', 'user')
      .select([
        'order._id',
        'service',
        'user._id',
        'user.fullName',
        'user.username',
        'order.createdAt',
      ])
      .where('customer_id = :id', { id: user._id })
      .getMany();
    const orders = await query;

    return orders;
  }
}
