import React from 'react';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ id, urlImeg,tag}) => {
    return (
        <li className={css.imageGalleryItem} key={id}>
            <img
                className={css.imageGalleryItemimage}
                src={urlImeg}
                alt={tag}
            />
        </li>
    );
};

export { ImageGalleryItem };