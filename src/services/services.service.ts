import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { Order } from 'src/orders/order.entity';
import { OrdersService } from 'src/orders/orders.service';
import { Repository } from 'typeorm';
import { Service } from './service.entity';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private serviceRepository: Repository<Service>,
    private ordersService: OrdersService,
  ) {}

  async getServies(): Promise<Service[]> {
    const query = this.serviceRepository.find();
    const services = await query;
    return services;
  }
  async getServieById(_id: string): Promise<Service> {
    const found = await this.serviceRepository.findOne({ where: { _id } });
    if (!found) {
      throw new NotFoundException(`Service with ID "${_id}" not found`);
    }
    return found;
  }
  async bookingService(_id: string, user: User): Promise<{ message: string }> {
    const service = await this.getServieById(_id);
    await this.ordersService.createOrder(user, service);
    return { message: 'Service is booked' };
  }
}
