const getStatusColor = (orderStatus) => {
	if (orderStatus === 'cancelled') return 'text-danger';
	if (orderStatus === 'complete') return 'text-success';
	if (orderStatus === 'awaiting:payment') return 'text-warning';
	return 'text-primary';
};

const MyOrders = ({ orders }) => {
	const orderList = orders.map((order) => (
		<tr key={order.id}>
			<td>{order.ticket.title}</td>
			<td>${order.ticket.price}</td>
			<td className={getStatusColor(order.status)}>{order.status}</td>
		</tr>
	));

	return (
		<div>
			<h1>My Orders</h1>
			<table className="table">
				<thead>
					<tr>
						<th>Title</th>
						<th>Price</th>
						<th>Status</th>
					</tr>
				</thead>
				<tbody>{orderList}</tbody>
			</table>
		</div>
	);
};

MyOrders.getInitialProps = async (context, client) => {
	const { data } = await client.get('/api/orders');
	return { orders: data };
};

export default MyOrders;
