import { useRouteError } from 'react-router-dom';
import { Box } from '@chakra-ui/react';

interface RouteError {
	status?: number;
	statusText?: string;
	message?: string;
}

const Error = () => {
	const error = useRouteError();

	const routeError: RouteError = error || {};

	return (
		<Box
			display='flex'
			justifyContent='center'
			alignItems='center'
			flexDirection='column'
			height='100vh'
		>
			<h1>Sorry, an unexpected error has occurred.</h1>
			<p>
				<i>{routeError.statusText || routeError.message}</i>
			</p>
		</Box>
	);
};

export default Error;
