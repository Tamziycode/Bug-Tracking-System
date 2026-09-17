import { TicketEntity, TicketSeverity } from '../domain/ticket.entity';
import { ITicketRepository } from '../domain/ticket.repository.interface';

export class TicketService {
  private repository: ITicketRepository;

  constructor(repo: ITicketRepository) {
    this.repository = repo;
  }

  async createTicket(
    id: string,
    title: string,
    description: string,
    severity: TicketSeverity,
  ): Promise<void> {
    const theTicket = new TicketEntity(id, title, description, severity);
    await this.repository.save(theTicket);
  }

  async assignTicket(id: string, userId: string): Promise<void> {
    const foundTicket = await this.repository.getById(id);
    if (foundTicket) {
      foundTicket.assign(userId);
      await this.repository.save(foundTicket);
    }
  }

  async startTicket(id: string): Promise<void> {
    const foundTicket = await this.repository.getById(id);
    if (foundTicket) {
      foundTicket.startWork();
      await this.repository.save(foundTicket);
    }
  }

  async resolveTicket(id: string): Promise<void> {
    const foundTicket = await this.repository.getById(id);
    if (foundTicket) {
      foundTicket.resolve();
      await this.repository.save(foundTicket);
    }
  }
}
