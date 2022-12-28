import React, { useEffect, useRef, useState } from 'react';
import ActImageUploadButton from '../atoms/ActImageUploadButton';
import { ReactComponent as ProfileIcon } from 'styles/assets/icons/profile/black.svg';
import { ReactComponent as DeleteIcon } from 'styles/assets/icons/del/oval.svg';

const ActUploadProfileButton = ({ register, id, errors, control, imageFiles, setImageFiles }) => {
  const [images, setImages] = useState();
  useEffect(() => {
    console.log('images', images);
  }, [images]);

  const inputRef = useRef(null);

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
  };
  return (
    <ActImageUploadButton register={register} id={id} errors={errors} control={control} inputRef={inputRef} imageFiles={imageFiles} setImageFiles={setImageFiles} images={images} setImages={setImages}>
      <div className="act-upload-profile-button-wrapper">
        {images?.length > 0 ? (
          images?.map((image, idx) => {
            return (
              <div key={idx} className="act-upload-profile-icon-profile-wrapper">
                <img src={image.object} alt="profile" />
                <div
                  className="act-upload-profile-icon-close-button link"
                  onClick={e => {
                    e.stopPropagation();
                    deleteImage(image.name);
                  }}
                >
                  <DeleteIcon />
                </div>
              </div>
            );
          })
        ) : (
          <div className="act-upload-profile-icon-profile-wrapper link" onClick={handleOnClick}>
            <ProfileIcon />
          </div>
        )}
      </div>
    </ActImageUploadButton>
  );
};

export default ActUploadProfileButton;
