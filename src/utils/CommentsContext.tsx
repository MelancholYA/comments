import { createContext, FC, ReactChild, useState } from 'react';
import data from './data';

interface Icomment {
	id: number;
	content: string;
	createdAt: string;
	score: number;
	user: user;
	replyingTo?: string;
	replies?: reply[];
}
interface reply {
	id: number;
	content: string;
	createdAt: string;
	score: number;
	replyingTo: string;
	user: user;
}
interface user {
	image: {
		png: typeof import('*.png');
	};
	username: string;
}

interface Icontext {
	setter: Isetter;
	comments: Array<Icomment>;
	user: {
		image: {
			png: typeof import('*.png');
			webp: typeof import('*.webp');
		};
		username: string;
	};
}
type Isetter = (
	type: string,
	value: Icomment,
	to?: { name: string; id: number },
) => void;

export const CommentsContext = createContext<Icontext>({
	comments: data.comments,
	user: data.currentUser,
	setter: () => {},
});

const CommentsProvider: FC<{ children: ReactChild }> = ({ children }) => {
	const [comments, setComments] = useState<Icomment[]>(data.comments);
	const manupulate: Isetter = (type, values, to) => {
		if (values) {
			switch (type) {
				case 'ADD':
					setComments([...comments, values]);
					break;
				case 'EDIT':
					let editedArr = [...comments].map((comment) =>
						comment.id === values.id ? (comment = values) : comment,
					);
					setComments(editedArr);

					break;
				case 'DELETE':
					if (values.replyingTo) {
						comments.map((comm) =>
							comm.replies?.map((repl, i) =>
								repl.user.username === values.user.username
									? comm?.replies?.splice(i, 1)
									: repl,
							),
						);

						let leftComments = [...comments]
							.filter((filter) => filter.user.username === values.user.username)
							.map((item) =>
								item.replies?.filter(
									(reply) => reply.user.username !== values.user.username,
								),
							)[0];
						let newState = comments.map((comment) =>
							comment.user.username === values.replyingTo
								? { ...comment, replies: leftComments }
								: comment,
						);
						setComments(newState);
					} else {
						let filteredArr = [...comments].filter(
							(comment) => comment.id !== values.id,
						);
						setComments(filteredArr);
					}

					break;
				case 'REPLY':
					console.log({ values, to, comments });
					break;
				default:
					break;
			}
		}
	};

	const contextValues = {
		setter: manupulate,
		comments: comments,
		user: data.currentUser,
	};

	return (
		<CommentsContext.Provider value={contextValues}>
			{children}
		</CommentsContext.Provider>
	);
};

export default CommentsProvider;
