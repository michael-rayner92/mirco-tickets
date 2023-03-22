import express, { Request, Response } from 'express';
import { param } from 'express-validator';
import { NotFoundError, validateRequest } from '@mr-micro-tickets/common';
import { Ticket } from '../models/ticket';

const router = express.Router();

router.get(
	'/api/tickets/:id',
	[param('id').isMongoId().withMessage('Invalid Id')],
	validateRequest,
	async (req: Request, res: Response) => {
		const ticket = await Ticket.findById(req.params.id);

		if (!ticket) {
			throw new NotFoundError();
		}

		res.send(ticket);
	}
);

export { router as showTicketRouter };
