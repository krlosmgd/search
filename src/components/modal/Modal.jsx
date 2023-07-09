import './Modal.css';

const Modal = ({ItemCard, item, clickOverlay}) => {
  return (
    <div className="modal" onClick={clickOverlay}>
      <div className="modal-container">
        <ItemCard detail={item} />
      </div>
    </div>
  )
}

export default Modal;