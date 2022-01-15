import * as S from './styled';
import Button from '../components/button';

const Repositories = ({ list, fnDel, fnUpdate }) => {
    return (
    <S.List>
        { list.map(repository => 
        <S.ListItem>
          { repository.name }: { repository.message }

          <Button key={'D'+repository.date} fn={() => fnDel(repository.date, repository.name)} children={'excluir'} />
          <Button key={'U'+repository.date} fn={() => fnUpdate(repository.date, repository.name, repository.message)} children={'alterar'} />

        </S.ListItem>)}
      </S.List>
    )
}

export default Repositories;