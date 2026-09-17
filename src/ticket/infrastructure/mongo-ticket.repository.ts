import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ITicketRepository } from '../domain/ticket.repository.interface';
import {
  TicketEntity,
  TicketSeverity,
  TicketStatus,
} from '../domain/ticket.entity';
import { Ticket, TicketDocument } from './ticket.schema';

@Injectable()
export class MongoTicketRepository implements ITicketRepository {
  constructor(
    @InjectModel(Ticket.name) private ticketModel: Model<TicketDocument>,
  ) {}

  async save(ticket: TicketEntity): Promise<void> {
    // 1. Extract the data from the pure Entity
    const ticketData = {
      id: ticket.getId(),
      title: ticket.title,
      description: ticket.description,
      severity: ticket.severity,
      status: ticket.getStatus(),
      assigneeId: ticket.getAssigneeId(),
    };

    // 2. Upsert (Update or Insert) the document into MongoDB using our custom 'id'
    await this.ticketModel.findOneAndUpdate(
      { id: ticket.getId() },
      ticketData,
      { upsert: true, new: true }, // If it doesn't exist, create it. If it does, update it.
    );
  }

  async getById(id: string): Promise<TicketEntity | null> {
    // 1. Fetch the raw document from MongoDB
    const document = await this.ticketModel.findOne({ id }).exec();

    if (!document) {
      return null;
    }

    // 2. "Hydrate" (Reconstruct) the pure Domain Entity using the database data
    const entity = new TicketEntity(
      document.id,
      document.title,
      document.description,
      document.severity as TicketSeverity,
      document.status as TicketStatus,
    );

    // Re-attach the assignee if the database says someone is assigned
    if (document.assigneeId) {
      entity.assign(document.assigneeId);
    }

    // 3. Return the pure Entity to the Service
    return entity;
  }
}
