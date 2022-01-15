import * as S from '../pages/styled';

const Button = ({ key, fn, children }) => {
    return (
        <S.ListButton key={key} className="btnList" onClick={fn}>
            {children}
        </S.ListButton>
    )
}

export default Button;