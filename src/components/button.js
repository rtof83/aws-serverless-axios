import * as S from '../pages/styled';

function Button(props) {
    return (
        <S.Button key={props.key}
                  type="button"
                  onClick={props.fn}>
                      
            {props.children}
        </S.Button>
    )
}

export default Button;