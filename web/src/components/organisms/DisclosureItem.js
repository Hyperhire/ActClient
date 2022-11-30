import React from 'react';

const DisclosureItem = props => {
  const { item } = props;
  const { title, description, date } = item;
  return (
    <div className="disclosure-item-wrapper">
      <div className="disclosure-item-title">{title}</div>
      <div className="disclosure-item-description-wrapper">
        <div className="disclosure-item-description">{description}</div>
        <div className="disclosure-item-date">{date}</div>
      </div>
    </div>
  );
};
export default DisclosureItem;
