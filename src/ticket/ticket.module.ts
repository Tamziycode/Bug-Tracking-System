import { Module } from '@nestjs/common';
import { TicketController } from './presentation/ticket.controller';
import { TicketService } from './application/ticket.service';

@Module({
  controllers: [TicketController],
  providers: [TicketService],
})
export class TicketModule {}
