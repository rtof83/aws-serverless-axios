import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as S from './styled';
import dynamoURL from '../path';
import Repositories from './repositories';
import Button from '../components/button';
import Input from '../components/input';

const Home = () => {
  const [ update, setUpdate ] = useState(false);
  const [ erro, setErro ] = useState(dynamoURL === '' ? '' : 'carregando...');
  const [ nameSend, setName ] = useState('');
  const [ messageSend, setMessage ] = useState('');
  const [ id, setId ] = useState('');
  const [ repositories, setRepositories ] = useState([]);
  const [ txtButton, setTxtButton ] = useState('Enviar');

  async function handleSend() {
    if (nameSend !== '' && messageSend !== '') {
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
    } else {
      alert('Atenção! Os campos Nome e Mensagem devem ser preenchidos!');
    }
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

  const handleUpdate = (id, name, message, update, button) => {
    setId(id);
    setName(name);
    setMessage(message);
    setUpdate(update);
    setTxtButton(button);
  }

  const keyPress = (e) => {
    if (e === 'Enter') { handleSend() }
  }

  if (dynamoURL === '') {
    return <S.URL id='lblMessage'>Defina a URL da base de dados</S.URL>  
  } else {
    return (
      <S.HomeContainer>
        <S.Title id='lblMessage'>Messages App</S.Title>
        <S.Content>
          <Input id={'txtName'}
                 placeholder={'Nome'}
                 value={nameSend}
                 keypress={keyPress}
                 change={setName}
          />

          <Input id={'txtMessage'}
                 placeholder={'Mensagem'}
                 value={messageSend}
                 keypress={keyPress}
                 change={setMessage}
          />

          <Button key={'send'}
                  id={'btnSend'}
                  fn={handleSend}>

              {txtButton}
          </Button>

          { update ? <Button key={'cancel'}
                             id={'btnCancel'}
                             fn={() => handleUpdate('', '', '', false, 'Enviar')}>

                          {'Cancelar'}
                      </Button> 
            : null }

        </S.Content>
        {/* erro != '' ? <S.ErrorMsg>Ocorreu um erro. Tente novamente.</S.ErrorMsg> : '' } */}
        <S.ErrorMsg id="loading">{erro}</S.ErrorMsg>

        <br />
        {/* --------------------------------------------------------------------------------------- */}

        <Repositories disabled={update}
                      list={repositories}
                      fnDel={handleDelete}
                      fnUpdate={handleUpdate}
        />
      </S.HomeContainer>
    )
  }
}

export default Home;