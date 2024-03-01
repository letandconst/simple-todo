import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Form from '@/components/Auth/Form';
import Error from '@/pages/404';
import Main from '@/pages/Main';
import { useAuth } from '@/context/AuthContext';

const App = () => {
	const { isLoggedIn } = useAuth();

	const router = createBrowserRouter([
		{
			path: '/',
			element: isLoggedIn ? (
				<Navigate
					to='/app'
					replace
				/>
			) : (
				<Form />
			),
			errorElement: <Error />,
		},
		{
			path: '/app',
			element: isLoggedIn ? (
				<Main />
			) : (
				<Navigate
					to='/'
					replace
				/>
			),
			errorElement: <Error />,
		},
	]);

	return <RouterProvider router={router} />;
};

export default App;
