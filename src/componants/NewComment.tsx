import moment from 'moment';
import { FC, useContext, useState } from 'react';
import { CommentsContext } from '../utils/CommentsContext';

const NewComment: FC<{
	type: string;
	to?: {
		name: string;
		id: number;
	};
}> = ({ type, to }) => {
	const context = useContext(CommentsContext);
	const [comment, setComment] = useState<string>('');

	const submit = () => {
		const values = {
			id: new Date().getMilliseconds(),
			content: comment,
			createdAt: moment().format('MMM/DD'),
			score: 0,
			user: context?.user,
			replies: [],
			replyingTo: to?.name,
		};

		context.setter(type, values, to);
		setComment('');
	};

	return (
		<div className='newComment'>
			<img src={context?.user.image.png.toString()} alt='avatar' />
			<textarea
				placeholder='Add a comment'
				rows={4}
				value={comment}
				onChange={(e) => setComment(e.target.value)}></textarea>
			<button onClick={submit}>{type}</button>
		</div>
	);
};

export default NewComment;
