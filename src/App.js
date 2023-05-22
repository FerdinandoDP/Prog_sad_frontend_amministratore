import logo from './logo.svg';
import React from 'react';
import './App.css';
import {MyNavBar} from './style_components/MyNavBar.js';
import {Footer} from './style_components/Footer.js';

window.server_url = process.env.REACT_APP_SERVER_URL;

export default class Sito extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <> 
        <MyNavBar />
        <Footer/>
      </>
    );
  }
  
};
