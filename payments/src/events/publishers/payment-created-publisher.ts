import { Subjects, Publisher, PaymentCreatedEvent } from '@mr-micro-tickets/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
	readonly subject = Subjects.PaymentCreated;
}
