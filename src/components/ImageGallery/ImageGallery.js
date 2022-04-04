import ImageGalleryItem from 'components/ImageGalleryItem';
import s from './ImageGallery.module.css';

const ImageGallery = ({ arrayQueryList, onToggleMenu, modalImageLoad }) => {
  return (
    <ul className={s.gallery}>
      {arrayQueryList.map((list, index) => (
        <ImageGalleryItem
          key={list.id + index}
          nameList={list}
          onToggleMenu={onToggleMenu}
          modalImageLoad={modalImageLoad}
        />
      ))}
    </ul>
  );
};

export default ImageGallery;
