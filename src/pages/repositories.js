import * as S from './styled';
import ListButton from '../components/listButton';
import useMessages from '../hooks/messages-hooks';
import { useState, useEffect } from 'react';

function Repositories(props) {
  const { messagesState } = useMessages();
  const [ list, setList ] = useState([]);

  useEffect(() => {
    setList(messagesState.repositories);
  }, [messagesState.repositories])

  return (
    <S.List>{ !messagesState.loading && list.length === 0 && 'nenhum registro encontrado.' }
      { list.map(repository => 
      <S.ListItem key={'List_'+repository.date}>
        { repository.name }: { repository.message }

        <ListButton disabled={props.disabled}
                    btnId={'btnDelete'}
                    btnkey={'D'+repository.date}
                    fn={() => props.fnDel(repository.date, repository.name)}>

            {'excluir'}
        </ListButton>

        <ListButton btnId={'btnUpdate'}
                    btnkey={'U'+repository.date}
                    fn={() => props.fnUpdate(repository.date, repository.name, repository.message, true, 'Atualizar')}>

            {'alterar'}
        </ListButton>

      </S.ListItem>)}
    </S.List>
  )
}

export default Repositories;