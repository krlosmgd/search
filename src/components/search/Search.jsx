import { BiSearchAlt2 } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
	setSearchValue,
	setHasText,
	setDetailResult,
	setIsSearching,
} from "../../slices/searchSlice";
import Figure from "../figure/Figure";
import './Search.css';
import { useNavigate } from "react-router-dom";
import Google from "../../assets/img/google.png";

const Search = ({ onKeyUp }) => {
	const searchValue = useSelector((state) => state.search.searchValue);
	const hasText = useSelector((state) => state.search.hasText);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const redirectToHomePage = () => {
		navigate("/");
	};

	return (
		<div className="search">
			<div className="search-figure">
				<Figure onClick={() => {redirectToHomePage()}} url={Google} />
			</div>
			<div className="search-input">
				<BiSearchAlt2 className="search-input__icon" />
				<input
					value={searchValue}
					onChange={(field) => {
						dispatch(setSearchValue(field.target.value));
						dispatch(setHasText(field.target.value.length ? true : false));
						dispatch(setDetailResult({}));
						dispatch(setIsSearching(true));
					}}
					onKeyUp={onKeyUp}
					className="search-input__search"
					type="text"
				/>
				{hasText ? (
					<AiOutlineClose
						onClick={() => {
							dispatch(setSearchValue(""));
							dispatch(setHasText(false));
						}}
						className="search-input__icon--close"
					/>
				) : (
					""
				)}
			</div>
		</div>
	);
};

export default Search;
