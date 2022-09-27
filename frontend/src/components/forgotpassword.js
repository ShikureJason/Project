import React, { Component } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthService from '../service/AuthService';

export default class ForgotPassword extends Component {

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
    });
  }

  onChangePassword(e){
    this.setState({
      password:e.target.value
    });
  }

  onSubmit(e){  
    AuthService.login(this.state.email, this.state.password).then(
      () => {
        if(AuthService.getCurrentUser()){
          this.setState({islogin: true});
        }else{
          toast.error("อีเมลหรือรหัสผ่านไม่ถูกต้อง",{
            containerId: "login_error",
            theme: "colored",
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined
          });
        }
        
      }).catch(error => {
        console.log(error.response)
      });

    this.setState({
      email:'',
      password:'',
    })
    e.preventDefault();
  }

    render() {
      if (this.state.islogin) {
        return <Navigate to="/index"/>
      }
        return (
        <body>
          <ToastContainer containerId={'login_error'} position="top-right" autoClose={5000} hideProgressBar newestOnTop={false} closeOnClick={false} rtl={false} pauseOnFocusLoss draggable pauseOnHover/>
          <div className="auth-inner">
            <main className="form-signin w-100 m-auto">
              <div className="mb-4 text-center">
                <img src={require('../img/logo.webp')} alt="logo" width="72" height="72"/>
                </div>
                    <h1 className="h3 mb-3 fw-normal text-center">ลืมรหัสผ่าน</h1>
                    <div className="form-floating mb-2">
                      <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" value={this.state.email} onChange={this.onChangeEmail}/>
                      <label htmlFor="floatingInput">Email address</label>
                    </div>
                    <button className="btn btn-danger w-100 btn-lg" type="submit"  onClick={this.onSubmit}>ลืมรหัสผ่าน</button>
                    <p className="text-center">หรือ</p>
                    <Link className="w-100 btn btn-lg btn-primary mb-3 text" role="button" data-bs-toggle="button" to={'/sign-up'}>เข้าสู่ระบบ</Link>
            </main>
          </div>
        </body>
        )
    }
}
