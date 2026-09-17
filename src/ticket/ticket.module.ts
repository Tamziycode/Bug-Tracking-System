import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TicketService } from './application/ticket.service';
import { MongoTicketRepository } from './infrastructure/mongo-ticket.repository';
import { Ticket, TicketSchema } from './infrastructure/ticket.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Ticket.name, schema: TicketSchema }]),
  ],
  controllers: [], // We will build the Controller next
  providers: [
    TicketService,
    {
      provide: 'ITicketRepository', // The string token we used in the Service
      useClass: MongoTicketRepository, // The concrete Mongoose class
    },
  ],
})
export class TicketModule {}
