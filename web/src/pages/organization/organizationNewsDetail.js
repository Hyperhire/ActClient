import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const OrganizationNewsDetail = ({ setOption }) => {
  useEffect(() => {
    setOption({ title: '기부 단체', subtitle: '', description: '', back: true, menu: false });
  }, [setOption]);

  const navigate = useNavigate();
  const { title } = useParams();
  const [data, setData] = useState(undefined);

  return <div>{`detail ${title}`}</div>;
};
export default OrganizationNewsDetail;
