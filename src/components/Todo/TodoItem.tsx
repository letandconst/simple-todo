/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { Box, Flex, Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { MdEdit, MdDelete, MdOutlineComment } from 'react-icons/md';
import { CommentItem } from '..';

interface TodoComments {
	text: string;
	time: string;
}
interface TodoItems {
	todo: string;
	comments: TodoComments[];
}
interface TodoItemProps {
	todo: TodoItems;
	onRemove: () => void;
	onEdit: () => void;
	isOpen: boolean;
	onToggle: () => void;
	index: number;
	onDataUpdate: (updatedUserData: any[]) => void;
}
const TodoItem = ({ todo, onRemove, onEdit, isOpen, onToggle, index, onDataUpdate }: TodoItemProps) => {
	const data = localStorage.getItem('users') ?? '[]';
	const usersData = JSON.parse(data);

	const currentUser = localStorage.getItem('currentUser');
	const currentUserData = JSON.parse(currentUser ? currentUser : '');
	const [userData, setUserData] = useState(usersData);
	const [comment, setComment] = useState<string>('');

	const handleAddComment = (userId: string, todoIndex: number) => {
		const timestamp = new Date().toISOString();

		if (!comment.trim()) {
			return;
		}

		setUserData((prevUserData: { id: string; todos: any[] }[]) => {
			const updatedUserData = prevUserData.map((user: { id: string; todos: any[] }) => {
				if (user.id === userId) {
					const updatedTodos = user.todos.map((todo, index) => {
						if (index === todoIndex) {
							const updatedComments = [...(todo.comments || []), { text: comment, time: timestamp }];

							return {
								todo: todo.todo,
								comments: updatedComments,
							};
						}
						return todo;
					});

					return { ...user, todos: updatedTodos };
				}
				return user;
			});

			localStorage.setItem('users', JSON.stringify(updatedUserData));

			return updatedUserData;
		});

		setComment('');
	};

	useEffect(() => {
		onDataUpdate(userData);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userData]);

	return (
		<>
			<Box
				width='100%'
				p='8px 12px'
				borderWidth='1px'
				borderRadius='md'
				display='flex'
				justifyContent='space-between'
				alignItems='center'
			>
				<Box
					fontWeight='700'
					textTransform='capitalize'
				>
					{todo.todo}
				</Box>

				<Flex
					sx={{
						gap: '8px',
						button: {
							padding: '8px',
							span: {
								margin: '0',
							},
						},
					}}
				>
					<Button
						onClick={onToggle}
						leftIcon={<MdOutlineComment />}
						colorScheme='teal'
						variant='solid'
					/>
					<Button
						onClick={onEdit}
						leftIcon={<MdEdit />}
						colorScheme='green'
						variant='solid'
					/>
					<Button
						onClick={onRemove}
						leftIcon={<MdDelete />}
						colorScheme='red'
						variant='solid'
					/>
				</Flex>
			</Box>

			{isOpen && (
				<>
					<Box
						width='100%'
						border='1px solid #e2e8f0'
						p='8px 12px'
						sx={{
							'> .todo-comment-item:not(:first-of-type)': {
								marginTop: '8px',
							},
						}}
					>
						{todo.comments.map((comment, commentIndex) => (
							<CommentItem
								comment={comment}
								key={commentIndex}
							/>
						))}
						<Flex
							sx={{
								width: '100%',
								gap: '8px',
								button: {
									padding: '8px',
									span: {
										margin: '0',
									},
								},
								mt: todo.comments.length != 0 ? '24px' : '0',
							}}
						>
							<InputGroup width='100%'>
								<Input
									placeholder='Add your comment...'
									value={comment}
									onChange={(e) => setComment(e.target.value)}
								/>
								<InputRightElement width='max-content'>
									<Button
										onClick={() => handleAddComment(currentUserData.id, index)}
										colorScheme='teal'
										variant='solid'
										isDisabled={!comment.trim()}
									>
										Add Comment
									</Button>
								</InputRightElement>
							</InputGroup>
						</Flex>
					</Box>
				</>
			)}
		</>
	);
};

export default TodoItem;
