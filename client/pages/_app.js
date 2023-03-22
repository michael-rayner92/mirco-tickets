import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/build-client';
import Header from '../components/header';

const AppComponent = ({ Component, pageProps, currentUser }) => {
	return (
		<>
			<Header currentUser={currentUser} />
			<main className="container-fluid">
				<div className="container pt-3">
					<Component currentUser={currentUser} {...pageProps} />
				</div>
			</main>
		</>
	);
};

AppComponent.getInitialProps = async (appContext) => {
	const client = buildClient(appContext.ctx);
	const { data } = await client.get('/api/users/currentuser');

	let pageProps = {};

	if (appContext.Component.getInitialProps) {
		pageProps = await appContext.Component.getInitialProps(
			appContext.ctx,
			client,
			data.currentUser
		);
	}

	return { pageProps, ...data };
};

export default AppComponent;
