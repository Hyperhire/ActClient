import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
const OrganizationCampaign = ({ setOption }) => {
  const navigate = useNavigate();
  const { campaign } = useParams();
  useEffect(() => {
    setOption({ title: '기부 단체', subtitle: '', description: '', back: true, menu: false });
  }, [setOption]);
  return <div>{`OrganizationCampaign ${campaign}`}</div>;
};
