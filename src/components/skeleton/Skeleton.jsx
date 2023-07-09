import './Skeleton.css';

const Skeleton = () => {
  return (
    <div className="skeleton">
      <div className="skeleton__content">
        <div className="skeleton__line"></div>
        <div className="skeleton__line"></div>
        <div className="skeleton__line"></div>
      </div>
    </div>
  );
};

export default Skeleton;