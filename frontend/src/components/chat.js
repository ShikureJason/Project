import React, { Component } from 'react';
import NavbarMenu from './navbar.js';
import '../assets/chat.css';

export default class Chat extends Component{
    render(){
        return(
            <div>
                <NavbarMenu/>
                <div className='container-fluid from-inner'>
                </div>
            </div>
        )
    }
}  