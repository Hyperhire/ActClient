import React from 'react';
import { ReactComponent as Act } from 'styles/assets/icons/logo/act.svg';

const ActSpinner = ({ size = '1rem', value }) => {
  return (
    <div className="act-spinner-wrapper">
      <div className="act-spinner">
        <Act />
      </div>
    </div>
  );
};

export default ActSpinner;

// <Stack
//   alignItems="center"
//   justifyContent="center"
//   style={{
//     position: "fixed",
//     left: "50%",
//     top: "50%",
//     transform: "translate(-50%, -50%)",
//     zIndex: 30,
//   }}
// >
//   <Stack
//     alignItems="center"
//     justifyContent="center"
//     style={{
//       top: "0",
//       left: "0",
//       width: "100vw",
//       height: "100vh",
//       backgroundColor:
//         "rgba(0, 0, 0, 0.3)",
//     }}
//   >
//     <ZigupSpinner size={"4rem"} />
//   </Stack>
// </Stack>
