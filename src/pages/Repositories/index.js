import React from 'react';
import * as S from './styled';
import axios from 'axios';

const dynamoURL = 'YOUR_URL_HERE';

export default class Repositories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      message: null,
      repositories: JSON.parse(localStorage.getItem('repositoriesName'))
    };
  }

  async handleDelete(id) {
    await axios.delete(`${dynamoURL}/${id}`)
    this.props.history.push('/')
  }

  handleUpdate(date, name, message) {
    this.props.history.push({
      pathname: `/`,
      state: { date: date,
               name: name,
               message: message },
    })
  }

  render() {
    return (
      <S.Container>
       <S.Title>Mensagens</S.Title>
        <S.List>
          { this.state.repositories.map(repository => 
           <S.ListItem index={1}>
             { repository.name }: { repository.message }
             <S.Button key={repository.date} onClick={() => this.handleDelete(repository.date)}>
               excluir
             </S.Button>

              <S.Button key={repository.date} onClick={() => this.handleUpdate(repository.date, repository.name, repository.message)}>
               alterar
             </S.Button>
            </S.ListItem>
          )}
      </S.List>
      <S.LinkHome to='/'>Voltar</S.LinkHome>
    </S.Container>
    )
  }
}
