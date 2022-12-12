import React from 'react';

const OrganizationNewsItem = props => {
  const { item, clickHandler } = props;
  const { images, title, description } = item;
  return (
    <div className="organization-news-item-wrapper link" onClick={() => clickHandler(item)}>
      <div className="organization-news-item-content-wrapper">
        <div className="organization-news-item-title">{title}</div>
        <div className="organization-news-item-description">{description}</div>
      </div>
      <div className="organization-news-item-image-wrapper">
        <img src={images[0]} alt="" />
      </div>
    </div>
  );
};
export default OrganizationNewsItem;
