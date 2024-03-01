import { Box, Heading, Input, Button, FormControl, FormLabel, FormErrorMessage, useToast, Link } from '@chakra-ui/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { v4 as uuidv4 } from 'uuid';
import { useAuth } from '@/context/AuthContext';

interface FormData {
	username: string;
	password: string;
}

const Form = () => {
	const navigate = useNavigate();
	const toast = useToast();

	const { login } = useAuth();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<FormData>();

	const [isLoginForm, setIsLoginForm] = useState<boolean>(true);

	const onSubmit: SubmitHandler<FormData> = (data) => {
		try {
			const usersString = localStorage.getItem('users') ?? '[]';
			const users = JSON.parse(usersString);

			if (isLoginForm) {
				const userExists = users.some((user: FormData) => user.username === data.username && user.password === data.password);
				const currUser = users.find((user: FormData) => user.username === data.username && user.password === data.password);

				if (userExists) {
					toast({
						title: 'Login Successful',
						status: 'success',
						duration: 3000,
						isClosable: true,
					});

					localStorage.setItem('currentUser', JSON.stringify(currUser));

					login(currUser.id);

					setTimeout(() => {
						navigate('/app');
					}, 500);
				} else {
					toast({
						title: 'Login Failed',
						description: 'Invalid username or password. Please try again.',
						status: 'error',
						duration: 3000,
						isClosable: true,
					});
				}

				reset();
			} else {
				const usernameExists = users.some((user: FormData) => user.username === data.username);

				if (usernameExists) {
					toast({
						title: 'Registration Failed',
						description: 'Username is already taken. Please choose a different username.',
						status: 'error',
						duration: 3000,
						isClosable: true,
					});
				} else {
					const userId = uuidv4();
					users.push({
						id: userId,
						username: data.username,
						password: data.password,
					});
					localStorage.setItem('users', JSON.stringify(users));

					toast({
						title: 'Registration Successful',
						description: 'User registered successfully!',
						status: 'success',
						duration: 3000,
						isClosable: true,
					});

					setTimeout(() => {
						setIsLoginForm(true);
					}, 3100);
				}
				reset();
			}
		} catch (error) {
			console.error('Error handling form submission:', error);
			toast({
				title: 'Error',
				description: 'Failed to handle form submission. Please try again.',
				status: 'error',
				duration: 3000,
				isClosable: true,
			});
		}
	};

	const switchForm = () => {
		setIsLoginForm((prev) => !prev);
	};

	return (
		<Box
			height='100vh'
			display='flex'
			justifyContent='center'
			alignItems='center'
		>
			<Box
				width='100%'
				maxW='600px'
				mx='auto'
				mt={8}
				p={6}
				borderWidth={1}
				borderRadius='md'
			>
				<Heading
					mb={4}
					textAlign='center'
				>
					{isLoginForm ? 'Login' : 'Register'}
				</Heading>
				<form onSubmit={handleSubmit(onSubmit)}>
					<FormControl isInvalid={Boolean(errors.username)}>
						<FormLabel htmlFor='username'>Username</FormLabel>
						<Input
							{...register('username', {
								required: 'Username is required',
								...(!isLoginForm && {
									minLength: { value: 4, message: 'Username must be at least 4 characters ' },
								}),
							})}
							type='text'
						/>
						<FormErrorMessage>{errors.username && errors.username.message}</FormErrorMessage>
					</FormControl>

					<FormControl
						mt={4}
						isInvalid={Boolean(errors.password)}
					>
						<FormLabel htmlFor='password'>Password</FormLabel>
						<Input
							{...register('password', {
								required: 'Password is required',
								...(!isLoginForm && {
									minLength: { value: 6, message: 'Password must be at least 6 characters long' },
								}),
							})}
							type='password'
						/>
						<FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
					</FormControl>

					<Button
						mt={6}
						colorScheme='teal'
						type='submit'
						width='full'
					>
						{isLoginForm ? 'Sign In' : 'Sign Up'}
					</Button>
				</form>

				<Box
					mt={4}
					textAlign='center'
				>
					<Link
						color='teal.500'
						onClick={switchForm}
					>
						{isLoginForm ? 'New User? Register here.' : 'Already have an account? Login here.'}
					</Link>
				</Box>
			</Box>
		</Box>
	);
};

export default Form;
