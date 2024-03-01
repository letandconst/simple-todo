import { Flex, Spacer, Text, Button } from '@chakra-ui/react';
import { useAuth } from '@/context/AuthContext';

const Navbar = () => {
	const { logout } = useAuth();

	const user = localStorage.getItem('currentUser');
	const userData = JSON.parse(user ? user : '');

	return (
		<Flex
			align='center'
			justify='flex-end'
			p={4}
			bg='teal.500'
		>
			<Text
				fontSize='xl'
				fontWeight='bold'
				color='white'
			>
				Welcome, {userData.username}
			</Text>
			<Spacer />
			<Button
				colorScheme='red'
				onClick={logout}
			>
				Logout
			</Button>
		</Flex>
	);
};

export default Navbar;
