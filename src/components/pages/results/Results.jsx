import "./Results.css";
import Search from "../../search/Search";
import ItemCard from "../../itemCard/ItemCard";
import Modal from "../../modal/Modal";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import data from "../../../data/";
import {
	setIsSearching,
	setSearchResults,
	setShowModalDetailInResponsive,
} from "../../../slices/searchSlice";
import Footer from "../../layout/footer/Footer";
import Header from "../../layout/header/Header";
import ItemList from "../../itemList/ItemList";
import { useMediaQuery } from "react-responsive";
import RecommendedSearch from "./../../recommendedSearch/recommendedSearch";
import NoResults from "./../../noResults/NoResults";
import Paginator from "../../paginator/Paginator";
import { useLocation, useParams } from "react-router-dom";
import { useEffect } from "react";

const Results = () => {
	const { search } = useParams();

	const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const currentPage = searchParams.get('page') || 1;
  const itemsPerPage = searchParams.get('items') || 10;
	const dispatch = useDispatch();
	const isDesktop = useMediaQuery({ minWidth: 1025 });
	const isMobile = useMediaQuery({ maxWidth: 767 });
	const isTablet = useMediaQuery({ maxWidth: 1024 });
	const showModalDetailInResponsive = useSelector(
		(state) => state.search.showModalDetailInResponsive
	);
	const hasText = useSelector((state) => state.search.hasText);
	const searchValue = useSelector((state) => state.search.searchValue);
	const searchResults = useSelector(
		(state) => state.search.searchResults,
		shallowEqual
	);
	const detailResult = useSelector((state) => state.search.detailResult);

	const handleSetSearchResults = () => {
		dispatch(
			setSearchResults(
				getDataFilterByTitleOrType()
			)
		);
		setTimeout(() => {
			handleIsSearching();
		}, 1000);
	};

	const getDataFilterByTitleOrType = () => {
		return data.filter(
			(item) =>
				item.type.toLowerCase().indexOf(searchValue.toLowerCase()) === 0 ||
				item.title.toLowerCase().indexOf(searchValue.toLowerCase()) === 0
		);
	}

	const handleIsSearching = () => {
		dispatch(setIsSearching(false));
	};

	const handlePageChanged = (newPage, itemsPerPage) => {
    const startIndex = (newPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    dispatch(setSearchResults(getDataFilterByTitleOrType().slice(startIndex, endIndex)));
  }

	useEffect(() => {
		if(search !== ''){
			handleSetSearchResults();
		}
	}, [])
	


	return (
		<main className="results">
			<Header Search={Search} onKeyUp={() => {handleSetSearchResults()}} />
			<div className="results-body">
				{hasText ? (
					searchResults.length ? (
						<div className="results-body-content">
							<div className="results-body-content-data">
								<ItemList data={searchResults.slice(0, itemsPerPage)} />
								<Paginator
									currentPage={currentPage}
									itemsPerPage={itemsPerPage}
									totalItems={getDataFilterByTitleOrType().length}
									OnChangePage={(newPage, itemsPerPage) => {handlePageChanged(newPage, itemsPerPage)}}
								/>
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

				{!hasText || !searchResults.length ? <RecommendedSearch /> : ""}
			</div>
			<Footer />
		</main>
	);
};

export default Results;
