import React, { useRef, useState, useEffect } from 'react';
import { TextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import { Controller } from 'react-hook-form';
import DuplicateButton from './duplicateButton';
import { ReactComponent as DeleteIcon } from 'styles/assets/icons/del/oval.svg';
import { ReactComponent as PlusIcon } from 'styles/assets/icons/plus.svg';

const imageTypeRegex = /image\/(png|jpg|jpeg)/gm;

const UPLOAD_LIMIT = 1;

const ActImageUploadButton = ({ register, id, control, uploadedImages }) => {
  const { ref, ...rest } = register;
  const [imageFiles, setImageFiles] = useState([]);
  const [images, setImages] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    uploadedImages(images);
    return () => {
      uploadedImages([]);
    };
  }, [images, uploadedImages]);

  useEffect(() => {
    const fileReaders = [];
    let isCancel = false;
    if (imageFiles.length) {
      const promises = imageFiles.map(file => {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReaders.push(fileReader);
          fileReader.onload = e => {
            const { result } = e.target;
            if (result) {
              resolve({ name: file.name, object: result });
            }
          };
          fileReader.onabort = () => {
            reject(new Error('File reading aborted'));
          };
          fileReader.onerror = () => {
            reject(new Error('Failed to read file'));
          };
          fileReader.readAsDataURL(file);
        });
      });
      Promise.all(promises)
        .then(images => {
          if (!isCancel) {
            setImages(images);
          }
        })
        .catch(reason => {
          console.log(reason);
        });
    } else {
      setImages([]);
    }
    return () => {
      isCancel = true;
      fileReaders.forEach(fileReader => {
        if (fileReader.readyState === 1) {
          fileReader.abort();
        }
      });
    };
  }, [imageFiles]);

  const changeHandler = e => {
    const { files } = e.target;
    const uploadedImageFiles = [];
    for (let i = 0; i < files.length; i++) {
      if (i === UPLOAD_LIMIT) {
        alert(`이미지는 ${UPLOAD_LIMIT}개 까지만 업로드 가능합니다`);
        break;
      }
      const file = files[i];
      if (file.type.match(imageTypeRegex)) {
        uploadedImageFiles.push(file);
      } else {
        alert('이미지 파일만 업로드 할 수 있습니다');
      }
    }
    if (uploadedImageFiles.length) {
      setImageFiles(uploadedImageFiles);
    }
  };
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
    <div className="act-image-upload-button-wrapper">
      <div className="act-image-upload-button">
        {images.length > 0 ? (
          <>
            <div className="button-label">
              <span>사업자등록증</span> 업로드 완료
            </div>
            {images.map((image, idx) => {
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
              <span>사업자등록증</span>을 업로드 해주세요
            </div>
            <div className="button-upload" onClick={handleOnClick}>
              <PlusIcon />
            </div>
          </>
        )}
      </div>

      <Controller
        control={control}
        name={id}
        render={({ field: { onChange } }) => (
          <input
            {...rest}
            ref={event => {
              ref(event);
              inputRef.current = event;
            }}
            hidden
            type="file"
            onChange={e => {
              changeHandler(e);
              onChange(e);
            }}
            accept="image/png, image/jpg, image/jpeg"
          />
        )}
      />
    </div>
  );
};

export default ActImageUploadButton;
