import './NoResults.css';

const NoResults = ({searchValue}) => {
	return (
		<p className="no-results">
			No results found for <strong>'{searchValue}'</strong>
		</p>
	);
};

export default NoResults;