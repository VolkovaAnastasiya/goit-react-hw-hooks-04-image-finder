import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import s from './Modal.module.css';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ onToggleMenu, modalImage }) {
  useEffect(() => {
    window.addEventListener('keydown', hendleKeyDownEsc);
    return () => {
      window.removeEventListener('keydown', hendleKeyDownEsc);
    };
  }, []);

  const hendleKeyDownEsc = e => {
    if (e.code === 'Escape') {
      onToggleMenu();
    }
  };

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      onToggleMenu();
    }
  };

  return createPortal(
    <div className={s.overlay} onClick={handleBackdropClick}>
      <div className={s.modal}>
        <img className={s.image} src={modalImage} alt="LargePhoto" />
      </div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  onClickModal: PropTypes.func,
};
