import React from 'react';
import ReactDOM from 'react-dom';
import { RecoilRoot } from 'recoil';
import { Container } from '@mui/material';
import App from './App';
import Faq from './pages/faq';

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <Container maxWidth="sm" style={{ padding: 0 }}>
        <App />
      </Container>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root'),
);
