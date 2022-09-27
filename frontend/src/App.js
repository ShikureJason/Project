import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/style.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Signin from './components/signin';
import Signup from './components/signup';
import Index from './components/index';
import Chat from './components/chat';
import ForgotPassword from './components/forgotpassword';
import Profile from './components/profile';


export default class App extends Component{

render() {
  return (
    <Router>
      <>
            <Routes>
              <Route exact path="/" element={<Signin/>} />
              <Route path="/sign-in" element={<Signin/>} />
              <Route path="/sign-up" element={<Signup/>} />
              <Route path="/index" element={<Index/>} />
              <Route path="/chat" element={<Chat/>}/>
              <Route path="/profile" element={<Profile/>}/>
              <Route path="/forgot" element={<ForgotPassword/>} />
            </Routes>
      </>
    </Router>
  )
}
}