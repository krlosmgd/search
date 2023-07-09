import { BsGrid3X3GapFill } from "react-icons/bs";
import "./Header.css";
import Paisaje from "../../../assets/img/paisaje.png";
import { useMediaQuery } from "react-responsive";

const Header = ({ Search, ...props }) => {
	const isMobile = useMediaQuery({ maxWidth: 767 });

	return (
		<header className="header">
			{Search ? (
				<Search {...props} />
			) : (
				<p className="header-text">
					<strong className="header-text--bold">Agile Content</strong> Frontend
					test
				</p>
			)}

			{!isMobile ? (
				<div className="header-detail">
					<BsGrid3X3GapFill className="header-icon"></BsGrid3X3GapFill>
					<img className="header-detail__img" src={Paisaje} alt="" />
				</div>
			) : (
				""
			)}
		</header>
	);
};

export default Header;
