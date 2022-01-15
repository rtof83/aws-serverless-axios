import styled from 'styled-components';

export const Title = styled.h1`
  height: 4vh;
  font-size: 1.5rem;
  font-family: sans-serif;
  font-weight: bold;
  text-align: center;
`

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: #D3D3D3;
`

export const Content = styled.div`
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Input = styled.input`
  border: 1px solid #ddd;
  height: 2rem;
  padding: 0 .5rem;
  border-radius: .25rem 0 0 .25rem;
  margin-right: .3rem;

  &:focus,
  &:active {
    outline: none;
    box-shadow: none;
  } 
`

export const Button = styled.button`
  height: 2rem;
  border: 1px solid #000;
  background: #000;
  color: #fff;
  border-radius: .25rem 0;

  &:focus,
  &:active {
    outline: none;
    box-shadow: none;
`

export const ErrorMsg = styled.span`
    display: block;
    font-size: 0.65rem;
    color: red;
    font-weight: 600;
    margin-top: 1rem;
`

export const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  font-family: sans-serif;
`

export const ListItem = styled.li`
  margin: .5rem 0;
  background: #000;
  color: #fff;
  padding: .5rem;
  width: 50rem;
`

export const ListButton = styled.button`
  height: 1.2rem;
  border: 1px solid #000;
  border-radius: .25rem 0;
  float: right;
  vertical-align: middle;
  margin: 0 .3rem 0 0;
`
