import React, {useState} from 'react';
import history_b from '../history.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Utenti.css';
import './Home.css';
import { Change_path } from '../usehistory.js';
import PropTypes from "prop-types";
import {Link} from 'react-router-dom';
import { Row , Col, Form, Button, Container, ListGroup, ListGroupItem, Stack, Modal,InputGroup} from 'react-bootstrap';





export default class Utenti_page extends React.Component{
    constructor(props){
        super(props);
        this.state={
            utenti: [],
            prenotazioni: [],
            showmodal: false,
            nome_u_d: "",
            cognome_u_d: "",
            utente_da_eliminare: {}
        };
        this.init = this.init.bind(this);
        this.add_to_list = this.add_to_list.bind(this);
        this.show = this.show.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.show_modal = this.show_modal.bind(this);
        this.close_modal = this.close_modal.bind(this);
        this.delete_user = this.delete_user.bind(this);
    }

    init(){
        fetch(window.server_url+'utenti')
        .then(res => res.json())
        .then(res => this.setState({utenti: res}))
        .then(()=> fetch(window.server_url+'prenotazioni'))
        .then(res2 => res2.json())
        .then(res2 => this.setState({prenotazioni: res2}))
        .then(()=> console.log('aaaa3:'+this.state.prenotazioni))
    };

    componentDidMount(){
        this.init();
    };

    add_to_list(utente){
        var _id = utente._id;
        console.log(_id);
        var path = '/Utente/?id='+_id;
        return(
            <ListGroupItem key={utente._id}>
                <Stack direction='horizontal'>
                      <div className='d-flex justify-content-start'>
                        <img className='image_list' width={160} height={160} src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZr1dVOdGlC0IFK6IaG9Z3TwBm_MmYVWIyPlui9aPUiT2tPFJfoWfeVRiaD8qNApu1gnM&usqp=CAU'} />
                        <div className='mx-2'>
                          <h4>{utente.nome+' '+utente.cognome}</h4>
                          <p><b>Codice fiscale: </b>{utente.codice_fiscale}</p>
                          <p><b>User ID: </b>{utente.user_id}</p>
                        </div>
                      </div>
                      <div className='ms-auto'>
                        <Button variant="dark" className='h-50 mt-2' as={Link} to={path}>Visualizza</Button>
                        <Button variant="outline-danger" className='h-50 mt-2 mx-2' onClick={()=>this.show_modal(utente)}>Elimina</Button>
                      </div>
                </Stack>
            </ListGroupItem>
        );
    };

    show(){
        var array = [];
        for(let i=0;i<this.state.utenti.length;i++){
            array.push(this.add_to_list(this.state.utenti[i]));
        }
        return(array);
    };

    nextPage(path){
        history_b.push(path);
    };

    show_modal(utente){
        console.log(utente.id);
        this.setState({showmodal: true});
        this.setState({nome_u_d: utente.nome});
        this.setState({cognome_u_d: utente.cognome});
        this.setState({utente_da_eliminare: utente});
    }

    close_modal(){
        this.setState({showmodal: false});
    }

    delete_user(utente){
        var id_u = utente._id
        console.log('iddddddddddddddddddddddd:'+id_u)
        if(this.state.prenotazioni.length >0){
            console.log('aa')
            for(let i=0;i<this.state.prenotazioni.length;i++){
                if(this.state.prenotazioni[i].Utente == id_u){
                    console.log('a222a');
                    fetch(window.server_url+'prenotazioni/'+this.state.prenotazioni[i]._id,{
                         method: 'DELETE'
                    })
                }
            }
        }
        fetch(window.server_url+'utenti/'+utente._id,{
               method: 'DELETE'
        })
        .then(()=>{
            var arr=[];
            for(let j=0;j<this.state.utenti.length;j++){
                if(utente._id === this.state.utenti[j]._id){

                }else{
                      arr.push(this.state.utenti[j]);
                }
            }
            this.setState({utenti: arr});
        })
        this.setState({showmodal: false});
    }

    render(){
        return(
            <Container fluid >
                <Row className='cont_img_home' >
                    <Col xs={12}></Col>
                    <Col className='d-flex justify-content-center'>
                        <h1 id='text_shadow' className='text-white'>UTENTI</h1>
                    </Col>
                    <Col xs={12}></Col>
                </Row>
                <Row className='d-flex my-2'>
                        <Modal show={this.state.showmodal} onHide={()=>this.close_modal()}>
                                    <Modal.Header closeButton>
                                    <Modal.Title>ATTENZIONE!</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>Sei sicuro di voler eliminare: {this.state.nome_u_d} {this.state.cognome_u_d} ?</Modal.Body>
                                    <Modal.Footer>
                                    <Button variant="dark" onClick={()=>this.close_modal()}>
                                        Chiudi
                                    </Button>
                                    <Button variant="outline-danger" onClick={()=>this.delete_user(this.state.utente_da_eliminare)}>
                                        Salva Modifiche
                                    </Button>
                                    </Modal.Footer>
                        </Modal>
                    <ListGroup>
                        {this.show()}
                    </ListGroup>
                    {console.log(this.state.utenti)}
                </Row>
            </Container>
        );
    }
};

