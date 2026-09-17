import { TicketEntity, TicketSeverity } from '../domain/ticket.entity';
import { ITicketRepository } from '../domain/ticket.repository.interface';

export class TicketService {
  private repository: ITicketRepository;

  constructor(repo: ITicketRepository) {
    this.repository = repo;
  }

  createTicket(
    id: string,
    title: string,
    description: string,
    severity: TicketSeverity,
  ): void {
    const theTicket = new TicketEntity(id, title, description, severity);
    this.repository.save(theTicket);
  }

  assignTicket(id: string, userId: string): void {
    const foundTicket = this.repository.getById(id);
    if (foundTicket) {
      foundTicket.assign(userId);
      this.repository.save(foundTicket);
    }
  }

  startTicket(id: string): void {
    const foundTicket = this.repository.getById(id);
    if (foundTicket) {
      foundTicket.startWork();
      this.repository.save(foundTicket);
    }
  }

  resolveTicket(id: string): void {
    const foundTicket = this.repository.getById(id);
    if (foundTicket) {
      foundTicket.resolve();
      this.repository.save(foundTicket);
    }
  }
}
