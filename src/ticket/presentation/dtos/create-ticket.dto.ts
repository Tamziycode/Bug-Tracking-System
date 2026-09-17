import { IsString, IsNotEmpty, IsIn } from 'class-validator';
import type { TicketSeverity } from '../../domain/ticket.entity';

export class CreateTicketDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsIn(['low', 'medium', 'high'])
  severity: TicketSeverity;
}
