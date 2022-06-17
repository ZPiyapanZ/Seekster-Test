import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  customer_id: string;

  @IsNotEmpty()
  service_id: string;
}
