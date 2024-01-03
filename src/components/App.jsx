import React, { useEffect, useState } from 'react';
import { requesImageSearch } from '../services/api.js'
import { Searchbar } from './Searchbar/Searchbar.jsx'
import { Loader } from './Loader/Loader.jsx'
import {ImageGallery} from './ImageGallery/ImageGallery.jsx'
import { Button } from './Button/Button.jsx'
import {Modal} from './Modal/Modal.jsx'

export const  App = () => {
  const [pictures, setPictures] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [amountPic, setAmountPic] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalImg, setModalImg] = useState('');
  const [morePictures, setMorePictures] = useState(false);

   const fetchPostsByQuery = async (page, search) => {
    try {
      setLoading(true);
      const pic = await requesImageSearch(page, search);
      const { total, hits } = pic;
      setPictures(prevPictures => [...prevPictures, ...hits]);
      setAmountPic(total);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (search.match(/[a-zA-Zа-яА-Я0-9]/)) {
      fetchPostsByQuery(page, search);
    }
  }, [search, page]);

  useEffect(() => {
    const check = amountPic >= page * 12;
    setMorePictures(check);
  }, [pictures, amountPic, page]);
  
  const handleSubmit = e => {
    e.preventDefault();
    const searchValue = e.currentTarget.elements.searchInput.value;
    setSearch(searchValue);
    setPictures([]);
    setPage(1);
  };

  const handleNextPage = () => {
    const newPage = page + 1;
    setPage(newPage);
  };

  const handleShowLargeImg = (largeImg) => {
    setIsOpenModal(true);
    setModalImg(largeImg);
  };

  const handleCloseLargeImg = () => {
    setIsOpenModal(false);
  };

  return (
    <div>
      <Searchbar
        handleSubmit={handleSubmit}
      />
      {loading === true && <Loader />}
      <ImageGallery
        handleShowLargeImg={handleShowLargeImg}
        pictures={pictures} />
      {morePictures === true && <Button
        handleNextPage={handleNextPage}
      />}
      {isOpenModal === true && <Modal
        modalImg={modalImg}
        handleCloseLargeImg={handleCloseLargeImg}
        isOpenModal={isOpenModal}
      />}
    </div>
  );
}

