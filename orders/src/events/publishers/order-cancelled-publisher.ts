import { Publisher, OrderCancelledEvent, Subjects } from '@mr-micro-tickets/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
	readonly subject = Subjects.OrderCancelled;
}
