import { Flex } from '@chakra-ui/react';
import { formatTime } from '@/utils/formatTime';

interface CommentItemProps {
	comment: {
		text: string;
		time: string;
	};
}
const CommentItem = ({ comment }: CommentItemProps) => {
	return (
		<Flex
			className='todo-comment-item'
			justifyContent='space-between'
			background='#f8f9fd'
			padding='12px'
		>
			<p>{comment.text}</p>
			<p>{formatTime(comment.time)}</p>
		</Flex>
	);
};

export default CommentItem;
