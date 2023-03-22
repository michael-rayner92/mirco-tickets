import { Publisher, Subjects, TicketUpdatedEvent } from '@mr-micro-tickets/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
	readonly subject = Subjects.TicketUpdated;
}
