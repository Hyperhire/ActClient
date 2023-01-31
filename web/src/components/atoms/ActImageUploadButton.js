import React, { useEffect } from 'react';

import { Controller } from 'react-hook-form';

const imageTypeRegex = /image\/(png|jpg|jpeg)/gm;

const UPLOAD_LIMIT = 3;

const ActImageUploadButton = ({ children, register, id, control, inputRef, imageFiles, setImageFiles, setImages, multiple = false }) => {
  const { ref, ...rest } = register;

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

  const changeHandler = (e, onChange) => {
    const { files } = e.target;
    const uploadedImageFiles = [...imageFiles];
    if (uploadedImageFiles.length >= UPLOAD_LIMIT) {
      alert(`이미지는 ${UPLOAD_LIMIT}개 까지만 업로드 가능합니다`);
      return;
    }
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

  return (
    <div>
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
            }}
            accept="image/png, image/jpg, image/jpeg"
            multiple={multiple}
          />
        )}
      />
      {children}
    </div>
  );
};

export default ActImageUploadButton;
