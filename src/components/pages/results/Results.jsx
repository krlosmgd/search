import "./Results.css";
import Search from "../../search/Search";
import ItemCard from "../../itemCard/ItemCard";
import Modal from "../../modal/Modal";
import { shallowEqual, useSelector } from "react-redux";
import data from "../../../data/";
import { useDispatch } from "react-redux";
import {
	setIsSearching,
	setSearchResults,
	setShowModalDetailInResponsive,
} from "../../../slices/searchSlice";
import Footer from "../../layout/footer/Footer";
import Header from "../../layout/header/Header";
import ItemList from "../../itemList/ItemList";
import { useMediaQuery } from "react-responsive";
import { debounceTime, fromEvent } from "rxjs";
import { useParams } from "react-router-dom";
import RecommendedSearch from './../../recommendedSearch/recommendedSearch';
import NoResults from './../../noResults/NoResults';

const Results = () => {
	const dispatch = useDispatch();
	const { search } = useParams();

	const isDesktop = useMediaQuery({ minWidth: 1025 });
	const isMobile = useMediaQuery({ maxWidth: 767 });
	const isTablet = useMediaQuery({ maxWidth: 1024 });
	const showModalDetailInResponsive = useSelector(
		(state) => state.search.showModalDetailInResponsive
	);
	const hasText = useSelector((state) => state.search.hasText);
	const searchValue = useSelector((state) => state.search.searchValue);
	const searchResults = useSelector((state) => state.search.searchResults, shallowEqual);
	const detailResult = useSelector((state) => state.search.detailResult);
	
	const onKeyUp = (element) => {
		fromEvent(element.target, 'input')
		.pipe(debounceTime(500))
		.subscribe(() => {
			handleSetSearchResults();
		});
	};

	const handleSetSearchResults = () => {
		dispatch(
			setSearchResults(
				data.filter(
					(item) =>
						item.type.toLowerCase().indexOf(searchValue.toLowerCase()) === 0 ||
						item.title.toLowerCase().indexOf(searchValue.toLowerCase()) === 0
				)
			)
			);
			setTimeout(() => {
				handleIsSearching();
			}, 1000);
	}

	const handleIsSearching = () => {
		dispatch(setIsSearching(false));
	}

	if(search !== ''){
		handleSetSearchResults();
	}


	return (
		<main className="results">
			<Header Search={Search} onKeyUp={(e) => onKeyUp(e)} />
			<div className="results-body">
				{hasText ? (
					searchResults.length ? (
						<div className="results-body-content">
							<div className="results-body-content-data">
								<ItemList data={searchResults} />
							</div>
							<div className="results-body-detail">
								{isDesktop ? (
									detailResult.image ? (
										<ItemCard detail={detailResult} />
									) : (
										""
									)
								) : (
									""
								)}
								{isMobile || isTablet ? (
									showModalDetailInResponsive ? (
										<Modal
											ItemCard={ItemCard}
											item={detailResult}
											clickOverlay={() => {
												dispatch(setShowModalDetailInResponsive(false));
											}}
										/>
									) : (
										""
									)
								) : (
									""
								)}
							</div>
						</div>
					) : (
						<NoResults searchValue={searchValue} />
					)
				) : (
					""
				)}

				{!hasText || !searchResults.length ? (
					<RecommendedSearch />
				) : (
					""
				)}
			</div>

			<Footer />
		</main>
	);
};

export default Results;
