import Header from "../../layout/header/Header";
import Footer from "../../layout/footer/Footer";
import Search from "../../search/Search";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import config from '../../../utils/config'; 

const Home = () => {
	const searchValue = useSelector((state) => state.search.searchValue);
	const hasText = useSelector((state) => state.search.hasText);

	const navigate = useNavigate();

	const redirectToResultsPage = (searchValue) => {
		navigate("/results/" + searchValue+"?page="+config.currentPage+"&items="+config.itemsPerPage);
	};

	return (
		<main>
			<Header />
			<section className="home">
				<Search />
				<button
					className={`home__btn ${hasText ? "active" : "inactive"}`}
					onClick={() => {
						return hasText ? redirectToResultsPage(searchValue) : '';
					}}
				>
					Buscar
				</button>
			</section>
			<Footer />
		</main>
	);
};

export default Home;
