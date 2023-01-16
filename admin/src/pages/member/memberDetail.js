import React from 'react';
import {useOutletContext} from "react-router-dom";

const MemberDetail = () => {
  const con = useOutletContext();
  console.log('MemberDetail', con);
  return <div>MemberDetail</div>;
};
export default MemberDetail;
