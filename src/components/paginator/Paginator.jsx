import { useLocation } from 'react-router-dom';
import './Paginator.css';
import { useEffect, useState } from 'react';

const Paginator = ({ currentPage, totalPages }) => {

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const currentPageParam = Number(queryParams.get('page')) || 1;

  const [page, setPage] = useState(currentPageParam);

  useEffect(() => {
    setPage(currentPageParam);
  }, [currentPageParam]);

  const handlePageChange = (newPage) => {
    const updatedQueryParams = new URLSearchParams(location.search);
    updatedQueryParams.set('page', newPage.toString());
    const newUrl = `${location.pathname}?${updatedQueryParams.toString()}`;
    window.history.pushState({ path: newUrl }, '', newUrl);
    setPage(newPage);
  };


  const renderPaginationButtons = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={i === page ? 'paginator-pages__number active' : 'paginator-pages__number'}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };


  const handlePagePrev = () => {
    handlePageChange(page === 1 ? page : (page - 1))
  }

  const handlePageNext = () => {
    handlePageChange(page === totalPages ? page : (page + 1))
  }
  
  return (
    <div class="paginator">
      <span class="paginator-prev" onClick={() => { handlePagePrev() }}>Anterior</span>
      <div class="paginator-pages">
        {
          renderPaginationButtons()
        }
      </div>
      <span class="paginator-next"  onClick={() => { handlePageNext() }}>Siguiente</span>
    </div>
  )
}

export default Paginator;