import { FC, useState } from 'react';
import NewComment from './NewComment';

interface props {
	data: {
		id: string | number;
		content: string;
		createdAt: string;
		score: number;
		user: user;
		replies?: reply[];
		replyingTo?: string;
	};
	user: {
		image: {
			png: typeof import('*.png');
		};
		username: string;
	};
	setter: (
		type: string,
		values: {
			id: string | number;
			content: string;
			createdAt: string;
			score: number;
			user: user;
			replies?: reply[];
		},
	) => void;
}
interface reply {
	id: string | number;
	content: string;
	createdAt: string;
	score: number;
	replyingTo: string;
	user: {
		image: {
			png: typeof import('*.png');
		};
		username: string;
	};
}
interface user {
	image: {
		png: typeof import('*.png');
	};
	username: string;
}

interface Ireply {
	to?: {
		name: string;
		id: string | number;
	};
	show: boolean;
}

const Comment: FC<props> = ({ data, user, setter }) => {
	const [showReply, setShowReply] = useState<Ireply>({ show: false });

	return (
		<>
			<div className='comment'>
				<div className='likes'>
					<button onClick={() => setter('PLUS', data)}></button>
					<h2>{data.score}</h2>
					<button onClick={() => setter('MINUS', data)}></button>
				</div>
				<div className='main'>
					<div className='header'>
						<div>
							<img src={data.user.image.png.toString()} alt='' />
							<h4>{data.user.username}</h4>
							{data.user.username === user?.username && (
								<span className='local'>You</span>
							)}
							<span className='date'>{data.createdAt}</span>
						</div>

						<div>
							{data.user.username !== user?.username ? (
								!showReply.show ? (
									<>
										<button
											onClick={() =>
												setShowReply({
													show: true,
													to: {
														name: data.user.username,
														id: data.id,
													},
												})
											}>
											<svg
												xmlns='http://www.w3.org/2000/svg'
												viewBox='0 0 512 512'>
												<path d='M8.309 189.836L184.313 37.851C199.719 24.546 224 35.347 224 56.015v80.053c160.629 1.839 288 34.032 288 186.258 0 61.441-39.581 122.309-83.333 154.132-13.653 9.931-33.111-2.533-28.077-18.631 45.344-145.012-21.507-183.51-176.59-185.742V360c0 20.7-24.3 31.453-39.687 18.164l-176.004-152c-11.071-9.562-11.086-26.753 0-36.328z' />
											</svg>
											<span>Reply</span>
										</button>
									</>
								) : (
									<>
										<button onClick={() => setShowReply({ show: false })}>
											<svg
												xmlns='http://www.w3.org/2000/svg'
												viewBox='0 0 512 512'>
												<path d='M464 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-83.6 290.5c4.8 4.8 4.8 12.6 0 17.4l-40.5 40.5c-4.8 4.8-12.6 4.8-17.4 0L256 313.3l-66.5 67.1c-4.8 4.8-12.6 4.8-17.4 0l-40.5-40.5c-4.8-4.8-4.8-12.6 0-17.4l67.1-66.5-67.1-66.5c-4.8-4.8-4.8-12.6 0-17.4l40.5-40.5c4.8-4.8 12.6-4.8 17.4 0l66.5 67.1 66.5-67.1c4.8-4.8 12.6-4.8 17.4 0l40.5 40.5c4.8 4.8 4.8 12.6 0 17.4L313.3 256l67.1 66.5z' />
											</svg>
											<span>Dismiss</span>
										</button>
									</>
								)
							) : (
								<>
									<button onClick={() => setter('DELETE', data)}>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											viewBox='0 0 448 512'>
											<path d='M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z' />
										</svg>
										<span>Delete</span>
									</button>
								</>
							)}
						</div>
					</div>
					<p className='body'>
						{data?.replyingTo && (
							<span className='mention'> @{data.replyingTo} </span>
						)}

						{data.content}
					</p>
				</div>
			</div>
			<div className='reply'>
				{data.replies?.map((reply) => (
					<Comment user={user} key={reply.id} setter={setter} data={reply} />
				))}
			</div>
			{showReply.show && (
				<div>
					<NewComment type='REPLY' to={showReply.to} />
				</div>
			)}
		</>
	);
};

export default Comment;
