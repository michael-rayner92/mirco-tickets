import { useEffect, useState } from 'react';
import Router from 'next/router';
import StripeCheckout from 'react-stripe-checkout';
import useRequest from '../../hooks/use-request';

const OrderShow = ({ currentUser, order }) => {
	const [timeLeft, setTimeLeft] = useState(0);

	const { doRequest, errors } = useRequest({
		url: '/api/payments',
		method: 'post',
		body: {
			orderId: order.id
		},
		onSuccess: () => Router.push('/orders')
	});

	useEffect(() => {
		const findTimeLeft = () => {
			const msLeft = new Date(order.expiresAt) - new Date();
			setTimeLeft(Math.round(msLeft / 1000));
		};

		findTimeLeft();
		const timerId = setInterval(findTimeLeft, 1000);

		return () => clearInterval(timerId);
	}, [order]);

	return (
		<div>
			<h1>My Order</h1>
			{timeLeft < 0 ? (
				<h4 className="text-danger">Order Expired</h4>
			) : (
				<div>
					<h4>Time left to pay {timeLeft} seconds</h4>
					<StripeCheckout
						token={({ id }) => doRequest({ token: id })}
						stripeKey={process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY}
						amount={parseInt(order.ticket.price * 100)}
						email={currentUser.email}
					/>
				</div>
			)}
			{errors}
		</div>
	);
};

OrderShow.getInitialProps = async (context, client) => {
	const { orderId } = context.query;
	const { data } = await client.get(`/api/orders/${orderId}`);

	return { order: data };
};

export default OrderShow;
