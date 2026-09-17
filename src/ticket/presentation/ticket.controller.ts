import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  BadRequestException,
} from '@nestjs/common';
import { TicketService } from '../application/ticket.service';
import { CreateTicketDto } from './dtos/create-ticket.dto';

@Controller('tickets')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Post()
  async createTicket(@Body() dto: CreateTicketDto) {
    await this.ticketService.createTicket(
      dto.id,
      dto.title,
      dto.description,
      dto.severity,
    );
    return { message: 'Ticket created successfully' };
  }

  @Patch(':id/assign')
  async assignTicket(@Param('id') id: string, @Body('userId') userId: string) {
    await this.ticketService.assignTicket(id, userId);
    return { message: `Ticket ${id} assigned to ${userId}` };
  }

  @Patch(':id/start')
  async startTicket(@Param('id') id: string) {
    try {
      await this.ticketService.startTicket(id);
      return { message: `Ticket ${id} is now in progress` };
    } catch (error: any) {
      // This catches the strict domain errors you wrote in TicketEntity
      throw new BadRequestException(error.message);
    }
  }

  @Patch(':id/resolve')
  async resolveTicket(@Param('id') id: string) {
    try {
      await this.ticketService.resolveTicket(id);
      return { message: `Ticket ${id} has been resolved` };
    } catch (error: any) {
      throw new BadRequestException(error.message);
    }
  }
}
