import * as S from '../pages/styled';

function ListButton(props) {
    return (
        <S.ListButton className="btnList"
                      id={props.btnId}
                      key={props.btnkey}
                      onClick={props.fn}
                      disabled={props.disabled}>

            {props.children}
        </S.ListButton>
    )
}

export default ListButton;