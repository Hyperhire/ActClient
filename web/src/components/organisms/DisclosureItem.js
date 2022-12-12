import React from 'react';

const DisclosureItem = props => {
  const { item, clickHandler } = props;
  const { title, description, date } = item;
  return (
    <div className="disclosure-item-wrapper link" onClick={() => clickHandler(item)}>
      <div className="disclosure-item-title">{title}</div>
      <div className="disclosure-item-description-wrapper">
        <div className="disclosure-item-description">{description}</div>
        <div className="disclosure-item-date">{date}</div>
      </div>
    </div>
  );
};
export default DisclosureItem;
