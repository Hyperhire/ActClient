import React from 'react';
import { ReactComponent as Give } from 'styles/assets/icons/label/give.svg';
import { useReactQuery } from 'hooks/useReactQuery';
const ActButton = ({ type = 'button', className = 'button-medium', label, handleOnClick, disabled, isDonating = false, queryData }) => {
  // const { refetch } = useReactQuery(queryData.queryKey, queryData.url, queryData.options, {
  //   suspense: true,
  //   onSuccess: data => {
  //     console.log('onSuccess', data);
  //   },
  // });

  const handleClick = e => {
    // if (queryData) refetch();
    if (handleOnClick) handleOnClick(e);
  };

  return (
    <div className="act-button">
      <button type={type} disabled={disabled} onClick={handleClick} className={`${className && className}`}>
        <div>{label}</div>
      </button>
      {isDonating && (
        <div className="act-button-chip">
          <Give />
        </div>
      )}
    </div>
  );
};
export default ActButton;
