import { TicketEntity } from './ticket.entity';

export interface ITicketRepository {
  save(ticket: TicketEntity): void;
  getById(id: string): TicketEntity | undefined;
}
