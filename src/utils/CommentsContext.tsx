import { createContext, FC, ReactChild, useState } from 'react';
import data from './data';

interface Icomment {
	id: string | number;
	content: string;
	createdAt: string;
	score: number;
	user: user;
	replyingTo?: string;
	replies?: reply[];
}
interface reply {
	id: string | number;
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
	to?: { name: string; id: number | string },
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
					console.log({ values });
					if (!values.replyingTo) {
						setComments(comments.filter((comm) => comm.id !== values.id));
					} else {
						let newArr = comments.map((comm, i) => {
							comm.replies?.map((item, i) =>
								item.id === values.id ? comm.replies?.splice(i, 1) : item,
							);
							return comm;
						});
						setComments(newArr);
					}

					break;
				case 'REPLY':
					let valuess = {
						id: values.id,
						content: values.content,
						createdAt: values.createdAt,
						score: values.score,
						replyingTo: values.replyingTo ? values.replyingTo : '',
						user: values.user,
					};
					let arr = comments.map((item) => {
						if (item.id === to?.id) {
							item.replies?.push(valuess);
							return item;
						} else {
							item.replies?.map((repl) => {
								if (repl.id === to?.id) {
									item.replies?.push(valuess);
									return repl;
								} else {
									return repl;
								}
							});
							return item;
						}
					});
					setComments(arr);
					console.log({ values, to, comments });
					break;

				case 'PLUS':
					let newArr = comments.map((item) => {
						if (item.id === values.id) {
							item.score += 1;
							Object.freeze(item);
							return item;
						} else {
							item.replies?.map((repl) => {
								if (repl.id === values.id) {
									repl.score += 1;
									Object.freeze(repl);
									return repl;
								} else {
									return repl;
								}
							});
							return item;
						}
					});
					setComments(newArr);

					break;
				case 'MINUS':
					if (values.score > 0) {
						let newArray = comments.map((item) => {
							if (item.id === values.id) {
								item.score -= 1;
								Object.freeze(item);
								return item;
							} else {
								item.replies?.map((repl) => {
									if (repl.id === values.id) {
										repl.score -= 1;
										Object.freeze(repl);
										return repl;
									} else {
										return repl;
									}
								});
								return item;
							}
						});
						setComments(newArray);
					}

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
