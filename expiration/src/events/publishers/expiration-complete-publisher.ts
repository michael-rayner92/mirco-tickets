import { Subjects, Publisher, ExpirationCompleteEvent } from '@mr-micro-tickets/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
	readonly subject = Subjects.ExpirationComplete;
}
