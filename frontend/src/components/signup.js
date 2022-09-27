import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import AuthService from '../service/AuthService';
import 'react-toastify/dist/ReactToastify.css';

const toastOptionsSignup = {
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

export default class Signup extends Component {

  constructor(props){
    super(props);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail= this.onChangeEmail.bind(this);
    this.onChangePassword= this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
   
    this.state ={
      username:'',
      email:'',
      password:'',
    }
  }

  onChangeUsername(e){
    this.setState({
      username:e.target.value
    });
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
    const Msg = (<div>
      <p>รหัสผ่านต้องมีดังนี้</p>
      <p>ต้องมีอย่างน้อย 6 ตัว</p>
      <p>ต้องมีอักษรตัวใหญ่อย่างน้อง 1 ตัว</p>
      <p>ต้องมีตัวเลขอย่างน้อย 1 ตัว</p>
      <p>ต้องมีอักขระพิเศษอย่างน้อย 1 ตัว</p>
    </div>);

    if((this.state.password.match(/[a-z]+/) && this.state.password.match(/[A-Z]+/) && this.state.password.match(/[0-9]+/) && this.state.password.match(/[$@#&!]+/)) && (this.state.password.length>5)){
      AuthService.register(this.state.username, this.state.email, this.state.password).then(
        (response) =>{
          if(response.data.status){
            window.location.replace('../')
          }else{
            toast.error(response.data.msg ,toastOptionsSignup);
          }
        }).catch(error => {
          toast.error("เกิดข้อผิดพลาดโปรดลองอีกครั้งภายหลัง",toastOptionsSignup);
          //console.log(error);
        });
    }else{
      toast.error(Msg);
    }

    //console.log(this.state)
  }

    render() {
        return (
          <div className="body">
          <ToastContainer position="top-right" autoClose={5000} hideProgressBar newestOnTop={false} closeOnClick={false} rtl={false} pauseOnFocusLoss draggable pauseOnHover/>
            <div className="container auth-inner" style={{width: '1050px'}}>
              <div className="py-5 text-center ">
                <h2>สมัครสมาชิค</h2>
              </div>
              <div className="row">
                <div className="">
                  <div className="row g-3">       
                  <hr className="my-4"/>
                    <div className="col-6">
                      <label htmlFor="username" className="form-label">Username</label>
                      <div className="input-group has-validation">
                        <span className="input-group-text">@</span>
                        <input type="text" className="form-control" id="username" placeholder="Username" value={this.state.username} onChange={this.onChangeUsername} />
                      </div>
                    </div>
                    <div className="col-6">
                      <label htmlFor="email" className="form-label">Email</label>
                      <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" value={this.state.email} onChange={this.onChangeEmail}/>
                    </div>
                    <div className="col-12">
                      <label htmlFor="password" className="form-label">รหัสผ่าน</label>
                      <input type="password" className="form-control" id="password" value={this.state.password} onChange={this.onChangePassword}/>
                    </div>
                  </div>
                  <hr className="my-4"/>
                  <button className="w-100 btn btn-danger btn-lg" type="submit" onClick={this.onSubmit}>สมัครสมาชิค</button>
                  <p className="forgot-password text">มีอีเมล์แล้ว    <Link to={'/'}>เข้าสู่ระบบ ?</Link></p>
                </div>
              </div>
            </div>
        </div>
        )
    }
}