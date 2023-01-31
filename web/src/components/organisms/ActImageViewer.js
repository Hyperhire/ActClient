import React, { useEffect, useRef, useState } from 'react';
import ActImageUploadButton from '../atoms/ActImageUploadButton';
import { ReactComponent as DeleteIcon } from 'styles/assets/icons/del/oval.svg';
import { ReactComponent as GalleryIcon } from 'styles/assets/icons/gallery.svg';
import { ReactComponent as GallerySmallIcon } from 'styles/assets/icons/gallery-sm.svg';
import { ReactComponent as PlusIcon } from 'styles/assets/icons/plus.svg';

const ActImageViewer = ({ register, id, errors, control, imageFiles, setImageFiles }) => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(undefined);

  const inputRef = useRef(null);

  useEffect(() => {
    if (images.length > 0) {
      setSelectedImage(images[0]);
    }
  }, [images]);
  const handleOnClick = e => {
    e.preventDefault();
    inputRef.current?.click();
  };
  const deleteImage = targetImage => {
    const tmpArr = [...imageFiles];
    tmpArr.splice(
      tmpArr.findIndex(image => image.name === targetImage),
      1,
    );
    setImageFiles(tmpArr);
    setSelectedImage(images.length > 1 ? images[1] : undefined);
  };
  return (
    <ActImageUploadButton
      register={register}
      id={id}
      errors={errors}
      control={control}
      inputRef={inputRef}
      imageFiles={imageFiles}
      setImageFiles={setImageFiles}
      images={images}
      setImages={setImages}
      multiple={true}
    >
      <div className="act-image-viewer-wrapper">
        <div className="act-image-viewer-selected-image-wrapper">
          {selectedImage ? (
            <div className="act-image-viewer-selected-image">
              <img src={selectedImage.object} alt="selected-image" />
              <div
                className="act-image-viewer-close-button link"
                onClick={e => {
                  e.stopPropagation();
                  deleteImage(selectedImage.name);
                }}
              >
                <DeleteIcon />
              </div>
            </div>
          ) : (
            <GalleryIcon />
          )}
        </div>
        <div className="act-image-viewer-thumbnail-wrapper">
          <div className="act-image-viewer-thumbnail">
            {images.length > 0 ? (
              <div className="link" onClick={() => setSelectedImage(images[0])}>
                <img src={images[0].object} alt="thumbnail-1" />
              </div>
            ) : (
              <GallerySmallIcon />
            )}
          </div>
          <div className="act-image-viewer-thumbnail">
            {images.length > 1 ? (
              <div className="link" onClick={() => setSelectedImage(images[1])}>
                <img src={images[1].object} alt="thumbnail-1" />
              </div>
            ) : (
              <GallerySmallIcon />
            )}
          </div>
          <div className="act-image-viewer-thumbnail">
            {images.length > 2 ? (
              <div className="link" onClick={() => setSelectedImage(images[2])}>
                <img src={images[2].object} alt="thumbnail-1" />
              </div>
            ) : (
              <GallerySmallIcon />
            )}
          </div>
          <div className="height-40 border-radius-4 align-center justify-center flex-1 background-black link" onClick={handleOnClick}>
            <PlusIcon />
          </div>
        </div>
      </div>
    </ActImageUploadButton>
  );
};

export default ActImageViewer;
