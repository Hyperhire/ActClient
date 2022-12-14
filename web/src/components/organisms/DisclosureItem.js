import React from 'react';
import dayjs from 'dayjs';

const DisclosureItem = props => {
  const { item, clickHandler } = props;
  const { title, description, updatedAt } = item;
  return (
    <div className="disclosure-item-wrapper link" onClick={() => clickHandler(item)}>
      <div className="disclosure-item-title">{title}</div>
      <div className="disclosure-item-description-wrapper">
        <div className="disclosure-item-description">{description}</div>
        <div className="disclosure-item-date">{dayjs(updatedAt).format('YYYY.MM.DD')}</div>
      </div>
    </div>
  );
};
export default DisclosureItem;
