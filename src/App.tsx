import './styles/main.css';
import NewComment from './componants/NewComment';
import CommentsProvider from './utils/CommentsContext';
import Comments from './componants/Comments';

function App() {
	return (
		<CommentsProvider>
			<div className='App'>
				<Comments />
				<NewComment type='ADD' />
			</div>
		</CommentsProvider>
	);
}

export default App;
