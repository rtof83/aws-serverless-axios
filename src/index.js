import React from 'react';
import ReactDOM from 'react-dom';
import Providers from './providers';
import api from './services/api'
import * as S from './pages/styled';

ReactDOM.render(
  <React.StrictMode>
    { api ?
      <Providers />
      :
      <S.URL id='lblMessage'>Defina a URL da base de dados</S.URL>
    }
  </React.StrictMode>,
  document.getElementById("root")
);