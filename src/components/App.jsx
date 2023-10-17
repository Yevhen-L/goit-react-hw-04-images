import React, { useState, useEffect, useRef } from 'react';
import { getImage } from './ServicesApi/Api';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { Button } from './Button/Button';
import { StyledAppContainer } from './App.styled';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalImages, setTotalImages] = useState(0);
  const [modal, setModal] = useState({
    isModalOpen: false,
    modalImageUrl: '',
  });

  const prevSearchQuery = usePrevious(searchQuery);
  const prevPage = usePrevious(page);

  const handleSearch = query => {
    setSearchQuery(query);
    setPage(1);
    setImages([]);
    setTotalImages(0);
  };

  useEffect(() => {
    const fetchData = async () => {
      const fetchAllImages = async () => {
        setIsLoading(true);

        try {
          const data = await getImage(searchQuery, page);
          if (!data.hits.length) return;

          setImages(prevImages => [...prevImages, ...data.hits]);
          setTotalImages(data.totalHits);
        } catch (error) {
          setError(error.message);
        } finally {
          setIsLoading(false);
        }
      };

      if (
        searchQuery &&
        (searchQuery !== prevSearchQuery || page !== prevPage)
      ) {
        await fetchAllImages();
      }
    };

    fetchData();
  }, [searchQuery, prevSearchQuery, page, prevPage]);

  const openModal = imageUrl => {
    setModal({
      isModalOpen: true,
      modalImageUrl: imageUrl,
    });
  };

  const onCloseModal = () => {
    setModal({
      isModalOpen: false,
      modalImageUrl: '',
    });
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <StyledAppContainer>
      <Searchbar onSearch={handleSearch} />
      {images.length > 0 && (
        <ImageGallery images={images} openModal={openModal} />
      )}
      <Modal
        isOpen={modal.isModalOpen}
        imageUrl={modal.modalImageUrl}
        onCloseModal={onCloseModal}
      />
      {images.length !== totalImages && !isLoading && (
        <Button onClick={loadMore} />
      )}
      {isLoading && <Loader />}
      {error && <p>{error}</p>}
    </StyledAppContainer>
  );
};

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
