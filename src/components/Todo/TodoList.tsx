/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { VStack, Input, Button, Flex } from '@chakra-ui/react';
import { TodoItem } from '..';

const TodoList = () => {
	const userList = localStorage.getItem('users') ?? '[]';
	const currUser = localStorage.getItem('currentUser');
	const currUserData = JSON.parse(currUser ? currUser : '');

	const [todos, setTodos] = useState(currUserData.todos || []);
	const [newTodo, setNewTodo] = useState<string>('');
	const [index, setIndex] = useState<number | null>(null);

	const [openID, setOpenID] = useState<number | null>(null);

	const handleToggle = (index: number) => {
		setOpenID((prevIndex) => (prevIndex === index ? null : index));
	};

	const handleCancel = () => {
		setNewTodo('');
		setIndex(null);
	};

	const addOrUpdateTodo = () => {
		if (newTodo.trim() !== '') {
			const updatedTodos = [...todos];

			if (index !== null) {
				updatedTodos[index] = { todo: newTodo, comments: [] };
				setIndex(null);
			} else {
				updatedTodos.push({ todo: newTodo, comments: [] });
			}

			setTodos(updatedTodos);
			setNewTodo('');
			updateData(updatedTodos);
		}
	};

	const editTodo = (index: number) => {
		setNewTodo(todos[index].todo);
		setIndex(index);
	};

	const removeTodo = (index: number) => {
		const newTodos = [...todos];
		newTodos.splice(index, 1);
		setTodos(newTodos);
		setIndex(null);
		updateData(newTodos);
	};

	const updateData = (updatedTodos: string[]) => {
		if (currUser) {
			console.log('curr', currUser);
			const users = JSON.parse(userList);
			const currentUserIndex = users.findIndex((user: { username: string }) => user.username === currUserData.username);

			if (currentUserIndex !== -1) {
				users[currentUserIndex].todos = updatedTodos;
				localStorage.setItem('users', JSON.stringify(users));
			}
		}
	};

	const handleDataUpdate = (updatedUserData: any[]) => {
		const userMatches = updatedUserData.find((user) => user.id === currUserData.id);

		if (userMatches) {
			const updatedTodos = userMatches.todos || [];
			setTodos(updatedTodos);
		} else {
			console.log('Not found');
		}
	};

	useEffect(() => {
		if (currUser) {
			const users = JSON.parse(userList);
			const currentUser = users.find((user: { username: string | null; todos: string[] }) => user.username === currUserData.username);

			if (currentUser) {
				setTodos(currentUser.todos || []);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currUser, userList]);

	return (
		<VStack
			align='start'
			spacing={4}
			p={4}
		>
			<Input
				placeholder={index !== null ? 'Update todo' : 'Add a new todo'}
				value={newTodo}
				onChange={(e) => setNewTodo(e.target.value)}
			/>
			<Flex columnGap={index !== null ? '8px' : '0'}>
				<Button
					colorScheme='blue'
					onClick={addOrUpdateTodo}
				>
					{index !== null ? 'Update Todo' : 'Add Todo'}
				</Button>

				{index !== null && (
					<Button
						colorScheme='gray'
						onClick={handleCancel}
					>
						Cancel
					</Button>
				)}
			</Flex>

			<VStack
				align='start'
				spacing={2}
				width='100%'
			>
				{todos.map((todo: any, index: number) => (
					<TodoItem
						key={index}
						todo={todo}
						onEdit={() => editTodo(index)}
						onRemove={() => removeTodo(index)}
						isOpen={index === openID}
						onToggle={() => handleToggle(index)}
						index={index}
						onDataUpdate={handleDataUpdate}
					/>
				))}
			</VStack>
		</VStack>
	);
};

export default TodoList;
