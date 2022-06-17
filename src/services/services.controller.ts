import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { Order } from 'src/orders/order.entity';
import { Service } from './service.entity';
import { ServicesService } from './services.service';

@Controller('services')
export class ServicesController {
  constructor(private servicesService: ServicesService) {}

  @Get()
  getServices(): Promise<Service[]> {
    return this.servicesService.getServies();
  }
  @Get('/:service_id')
  getServiceById(@Param('service_id') _id: string): Promise<Service> {
    return this.servicesService.getServieById(_id);
  }

  @UseGuards(AuthGuard())
  @Post('/:service_id/booking')
  bookingService(
    @Param('service_id') _id: string,
    @GetUser() user: User,
  ): Promise<{ message: string }> {
    return this.servicesService.bookingService(_id, user);
  }
}
