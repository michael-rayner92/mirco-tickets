import { Publisher, Subjects, TicketCreatedEvent } from '@mr-micro-tickets/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
	readonly subject = Subjects.TicketCreated;
}
