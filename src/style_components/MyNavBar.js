import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import { Button, Stack, Col} from 'react-bootstrap';
import {BrowserRouter,Switch,Route,Link, Routes} from "react-router-dom";
import Container from 'react-bootstrap/Container';

import Home_Amm from '../pages/Home_Amm.js';
import Utenti_page from '../pages/Utenti_page.js';
import Utente_page from '../pages/Utente_page.js'
import './MyNavBar.css';
import history_b from '../history.js';



export class MyNavBar extends React.Component{
    constructor(props){
        super(props);  
    }

    render(){
        return( 
            <BrowserRouter history={history_b}>
                <div className='cont_img'> 
                <Navbar expand="lg" >
                    <Container fluid>
                        <Navbar.Brand>Coworking</Navbar.Brand>
                        <Navbar.Toggle aria-controls="navbarScroll" />
                        <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            navbarScroll
                        >
                            <Nav.Link as={Link} to='/'>Sale & Postazioni</Nav.Link>
                            <Nav.Link as={Link} to='/Utenti'>Utenti</Nav.Link>
                        </Nav>
                        <Col md={1}>
                        
                        </Col>
                        <Col md={1}>
                        
                        </Col>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                </div>
                <div>
                <Routes >
                    <Route exact path='/' element={<Home_Amm/>}>
                        
                    </Route>
                    <Route exact path='/Utenti' element={<Utenti_page/>}>
                        
                    </Route>
                    <Route path='/Utente' element={<Utente_page/>}>
                    </Route>
                </Routes>
                </div>
            </BrowserRouter>
        );
    }
}