import React, { Component } from 'react';
import {Navigate} from 'react-router-dom';
import {Link} from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import AuthService from '../service/AuthService';


export default class NavbarMenu extends Component{

  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { username: "" }
    }
  }
  
  logOut() {
    AuthService.logout();
  }

  componentDidMount() {

    if (!AuthService.getCurrentUser()){
      this.setState({ redirect: "/sign-in" });
    }
    
  }
    render(){
      if (this.state.redirect) {
        return <Navigate to={this.state.redirect} />
      }
    return(
    <div>
      <Navbar bg="light" expand="lg">
        <div className="container-fluid">
          <Navbar.Brand href="#home">
            <img src={require('../img/logo.webp')} width="30" height="30" className="d-inline-block align-top"/>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto parent">
            <Link className ="nav-link" to={'/index'}>หน้าหลัก</Link>
            <Link className ="nav-link" to={'/profile'}>โปรไฟล์</Link>
            <Link className ="nav-link" to={'/chat'}>พูดคุย</Link>
            <Link className ="nav-link" to={'/sign-in'} onClick={this.logOut}>ออกจากระบบ</Link>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
    </div>
    )
}
}