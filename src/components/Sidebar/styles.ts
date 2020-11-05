import styled from 'styled-components';

export const Container = styled.div`
  grid-area: SI;
  
  background-color: ${props => props.theme.colors.secondary};
  padding-left: 20px;

  border-right: 1px solid ${props => props.theme.colors.gray};
`;

export const Header = styled.div`
  height: 70px;
  display: flex;
  align-items: center;
`;

export const LogImg = styled.img`
  width: 40px;
  height: 40px;
`;

export const MenuContainer = styled.nav`
  display: flex;
  flex-direction: column;

  margin-top: 50px;
`;

export const MenuItemLink = styled.a`
  color: ${props => props.theme.colors.info};
  text-decoration: none;
  transition: opacity .3s;
  margin: 7px 0;

  display: flex;
  align-items: center;

  &:hover {
    opacity: 0.7;
  }

  svg {
    margin-right: 5px;
    font-size: 18px;
  }
`;

export const Title = styled.h3`
  color: ${props => props.theme.colors.white};
  margin-left: 10px;
`;
