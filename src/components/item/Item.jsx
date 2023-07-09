import "./Item.css";

const Item = ({ url, title, description, click }) => {
	return (
		<div onClick={click} className="item">
			<span className="item__link">{url}</span>
			<h1 className="item__title">{title}</h1>
			<p className="item__description"> {description}</p>
		</div>
	);
};

export default Item;
