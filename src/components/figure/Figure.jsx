import './Figure.css';

const Figure = ({url, onClick }) => {
	return (
		<img
			className="figure"
			src={url}
			alt="google"
			onClick={onClick}
		/>
	);
};


export default Figure;