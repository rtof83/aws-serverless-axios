import * as S from '../pages/styled';

function Button(props) {
    return (
        <S.Button key={props.btnkey}
                  type="button"
                  onClick={props.fn}>
                      
            {props.children}
        </S.Button>
    )
}

export default Button;