import React, {  useState } from 'react'
import styled from "styled-components";
import { Navbar, Nav, Container, Alert } from 'react-bootstrap'
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from 'react-router-dom'

export default function NavbarMenu() {
    const { currentUser, logout} = useAuth();
    const [error, setError] = useState('');
    const navigate = useNavigate()

    async function handleLogout () {
        setError('')
    
        try {
          await logout()
          navigate('/login-signup')
          
        } catch {
          setError('Failed to log out')
        }
      }

  return (
    <NavbarWrapper className={currentUser ? 'd-block' : 'd-none'}>
    <Navbar variant="dark">
    <Container>
        <Navbar.Brand href="/">Home</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
            <Nav className='d-flex align-items-center'>
                {currentUser ? (
                    <>
                        {error && <Alert variant="danger">{error}</Alert>} 
                        <Navbar.Text className='logout-link' onClick={handleLogout}>Log Out</Navbar.Text>
                    </>
                ) : (<></>)}
            </Nav>
        </Navbar.Collapse>
    </Container>
    </Navbar>
    </NavbarWrapper>
  )
}

const NavbarWrapper = styled.div`
  border-style: solid;
  border-color: rgba(194, 224, 255, 0.08);
  border-width: 0px 0px thin;

  .logout-link {
    color: white;
    
    &:hover {
      cursor: pointer;
      opacity: .8;
    }
  }
`;
