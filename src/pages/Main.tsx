import { Box } from '@chakra-ui/react';
import { TodoList } from '@/components';
import Navbar from '@/components/Navbar/Navbar';

const Main = () => {
	return (
		<>
			<Navbar />
			<Box
				width='100%'
				maxW='980px'
				mx='auto'
				mt='48px'
				sx={{
					'@media screen and (max-width:991px)': {
						padding: '0 24px',
					},
				}}
			>
				<Box
					sx={{
						fontFamily: 'Figtree-Bold,san-serif',
						fontSize: '48px',
						lineHeight: '1.2',
					}}
				>
					Todo List
				</Box>
				<TodoList />
			</Box>
		</>
	);
};

export default Main;
