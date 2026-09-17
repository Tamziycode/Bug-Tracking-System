import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TicketDocument = HydratedDocument<Ticket>;

@Schema()
export class Ticket {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  severity: string;

  @Prop({ required: true })
  status: string;

  @Prop({ type: String, default: null })
  assigneeId: string | null;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);
