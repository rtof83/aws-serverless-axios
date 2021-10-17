import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  width: 100%;
  max-width: 991px;
  margin: 0 auto;
`

export const Title = styled.h1`
  text-align: center;
  font-size: 2rem;
  font_family: sans-serif;
  color: #333;
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
`

export const LinkHome = styled(Link)`
  display: block;
  width: 4rem;
  text-align: center;
  margin: 2rem auto;
  background-color: #000;
  padding: .5rem 0;
  color: #fff;
  text-decoration: none;
  font-family: sans-serif;
  border-radius: .25rem 0;
`

export const Button = styled.button`
  height: 1.2rem;
  border: 1px solid #000;
  border-radius: .25rem 0;
  float: right;
  vertical-align: middle;
  margin: 0 .3rem 0 0;
`