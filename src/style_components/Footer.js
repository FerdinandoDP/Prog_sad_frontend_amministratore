import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col} from 'react-bootstrap';
import { SocialIcon } from 'react-social-icons';
import './Footer.css';
export class Footer extends React.Component{
    constructor(props){
        super(props);  
    }
    render(){
        return(
            <Container fluid className='footer-container'>
                <Row className='mt-3'></Row>
                <Row className='d-flex justify-content-center'>
                    <Col xs={10} md={3} id='col_1' className='col_footer_1 '>
                        <h4 id='title_footer'>About Us:</h4>
                        <p id='text_footer'>
                           Ferdinando Di Pasquale <br></br>
                           Salvatore Gasparo Rippa <br></br>
                           Alessandro De Luca <br></br>
                           Ludovica De Luca <br></br>
                           Domenico Fordellone
                        </p>
                    </Col>
                    <Col xs={10} md={3} className='col_footer_2'>
                    <h4 id='title_footer'>Contattaci via Mail:</h4>
                        <p id='text_footer'>
                           email@gmail.com <br></br>
                           email2@gmail.com<br></br>
                           email3@gmail.com <br></br>
                           email4@gmail.com <br></br>
                           email5@gmail.com
                        </p>
                    </Col>
                    <Col xs={10} md={3} className='col_footer_3'>
                    <h4 id='title_footer'>Seguici sui social:</h4>
                        <div id='section_icon' className='d-flex'>
                            <SocialIcon url="https://twitter.com" className="mx-1 my-1 social_icon"/>
                            <SocialIcon url="https://instagram.com" className="mx-1 my-1"/>
                            <SocialIcon url="https://facebook.com" className="mx-1 my-1"/>
                            <SocialIcon url="https://github.com" className="mx-1 my-1"/>
                            <SocialIcon url="https://linkedin.com" className="mx-1 my-1"/>
                        </div>
                    </Col>
                </Row>
                <Row className='mt-3'></Row>
            </Container>
        );
    };
};