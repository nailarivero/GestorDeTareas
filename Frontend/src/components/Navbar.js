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
  padding: 0.8em 1.5em;
  font-family: 'Segoe UI', 'Roboto', 'Arial', sans-serif;
  


`;

const NavLinks = styled.div`
  display: flex;
  gap: 1em;
`;

const UserName = styled.span`
  font-weight: bold;
`;

const Title = styled(Link)`
  color: #fff;
  font-weight: 700;
  font-size: 1.25em;
  letter-spacing: 0.5px;
  text-decoration: none;
  font-family: inherit;
  transition: color 0.2s;
  &:hover { color: #bbdefb; }
`;

const NavButton = styled(Link)`
  background: #fff;
  color: #1976d2;
  border: none;
  border-radius: 6px;
  padding: 0.45em 1.1em;
  font-size: 1em;
  font-family: inherit;
  text-decoration: none;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  box-shadow: 0 1px 4px rgba(25, 118, 210, 0.07);
  &:hover {
    background: #e3f2fd;
    color: #0d47a1;
  }
`;

const LogoutButton = styled.button`
  background: #d32f2f;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 0.45em 1.1em;
  font-size: 1em;
  font-family: inherit;
  font-weight: 500;
  cursor: pointer;
  margin-left: 0.7em;
  transition: background 0.2s;
  &:hover { background: #b71c1c; }
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
      <Title to="/listas">Gestor de Tareas</Title>
      <NavLinks>
        {user ? (
          <>
            <UserName>{user.nombre}</UserName>
            <LogoutButton onClick={handleLogout}>Salir</LogoutButton>
          </>
        ) : (
          <>
            <NavButton to="/login">Ingresar</NavButton>
            <NavButton to="/register">Registrarse</NavButton>
          </>
        )}
      </NavLinks>
    </Nav>
  );
}

export default Navbar;
