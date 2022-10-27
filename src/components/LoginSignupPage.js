import React, {useState} from 'react';
import Signup from "./Signup";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import styled from "styled-components";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const LoginSignupPage = () => {
  
const [click, setClick] = useState(false);
const handleClick = () => setClick(!click);

  return (
    <Card className='card m-auto h-100'>
      <Tabs
        defaultActiveKey="login"
        className="mb-4 d-flex justify-content-center">
          <Tab eventKey="login" title="Login">
            {click ? <ForgotPassword /> : <Login />}
            <span className='d-flex justify-content-center mt-3 mb-0 forgot-password' onClick={handleClick}>{click ? 'Back to Login' : 'Lost password?'}</span>
          </Tab>
          <Tab eventKey="signup" title="Sign up">
            <Signup />
          </Tab>
      </Tabs>
    </Card>
  )
}

const Card = styled.div`
    color: rgb(158, 158, 158);
    background-color: var(--cardBg);
    border-radius: 10px;
    padding: 2rem;
    box-shadow: var(--cardBoxShadow); 
    
    @media screen and (min-width: 767px) {
      width: 300px;
    }

    & .nav-tabs {
        border: 0;
          .nav-link {
          font-size: 16px;
          color: var(--color-gray);
          border: 0;

        &.active {
          color: white;
          background: transparent;
        }

        &:hover,
        &:focus {
          color: white;
        }
      }
    }

    & input, textarea {
      border-radius: 3px;
      border: 0;
      background: #040620;
      color: white;

      &:focus,
      &:valid {
        background: #040620;
        color: white;
      }

      ::placeholder {
        color: var(--color-gray);
      }
    }

    & .forgot-password {
      color: var(--color-gray);

      &:hover {
        cursor: pointer;
        color: white;
      }
    }
  `;

export default LoginSignupPage;
