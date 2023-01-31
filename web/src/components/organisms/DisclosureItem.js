import React from 'react';
import dayjs from 'dayjs';

const DisclosureItem = props => {
  const { item, clickHandler } = props;
  const { title, updatedAt, org } = item;
  return (
    <div className="disclosure-item-wrapper link" onClick={() => clickHandler(item)}>
      <div className="disclosure-item-title">{org.name}</div>
      <div className="disclosure-item-description-wrapper">
        <div className="disclosure-item-description">{title}</div>
        <div className="disclosure-item-date">{dayjs(updatedAt).format('YYYY.MM.DD')}</div>
      </div>
    </div>
  );
};
export default DisclosureItem;
