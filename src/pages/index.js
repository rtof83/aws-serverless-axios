import React, { useEffect, useState } from 'react';
import useMessages from '../hooks/messages-hooks';

import * as S from './styled';
import Repositories from './repositories';
import Button from '../components/button';
import Input from '../components/input';

const Home = () => {
  const { messagesState,
          getMessages,
          delMessage,
          postMessage,
          putMessage } = useMessages();

  const [ update, setUpdate ] = useState(false);
  const [ nameSend, setName ] = useState('');
  const [ messageSend, setMessage ] = useState('');
  const [ id, setId ] = useState('');
  const [ txtButton, setTxtButton ] = useState('Enviar');

  async function handleSend() {
    if (nameSend !== '' && messageSend !== '') {
      if (update) {
        postMessage(id, nameSend, messageSend);
        setUpdate(false);
      } else {
        putMessage(Date.now().toString(), nameSend, messageSend);
      }
    } else {
      alert('Atenção! Os campos Nome e Mensagem devem ser preenchidos!');
    }

    handleUpdate('', '', '', false, 'Enviar');
  }

  useEffect(() => {
    getMessages()
  }, [getMessages]);

  async function handleDelete(id, name) {
    if (window.confirm(`Excluir mensagem de ${name}?`)) delMessage(id)
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

        <Button btnkey={'send'}
                id={'btnSend'}
                fn={handleSend}>

            {txtButton}
        </Button>

        { update && <Button btnkey={'cancel'}
                            id={'btnCancel'}
                            fn={() => handleUpdate('', '', '', false, 'Enviar')}>

                        {'Cancelar'}
                    </Button> 
        }

      </S.Content>

      <S.ErrorMsg id="loading">{ messagesState.loading && 'carregando...' }</S.ErrorMsg>

      <br />

      <Repositories disabled={update}
                    fnDel={handleDelete}
                    fnUpdate={handleUpdate}
      />
    </S.HomeContainer>
  )
  }

export default Home;