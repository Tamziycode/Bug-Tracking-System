import { TicketEntity } from './ticket.entity';

export interface ITicketRepository {
  save(ticket: TicketEntity): Promise<void>;
  getById(id: string): Promise<TicketEntity | null>;
}
