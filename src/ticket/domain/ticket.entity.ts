export type TicketSeverity = 'low' | 'medium' | 'high';
export type TicketStatus = 'open' | 'in_progress' | 'resolved';

export class TicketEntity {
  private id: string;
  title: string;
  description: string;
  severity: TicketSeverity;
  private status: TicketStatus;
  private assigneeId: string | null;

  constructor(
    ticketId: string,
    ticketTitle: string,
    ticketDescription: string,
    ticketSeverity: TicketSeverity,
    ticketStatus: TicketStatus = 'open',
  ) {
    this.id = ticketId;
    this.title = ticketTitle;
    this.description = ticketDescription;
    this.severity = ticketSeverity;
    this.status = ticketStatus;
    this.assigneeId = null;
  }

  assign(userId: string): void {
    this.assigneeId = userId;
  }

  startWork(): void {
    if (this.assigneeId == null) {
      throw new Error('Cannot start an unassigned ticket.');
    } else {
      this.status = 'in_progress';
    }
  }

  resolve(): void {
    if (this.status !== 'in_progress') {
      throw new Error('Only in_progress tickets can be resolved.');
    } else {
      this.status = 'resolved';
    }
  }

  getId(): string {
    return this.id;
  }

  getStatus(): string {
    return this.status;
  }

  getAssigneeId(): string | null {
    return this.assigneeId;
  }
}
