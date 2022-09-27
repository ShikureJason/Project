import React, { Component } from 'react';
import {Link, Navigate} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthService from '../service/AuthService';

const toastOptionsLogin = {
  containerId: "login_error",
  theme: "colored",
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: true,
  closeOnClick: false,
  pauseOnHover: false,
  draggable: false,
  progress: undefined
}

export default class Signin extends Component {

  constructor(props){
    super(props);
    this.onChangeEmail= this.onChangeEmail.bind(this);
    this.onChangePassword= this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
   
    this.state ={
      email:'',
      password:'',
      islogin: false,
    }
  }

  onChangeEmail(e){
    this.setState({
      email:e.target.value
    })
  }

  onChangePassword(e){
    this.setState({
      password:e.target.value
    })
  }

  onSubmit(e){  
    AuthService.login(this.state.email, this.state.password).then(
      (response) => {
        /*console.log("AuthService.response.data")
        console.log(response.Error)*/
        if(response.data.status){
          this.setState({islogin: true});
        }else{
          toast.error(response.data.msg,toastOptionsLogin)
        }
      }).catch(error => {
        toast.error("เกิดข้อผิดพลาดโปรดลองอีกครั้งภายหลัง",toastOptionsLogin);
        //console.log(error);
      });

    this.setState({
      email:'',
      password:'',
    })
    e.preventDefault();
  }

    render() {
      if (AuthService.getCurrentUser()) {
        return <Navigate to="/index"/>
      }
        return (
        <div className='body'>
          <ToastContainer position="top-right" autoClose={5000} hideProgressBar newestOnTop={false} closeOnClick={false} rtl={false} pauseOnFocusLoss draggable pauseOnHover/>
          <div className="auth-inner" style={{width: '450px'}}>
            <main className="form-signin w-100 m-auto">
              <div className="mb-4 text-center">
                <img src={require('../img/logo.webp')} alt="logo" width="72" height="72"/>
              </div>
                <h1 className="h3 mb-3 fw-normal text-center">เข้าสู่ระบบ</h1>
                <div className="form-floating mb-2">
                  <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" value={this.state.email} onChange={this.onChangeEmail}/>
                  <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating mb-3">
                  <input type="password" className="form-control" id="floatingPassword" placeholder="Password" value={this.state.password} onChange={this.onChangePassword}/>
                  <label htmlFor="floatingPassword">Password</label>
                </div>
                <div className="checkbox mb-3">
                  <label>
                  <input type="checkbox" value="remember-me"/> จดจำฉัน
                  </label>
                </div>
                <button className="w-100 btn btn-lg btn-primary mb-3 text" type="submit"  onClick={this.onSubmit}>เข้าสู่ระบบ</button>
                <p className="text-center">หรือ</p>
                <Link className="btn btn-danger w-100 btn-lg" role="button" data-bs-toggle="button" to={'/sign-up'}>สมัครสมาชิค</Link>
                <p className="forgot-password text">ลืม    <Link to={'/forgot'}>รหัสผ่าน?</Link></p>
            </main>
          </div>
        </div>
        )
    }
}


