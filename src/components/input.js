import * as S from '../pages/styled';

function Input(props) {
    return (  
        <S.Input className="usuarioInput"
                 id={props.id}
                 value={props.value}
                 placeholder={props.placeholder}
                 onKeyPress={e => props.keypress(e.code)}
                 onChange={e => props.change(e.target.value)}
        />
    )
}

export default Input;