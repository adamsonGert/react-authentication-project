import NavbarMenu from "./Navbar";
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword"
import UpdateProfile from "./UpdateProfile";
import TodoPage from "./TodoPage";
import { Container } from "react-bootstrap"
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginSignupPage from "./LoginSignupPage";
import GlobalStyle  from '../themes/globalStyle';

function App() {

  return (
    <>
     <Router>
      <AuthProvider>
        <NavbarMenu />
          <Container className='d-flex align-items-center justify-content-center flex-direction flex-sm-column' style={{minHeight: '100vh'}}>
              <Routes>
                <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>}/>
                <Route path="/update-profile" element={<PrivateRoute><UpdateProfile /></PrivateRoute>}/>
                <Route path="/todo-page" element={<PrivateRoute><TodoPage /></PrivateRoute>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/login-signup" element={<LoginSignupPage/>}/>
                <Route path="/forgot-password" element={<ForgotPassword />}/>
              </Routes>
          </Container>
        </AuthProvider>
      </Router>
      <GlobalStyle />
    </>
  ) 
}

export default App;
