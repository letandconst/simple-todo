import { formatDistanceToNow } from 'date-fns';

export const formatTime = (timestamp: string | number | Date) => {
	const distance = formatDistanceToNow(new Date(timestamp), { addSuffix: true });
	return distance;
};
