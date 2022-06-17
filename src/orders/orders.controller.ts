import { Controller, UseGuards } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { Order } from './order.entity';
import { OrdersService } from './orders.service';
@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @UseGuards(AuthGuard())
  @Get()
  getOrders(@GetUser() user: User): Promise<any> {
    return this.ordersService.getOrders(user);
  }
}
