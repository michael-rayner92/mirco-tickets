import { OrderStatus } from '@mr-micro-tickets/common';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import { Order } from '../../models/order';
import { Payment } from '../../models/payment';
import { stripe } from '../../stripe';

jest.mock('../../stripe');

it('returns a 404 when purchasing an order that does not exist', async () => {
	await request(app)
		.post('/api/payments')
		.set('Cookie', global.signin())
		.send({ token: 'FAKE_TOKEN', orderId: new mongoose.Types.ObjectId().toHexString() })
		.expect(404);
});

it('returns a 401 when purchasing an order that does not belong to the user', async () => {
	const order = Order.build({
		id: new mongoose.Types.ObjectId().toHexString(),
		userId: new mongoose.Types.ObjectId().toHexString(),
		price: 20,
		version: 0,
		status: OrderStatus.Created
	});

	await order.save();

	await request(app)
		.post('/api/payments')
		.set('Cookie', global.signin())
		.send({ token: 'FAKE_TOKEN', orderId: order.id })
		.expect(401);
});

it('returns a 400 when purchasing a cancelled order', async () => {
	const order = Order.build({
		id: new mongoose.Types.ObjectId().toHexString(),
		userId: new mongoose.Types.ObjectId().toHexString(),
		price: 20,
		version: 0,
		status: OrderStatus.Cancelled
	});

	await order.save();

	await request(app)
		.post('/api/payments')
		.set('Cookie', global.signin(order.userId))
		.send({ token: 'FAKE_TOKEN', orderId: order.id })
		.expect(400);
});

it('returns a 204 with valid inputs', async () => {
	const order = Order.build({
		id: new mongoose.Types.ObjectId().toHexString(),
		userId: new mongoose.Types.ObjectId().toHexString(),
		price: 20,
		version: 0,
		status: OrderStatus.Created
	});

	await order.save();

	await request(app)
		.post('/api/payments')
		.set('Cookie', global.signin(order.userId))
		.send({ token: 'tok_visa', orderId: order.id })
		.expect(201);

	const chargeOptions = (stripe.charges.create as jest.Mock).mock.calls[0][0];
	const chargeResult = await (stripe.charges.create as jest.Mock).mock.results[0].value;

	expect(chargeOptions.source).toEqual('tok_visa');
	expect(chargeOptions.amount).toEqual(20 * 100);
	expect(chargeOptions.currency).toEqual('usd');

	const payment = await Payment.findOne({
		orderId: order.id,
		stripeId: chargeResult.id
	});

	expect(payment).toBeDefined();
	expect(payment!.orderId).toEqual(order.id);
	expect(payment!.stripeId).toEqual(chargeResult.id);
});
