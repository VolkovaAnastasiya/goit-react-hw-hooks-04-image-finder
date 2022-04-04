import s from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ nameList, onToggleMenu, modalImageLoad }) => {
  return (
    <li className={s.gallery_item}>
      <img
        onClick={() => modalImageLoad(nameList.largeImageURL)}
        className={s.gallery_item_image}
        src={nameList.webformatURL}
        alt={nameList.type}
      />
    </li>
  );
};

export default ImageGalleryItem;
