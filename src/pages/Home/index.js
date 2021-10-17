import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as S from './styled';
import { useHistory } from 'react-router-dom';

const dynamoURL = 'YOUR_URL_HERE';

function App(props) {

  const history = useHistory();
  const [ update, setUpdate ] = useState(false);
  const [ erro, setErro ] = useState(false);
  const [ nameSend, setName ] = useState('');
  const [ messageSend, setMessage ] = useState('');
  const [ id, setId ] = useState('');

  async function handleSend() {
    loading();

    if (update) {
      await axios.post(`${dynamoURL}/${id}`,
      { name: nameSend, message: messageSend });
    } else {
      await axios.put(dynamoURL,
      { date: Date.now().toString(), name: nameSend, message: messageSend });
    }

    handleRepositories();
  }

  useEffect(() => {
    try {
      setId(props.location.state.date);
      setName(props.location.state.name);
      setMessage(props.location.state.message);
      document.getElementById('btnSend').innerText = 'Atualizar';
      document.getElementById('lblMessage').innerText = 'Atualizar Mensagem';
      //alert(id);
      setUpdate(true);
    } catch {
      document.getElementById('btnSend').innerText = 'Enviar';
      document.getElementById('lblMessage').innerText = 'Inserir Mensagem';
    }
  }, []);
  
  async function handleRepositories() {
    loading();

    await axios.get(dynamoURL)
      .then(response => {
       const repositories = response.data['Items'];
       const repositoriesName = [];
       repositories.map((repository) => { repositoriesName.push(repository); });
       localStorage.setItem('repositoriesName', JSON.stringify(repositoriesName));
       setErro(false);
       history.push('/repositories');
      })
      .catch(err => {
        setErro(true);
      });
  }

  function KeyTest(e) {
    if (e === 'Enter') { handleSend() }
  }

  function loading() {
    erro ? document.getElementById('loading').innerText = '' :
    document.getElementById('loading').innerText = 'carregando...';
  }

  return (
    <S.HomeContainer>
      <S.Title id='lblMessage'>Inserir Mensagem</S.Title>
      <S.Content>
        <S.Input className="usuarioInput" id="txtName" placeholder="Nome" value={nameSend} onChange={e => setName(e.target.value)} />
        <S.Input className="usuarioInput" id="txtMessage" value={messageSend} placeholder="Mensagem" onKeyPress={e => KeyTest(e.code)} onChange={e => setMessage(e.target.value)} />
        <S.Button type="button" id="btnSend" onClick={handleSend}>Enviar</S.Button>
      </S.Content>
      { erro ? <S.ErrorMsg>Ocorreu um erro. Tente novamente.</S.ErrorMsg> : '' }
      <S.ErrorMsg id="loading" ></S.ErrorMsg>

      <br />
      <S.Content>
        <S.Button type="button" id="btnList" onClick={handleRepositories}>Listar Mensagens</S.Button>
      </S.Content>

    </S.HomeContainer>
  );
}

export default App;