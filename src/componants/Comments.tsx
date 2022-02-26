import { FC, useContext } from 'react';
import { CommentsContext } from '../utils/CommentsContext';
import Comment from './Comment';

const Comments: FC = () => {
	const context = useContext(CommentsContext);
	return (
		<div>
			{context?.comments.map((comment) => (
				<Comment
					user={context.user}
					key={comment.id}
					data={comment}
					setter={context.setter}
				/>
			))}
		</div>
	);
};
export default Comments;
