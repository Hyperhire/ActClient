import React, { useRef, useState } from 'react';
import ActImageUploadButton from '../atoms/ActImageUploadButton';
import { ReactComponent as PlusIcon } from '../../styles/assets/icons/plus.svg';
const ActUploadLicenseButton = ({ register, id, errors, control, imageFiles, setImageFiles, label }) => {
  const [images, setImages] = useState([]);
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
      <div className="act-upload-license-button-wrapper">
        <div className="act-upload-license-button">
          {images?.length > 0 ? (
            <>
              <div className="button-label">
                <span>{label}</span> 업로드 완료
              </div>
              {images?.map((image, idx) => {
                return (
                  <div className="button-thumbnail" key={idx}>
                    <img src={image.object} alt="logo" />
                    <div
                      className="delete-button"
                      onClick={e => {
                        e.stopPropagation();
                        deleteImage(image.name);
                      }}
                    />
                  </div>
                );
              })}
            </>
          ) : (
            <>
              <div className="button-label">
                <span>{label}</span> 업로드 해주세요
              </div>
              <div className="button-upload" onClick={handleOnClick}>
                <PlusIcon />
              </div>
            </>
          )}
        </div>
      </div>
    </ActImageUploadButton>
  );
};

export default ActUploadLicenseButton;
