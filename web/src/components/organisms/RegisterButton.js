import { MEMBER_TYPE } from '../../constants/constant';

const RegisterButton = ({ type, title, desc, clickHandler }) => {
  return (
    <div className={`row max-width link padding-32 border-radius-8 ${type === MEMBER_TYPE.INDIVIDUAL ? 'background-kakao' : 'background-test1'}`} onClick={() => clickHandler(type)}>
      <div className="col flex-1">
        <div className="neutrals-2">{desc}</div>
        <div className="row align-center gap-8">
          <div className="font-size-18 bold">{title}</div>
          <div className="font-size-18-1.6 bold">></div>
        </div>
      </div>
      <div className="row align-center ">{`${type}아이콘`}</div>
    </div>
  );
};
export default RegisterButton;
