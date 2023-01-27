import React from 'react';
import {useNavigate, useOutletContext, useParams} from "react-router-dom";

const MemberDetail = () => {
  const navigate = useNavigate();
  const {type=undefined, id=undefined} = useParams();
  if (type === undefined || id === undefined) navigate(-1);
  console.log("MemberDetail", type, id)
  return <div>MemberDetail</div>;
};
export default MemberDetail;
