import React from 'react';

const OrganizationNewsItem = props => {
  const { item } = props;
  const { image, title, description } = item;
  return (
    <div className="organization-news-item-wrapper">
      <div className="organization-news-item-content-wrapper">
        <div className="organization-news-item-title">{title}</div>
        <div className="organization-news-item-description">{description}</div>
      </div>
      <div className="organization-news-item-image-wrapper">
        <img src={image} alt="" />
      </div>
    </div>
  );
};
export default OrganizationNewsItem;
