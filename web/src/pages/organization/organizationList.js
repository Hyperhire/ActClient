import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OrganizationList = ({ setOption }) => {
  const navigate = useNavigate();
  useEffect(() => {
    setOption({ title: '', subtitle: '기부 단체', description: '', back: true, menu: true });
  }, [setOption]);
  const makeDummy = () => {
    let tmp = [];
    for (let i = 0; i < 20; i++) {
      tmp.push({ id: i, name: `name ${i}` });
    }
    return tmp;
  };

  return (
    <div>
      {makeDummy().map((item, index) => {
        return (
          <div
            className="link"
            onClick={() => {
              console.log(item.id);
              navigate(`${item.id}`);
            }}
            key={index}
          >
            {item.name}
          </div>
        );
      })}
    </div>
  );
};
export default OrganizationList;
