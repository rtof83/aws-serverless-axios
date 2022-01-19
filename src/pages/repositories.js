import * as S from './styled';
import ListButton from '../components/listButton';

function Repositories(props) {
  return (
  <S.List>
      { props.list.map(repository => 
      <S.ListItem>
        { repository.name }: { repository.message }

        <ListButton disabled={props.disabled}
                    btnId={'btnDelete'}
                    key={'D'+repository.date}
                    fn={() => props.fnDel(repository.date, repository.name)}>

            {'excluir'}
        </ListButton>

        <ListButton btnId={'btnUpdate'}
                    key={'U'+repository.date}
                    fn={() => props.fnUpdate(repository.date, repository.name, repository.message, true, 'Atualizar')}>

            {'alterar'}
        </ListButton>

      </S.ListItem>)}
    </S.List>
  )
}

export default Repositories;