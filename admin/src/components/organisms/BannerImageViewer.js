import React, { useRef, useState } from 'react';
import ActImageUploadButton from '../atoms/ActImageUploadButton';
import ActButton from '../atoms/ActButton';
import useModal from '../../hooks/useModal';
import Act from 'styles/assets/icons/logo/act.svg';
const BannerImageViewer = ({ register, id, errors, control, imageFiles, setImageFiles, label }) => {
  const [images, setImages] = useState([]);
  const inputRef = useRef(null);
  const { showModal } = useModal();

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

  const showImageModal = address => {
    showModal({
      open: true,
      message: {
        type: 'image',
        content: (
          <div className="max-width max-height">
            <img className="display-block object-fit-cover max-width auto-height" src={address} />
          </div>
        ),
      },
    });
  };

  return (
    <ActImageUploadButton register={register} id={id} errors={errors} control={control} inputRef={inputRef} imageFiles={imageFiles} setImageFiles={setImageFiles} images={images} setImages={setImages}>
      <div className="act-upload-license-button-wrapper">
        <div className="act-upload-license-button">
          <div className="row gap-8">
            <div className={`${images.length > 0 ? 'link ' : 'disabled'} 'width-240 height-240 bordered'`} onClick={() => showImageModal(images[0].object)}>
              <img className="display-block object-fit-contain width-240 height-240" src={(images.length > 0 && images[0].object) || Act} />
            </div>
            <div className="row gap-8">
              <ActButton label="업로드" handleOnClick={handleOnClick} disabled={images.length > 0} />
              <ActButton label="삭제" handleOnClick={() => deleteImage((images.length > 0 && images[0].name) || '')} />
            </div>
          </div>
        </div>
      </div>
    </ActImageUploadButton>
  );
};

export default BannerImageViewer;
