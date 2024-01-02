import React, { useEffect } from 'react';
import css from './Modal.module.css'

export const Modal = ({modalImg, handleCloseLargeImg, isOpenModal}) => {

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      handleCloseLargeImg();
    }
  };

  useEffect(() => {
    if (isOpenModal) {
      window.addEventListener("keydown", handleKeyPress)
    }
    return () => {
      window.removeEventListener("keydown", handleKeyPress)
    };
  }, []);

  const handleKeyPress = (event) => {
    if (event.code === 'Escape') {
      handleCloseLargeImg();
    }
  };

  return (
      <div className={css.overlay} onClick={handleOverlayClick}>
          <div className={css.modal}>
            <img src={modalImg} alt='modal' />
          </div>
      </div>
  );
};


