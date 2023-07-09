import './ItemCard.css';

const ItemCard = ({detail}) => {
  return (
    <figure className="item-card">
      <img className="item-card__image" src={detail.image} alt={detail.title}/>
      <span className="item-card__url">{detail.url}</span>
      <span className="item-card__title">{detail.title}</span>
      <span className="item-card__description">{detail.description}</span>
    </figure>
  )
}

export default ItemCard;