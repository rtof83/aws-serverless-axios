import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as S from './styled';
import dynamoURL from '../path';

function Home() {

  const [ update, setUpdate ] = useState(false);
  const [ erro, setErro ] = useState('carregando...');
  const [ nameSend, setName ] = useState('');
  const [ messageSend, setMessage ] = useState('');
  const [ id, setId ] = useState('');
  const [ repositories, setRepositories ] = useState([]);

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
    await axios.get(dynamoURL)
      .then(response => {
       setRepositories(response.data['Items']);
      })
      .catch(err => {
        setErro(err);
      });

    document.getElementById('btnSend').innerText = 'Enviar';
    document.getElementById('lblMessage').innerText = 'Messages App';

    setId('');
    setName('');
    setMessage('');
    setErro('');
  }

  async function handleDelete(id) {
    if (window.confirm('Excluir mensagem?')) {
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
    
    document.getElementById('btnSend').innerText = 'Atualizar';
    document.getElementById('lblMessage').innerText = 'Atualizar Mensagem';
  }

  function KeyTest(e) {
    if (e === 'Enter') { handleSend() }
  }

  return (
    <S.HomeContainer>
      <S.Title id='lblMessage'>Messages App</S.Title>
      <S.Content>
        <S.Input className="usuarioInput" id="txtName" placeholder="Nome" value={nameSend} onChange={e => setName(e.target.value)} />
        <S.Input className="usuarioInput" id="txtMessage" value={messageSend} placeholder="Mensagem" onKeyPress={e => KeyTest(e.code)} onChange={e => setMessage(e.target.value)} />
        <S.Button type="button" id="btnSend" onClick={handleSend}>Enviar</S.Button>
      </S.Content>
      {/* erro != '' ? <S.ErrorMsg>Ocorreu um erro. Tente novamente.</S.ErrorMsg> : '' } */}
      <S.ErrorMsg id="loading">{erro}</S.ErrorMsg>

      <br />
      {/* --------------------------------------------------------------------------------------- */}

      <S.List>
        { repositories.map(repository => 
        <S.ListItem>
          { repository.name }: { repository.message }

          <S.ListButton className="btnList" key={repository.date} onClick={() => handleDelete(repository.date)}>
            excluir
          </S.ListButton>

          <S.ListButton key={repository.date} className="btnList" onClick={() => handleUpdate(repository.date, repository.name, repository.message)}>
            alterar
          </S.ListButton>
        </S.ListItem>)}
      </S.List>
    
    </S.HomeContainer>
  );
}

export default Home;