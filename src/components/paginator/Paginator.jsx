import { useLocation } from "react-router-dom";
import "./Paginator.css";
import { useEffect, useState } from "react";

const Paginator = ({ currentPage, itemsPerPage, totalItems, OnChangePage: OnPageChange }) => {
	const location = useLocation();

	const totalPages = Math.ceil(totalItems / itemsPerPage);

	const [page, setPage] = useState(currentPage);

	useEffect(() => {
		setPage(currentPage);
	}, [currentPage]);

	const handlePageChange = (newPage) => {
		const updatedQueryParams = new URLSearchParams(location.search);
		updatedQueryParams.set("page", newPage.toString());
		const newUrl = `${location.pathname}?${updatedQueryParams.toString()}`;
		window.history.pushState({ path: newUrl }, "", newUrl);
		setPage(newPage);
		OnPageChange(newPage, itemsPerPage);
	};

	const renderPaginationButtons = () => {
		const buttons = [];
		for (let i = 1; i <= totalPages; i++) {
			buttons.push(
				<button
					key={i}
					onClick={() => handlePageChange(i)}
					className={
						i === parseInt(page)
							? "paginator-pages__number active"
							: "paginator-pages__number"
					}
				>
					{i}
				</button>
			);
		}
		return buttons;
	};

	const handlePagePrev = () => {
		handlePageChange(page - 1);
	};

	const handlePageNext = () => {
		handlePageChange(parseInt(page) + 1);
	};

	return (
		<div className="paginator">
			{parseInt(page) !== 1 ? (
				<span
					className="paginator-prev"
					onClick={() => {
						handlePagePrev();
					}}
				>
					Anterior
				</span>
			) : (
				""
			)}
			<div className="paginator-pages">{renderPaginationButtons()}</div>
			{page >= totalPages ? (
				""
			) : (
				<span
					className="paginator-next"
					onClick={() => {
						handlePageNext();
					}}
				>
					Siguiente
				</span>
			)}
		</div>
	);
};

export default Paginator;
