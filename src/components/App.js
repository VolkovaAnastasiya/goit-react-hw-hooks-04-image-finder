import { useState, useEffect } from 'react';
import Button from './Button';
import ImageGallery from './ImageGallery';
import fetchSearchMovies from 'services/api';
import { ToastContainer, toast } from 'react-toastify';

import Loader from './Loader';
import 'react-toastify/dist/ReactToastify.css';
import Modal from './Modal';
import Searchbar from './Searchbar';
import s from './App.module.css';

export default function App() {
  const [arrayList, setArrayList] = useState([]);
  const [queryName, setQueryName] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImg, setLargeImg] = useState('');
  const [totalHits, setTotalHits] = useState(0);

  useEffect(() => {
    if (!queryName) {
      return;
    }

    setLoading(true);

    fetchSearchMovies(queryName, page)
      .then(({ hits, totalHits }) => {
        setTotalHits(totalHits);
        setArrayList(arrayList => [...arrayList, ...hits]);
        if (hits.length === 0) {
          toast.warn(`Ничего не найдено`);
        }
        if (page > 1) {
          window.scrollTo({
            top: document.body.clientHeight,
            behavior: 'smooth',
          });
        }
      })
      .catch(error => toast.error('Oops, something went wrong'))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, queryName]);

  const getLargeImageForModal = data => {
    toggleModal();
    setLargeImg(data);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleFormSubmit = data => {
    setQueryName(data);
    setArrayList([]);
    setPage(1);
  };

  const handleClikLoadMore = () => {
    setPage(page + 1);
  };

  const loadMore =
    arrayList.length !== 0 && !loading && arrayList.length !== totalHits;

  return (
    <div className={s.App}>
      <Searchbar onSubmit={handleFormSubmit} />
      {loading && <Loader />}
      {arrayList.length !== 0 && (
        <ImageGallery
          modalImageLoad={getLargeImageForModal}
          arrayQueryList={arrayList}
          onToggleMenu={toggleModal}
        />
      )}

      {loadMore && <Button onClick={handleClikLoadMore} />}
      {showModal && <Modal onToggleMenu={toggleModal} modalImage={largeImg} />}
      <ToastContainer />
    </div>
  );
}
