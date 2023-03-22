import Link from 'next/link';

export default ({ currentUser }) => {
	const links = [
		!currentUser && { label: 'Sign Up', href: '/auth/signup' },
		!currentUser && { label: 'Sign In', href: '/auth/signin' },
		currentUser && { label: 'Sell Tickets', href: '/tickets/new' },
		currentUser && { label: 'My Orders', href: '/orders' },
		currentUser && { label: 'Sign Out', href: '/auth/signout' }
	]
		.filter((linkConfig) => linkConfig)
		.map(({ label, href }) => (
			<li key={href} className="nav-item px-2">
				<Link href={href} className="nav-link">
					{label}
				</Link>
			</li>
		));

	return (
		<nav className="navbar bg-light">
			<div className="container-fluid">
				<Link href="/" className="navbar-brand">
					GitTix
				</Link>

				<ul className="navbar-nav d-flex flex-row align-items-center">{links}</ul>
			</div>
		</nav>
	);
};
