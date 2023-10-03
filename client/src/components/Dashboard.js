import React,{useState,useEffect} from 'react'
import Sidebar from './sidepanel/SidePanel'
import SidePanel from './sidepanel/SidePanel'
import TransactionHistory from './TransactionsHistory'
import {Row,Col} from 'react-bootstrap'
// import Menu from '../Menu'
import '../styles/Dashboard.css'
import NavBar from './NavBar'
import AuthenticationService from '../services/AuthenticationService'
import { useNavigate } from 'react-router-dom'


export default function Main() {
  const history = useNavigate();
  useEffect(() => {
    if (!AuthenticationService.isUserLoggedIn()) {
      history('/login');
    }
  }, []);

  return (
    <>
    <NavBar/>
    <div className='dashboard'>
        <SidePanel/>
        <TransactionHistory className='content-wrapper'/>
    </div>
    </>
  )
}

