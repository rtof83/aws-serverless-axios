import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as S from './styled';
import dynamoURL from '../path';
import Repositories from './repositories';
import Content from './content';

const Home = () => {
  const [ update, setUpdate ] = useState(false);
  const [ erro, setErro ] = useState(dynamoURL === '' ? '' : 'carregando...');
  const [ nameSend, setName ] = useState('');
  const [ messageSend, setMessage ] = useState('');
  const [ id, setId ] = useState('');
  const [ repositories, setRepositories ] = useState([]);
  const [ txtButton, setTxtButton ] = useState('Enviar');
  const [ txtLabel, setTxtLabel ] = useState('Messages App');

  async function handleSend() {
    setErro('carregando...');

    if (update) {
      await axios.post(`${dynamoURL}/${id}`,
      { name: nameSend, message: messageSend });
      setUpdate(false);
    } else {
      await axios.put(dynamoURL,
      { date: Date.now().toString(), name: nameSend, message: messageSend });
    }

    handleRepositories();
  }

  useEffect(() => {
    handleRepositories();
  }, []);
  
  async function handleRepositories() {
    if (dynamoURL !== '') {
      await axios.get(dynamoURL)
        .then(response => {
        setRepositories(response.data['Items']);
        })
        .catch(err => {
          setErro(err);
        });

      
      setTxtButton('Enviar');
      setTxtLabel('Messages App');

      setId('');
      setName('');
      setMessage('');
      setErro('');
    }
  }

  async function handleDelete(id, name) {
    if (window.confirm(`Excluir mensagem de ${name}?`)) {
      setErro('carregando...');
      await axios.delete(`${dynamoURL}/${id}`);
      handleRepositories();
    }
  }

  async function handleUpdate(id, name, message) {
    setId(id);
    setName(name);
    setMessage(message);
    setUpdate(true);
    
    setTxtButton('Atualizar');
    setTxtLabel('Atualizar Mensagem');
  }

  const KeyTest = (e) => {
    if (e === 'Enter') { handleSend() }
  }

  return (
    <S.HomeContainer>
      {dynamoURL === '' ? <S.Title id='lblMessage'>Defina a URL da base de dados</S.Title> :
      <Content label={txtLabel}
               button={txtButton}
               handleSend={handleSend}
               messageSend={messageSend}
               nameSend={nameSend}
               changeName={e => setName(e.target.value)}
               changeMessage={e => setMessage(e.target.value)}
               keypress={e => KeyTest(e.code)} />}
      
      {/* erro != '' ? <S.ErrorMsg>Ocorreu um erro. Tente novamente.</S.ErrorMsg> : '' } */}
      <S.ErrorMsg id="loading">{erro}</S.ErrorMsg>

      <br />
      {/* --------------------------------------------------------------------------------------- */}

      <Repositories list={repositories} fnDel={handleDelete} fnUpdate={handleUpdate} />
    </S.HomeContainer>
  );
}

export default Home;