import * as S from './styled';

const Content = ({ label,
                   button,
                   handleSend,
                   messageSend,
                   nameSend,
                   changeName,
                   changeMessage,
                   keypress }) => {
    return (
    <>
    <S.Title id='lblMessage'>{label}</S.Title>
      <S.Content>
        <S.Input className="usuarioInput" id="txtName" placeholder="Nome" value={nameSend} onChange={changeName} />
        <S.Input className="usuarioInput" id="txtMessage" value={messageSend} placeholder="Mensagem" onKeyPress={keypress} onChange={changeMessage} />
        <S.Button type="button" id="btnSend" onClick={handleSend}>{button}</S.Button>
      </S.Content>
    </>
    )
}

export default Content;