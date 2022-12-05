import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { RecoilRoot } from 'recoil';
import App from './App';
import ActModal from 'components/organisms/ActModal';

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
      <ActModal />
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root'),
);
