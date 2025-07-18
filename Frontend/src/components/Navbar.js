import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useUser } from '../context/UserContext';

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #1976d2;
  color: #fff;
  padding: 0.7em 1.5em;
  box-shadow: 0 2px 8px rgba(25, 118, 210, 0.08);
  position: sticky;
  top: 0;
  z-index: 10;
`;
const Brand = styled(Link)`
  color: #fff;
  font-weight: bold;
  font-size: 1.35em;
  letter-spacing: 0.5px;
  text-decoration: none;
  padding: 0.2em 0.7em 0.2em 0;
  border-radius: 6px;
  transition: background 0.18s;
  &:hover, &:focus {
    background: rgba(255,255,255,0.08);
    outline: none;
  }
`;
const NavLinks = styled.div`
  display: flex;
  gap: 0.7em;
  align-items: center;
`;
const NavLinkStyled = styled(Link)`
  color: #fff;
  font-weight: 500;
  font-size: 1em;
  text-decoration: none;
  padding: 0.35em 1em;
  border-radius: 8px;
  transition: background 0.18s, color 0.18s;
  &:hover, &:focus {
    background: #e3f2fd;
    color: #1976d2;
    outline: none;
  }
`;
const UserName = styled.span`
  font-weight: bold;
  margin-right: 0.7em;
`;
const NavButton = styled.button`
  background: #fff;
  color: #1976d2;
  border: none;
  border-radius: 8px;
  padding: 0.4em 1em;
  font-size: 1em;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  margin-left: 0.2em;
  &:hover, &:focus {
    background: #e3f2fd;
    color: #1565c0;
    outline: none;
  }
`;

function Navbar() {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Nav>
      <Brand to="/listas">Gestor de Tareas</Brand>
      <NavLinks>
        {user ? (
          <>
            <UserName>{user.nombre}</UserName>
            <NavButton onClick={handleLogout}>Salir</NavButton>
          </>
        ) : (
          <>
            <NavLinkStyled to="/login">Ingresar</NavLinkStyled>
            <NavLinkStyled to="/register">Registrarse</NavLinkStyled>
          </>
        )}
      </NavLinks>
    </Nav>
  );
}

export default Navbar;