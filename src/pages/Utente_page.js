import React, {useState} from 'react';
import history_b from '../history.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Utenti.css';

import { Alert, Row , Col, Form, Button, Container, ListGroup, ListGroupItem, Stack, Modal,InputGroup, Card, Spinner} from 'react-bootstrap';
export default class Utente_page extends React.Component{
    constructor(props){
        super(props);
        this.state={
            utente: {},
            prenotazioni: [],
            initialized: false,
            modifying: false,
            user_id_m: "",
            nome_m: "",
            cognome_m: "",
            email_m: "",
            passw_m: "",
            indirizzo_m: "",
            show_al_success: false,
            show_al_err: false
        };
        this.init = this.init.bind(this);
        this.add_card = this.add_card.bind(this);
        this.show_abbonamenti = this.show_abbonamenti.bind(this);
        this.Modify_User = this.Modify_User.bind(this);
        this.End_Modify = this.End_Modify.bind(this);
        this.Save_Modify = this.Save_Modify.bind(this);
        this.spinner_show = this.spinner_show.bind(this);
    };

    init(){
        var path= window.location.href;
        var array= path.split('/');
        var query = array[4];
        var id_arr = query.split('?id=');
        var id_u = id_arr[1];
        var arr=[];
        var arr2=[];
        console.log('ecco:'+id_u);
        fetch(window.server_url+'utenti/'+id_u)
        .then(res => res.json())
        .then(res => this.setState({utente: res}))
        .then(()=> fetch(window.server_url+'prenotazioni/?Utente='+id_u))
        .then(res2 => res2.json())
        .then(res2 => this.setState({prenotazioni: res2}))
        .then(()=> fetch(window.server_url+'postazioni'))
        .then(res3 => res3.json())
        .then(res3 => {
            arr.push(res3)
        })
        .then(()=>console.log('num post:'+arr.length))
        .then(()=>fetch(window.server_url+'sale'))
        .then(res4 => res4.json())
        .then(res4 => {
            arr.push(res4);
            
        })
        .then(()=> {
            console.log(arr)
            if(this.state.initialized === false){
                var arr3 = [];
                console.log('array_pren:'+this.state.prenotazioni.length)
                for(let i=0;i< this.state.prenotazioni.length;i++){
                    console.log('aglia')
                    console.log(arr.length)
                    if(this.state.prenotazioni[i].Posto == null){
                        console.log('num sale:'+arr[1].length)
                        for(let j=0;j<arr[1].length;j++){
                            if(arr[1][j]._id === this.state.prenotazioni[i].Sala){
                                console.log(arr[1][j].id);
                                var elem = this.state.prenotazioni[i];
                                elem.Posto = arr[1][j].id;
                                arr3.push(elem);
                                console.log('elem:'+elem)
                            }
                        }
                    }else{
                        for(let j=0;j<arr[0].length;j++){
                            if(arr[0][j]._id === this.state.prenotazioni[i].Posto){
                                console.log(arr[0][j].id);
                                var elem = this.state.prenotazioni[i];
                                elem.Posto = arr[0][j].id;
                                arr3.push(elem);
                                console.log('elem:'+elem)
                            }
                        }
                    }
                }
                console.log('ppppp'+arr3);
                this.setState({prenotazioni: arr3});
                this.setState({initialized: true});
            }
        }
        );
    };

    componentDidMount(){
        this.init();
    };

    add_card(prenotazione){
        console.log(prenotazione)
        return(
            <Col key={prenotazione._id}>
            <Card border="dark" style={{ width: '16rem' }} className='my-2 mx-2'>
                <Card.Header>Ticket: {prenotazione.id}</Card.Header>
                <Card.Body>
                <Card.Title>{prenotazione.tipologia}</Card.Title>
                <Card.Text>
                    <h6>Posto/Sala:</h6> {prenotazione.Posto}
                    <h6>Data Inizio:</h6> {prenotazione.data_inizio}
                    <h6>Data Fine:</h6> {prenotazione.data_fine}
                    <h6>Data Emissione:</h6> {prenotazione.data_emissione} 
                    <h6>Costo:</h6> {prenotazione.costo+' $'}
                </Card.Text>
                </Card.Body>
            </Card>
            </Col>
        );
    }

    show_abbonamenti(){
        var array=[];
            if(this.state.prenotazioni.length > 0){
                for(let i=0;i<this.state.prenotazioni.length;i++){
                    console.log('a');
                    array.push(this.add_card(this.state.prenotazioni[i]));
                }
            }else{
                console.log(this.state.prenotazioni)
                array.push(
                    <Card key={'aa'} border="dark" style={{ width: '16rem' }} className='mx-2 my-2'>
                    <Card.Header>Ticket: null</Card.Header>
                    <Card.Body>
                    <Card.Title></Card.Title>
                    <Card.Text>
                        Nessun ticket acquistato
                    </Card.Text>
                    </Card.Body>
                    </Card>
                );
            }
            return array;
        
    };

    Modify_User(){
        this.setState({show_al_err: false});
        this.setState({show_al_success:false});
        this.setState({modifying: true});
        this.setState({nome_m: this.state.utente.nome});
        this.setState({cognome_m: this.state.utente.cognome});
        this.setState({email_m: this.state.utente.email});
        this.setState({user_id_m: this.state.utente.user_id});
        this.setState({passw_m: this.state.utente.password});
        this.setState({indirizzo_m: this.state.utente.indirizzo});
    };

    End_Modify(){
        this.setState({modifying: false});
        this.setState({nome_m: this.state.utente.nome});
        this.setState({cognome_m: this.state.utente.cognome});
        this.setState({email_m: this.state.utente.email});
        this.setState({user_id_m: this.state.utente.user_id});
        this.setState({passw_m: this.state.utente.password});
        this.setState({indirizzo_m: this.state.utente.indirizzo});
    };

    Save_Modify(){
        this.setState({show_al_err: false});
        var ut = this.state.utente;
        ut.nome = this.state.nome_m;
        ut.cognome = this.state.cognome_m;
        ut.email= this.state.email_m;
        ut.user_id = this.state.user_id_m;
        ut.password = this.state.passw_m;
        ut.indirizzo = this.state.indirizzo_m;
        if(ut.nome == '' || ut.cognome == '' || ut.email == '' || ut.password == ''){
            console.log('err');
            this.setState({show_al_err: true})
        }else{
            this.setState({utente: ut});
            fetch(window.server_url+'utenti/'+this.state.utente._id,{
                headers: {'Content-Type':'application/json'},
                method: 'PATCH',
                mode: 'cors',
                body: JSON.stringify(ut)});
            this.setState({modifying: false});
            this.setState({show_al_success:true});
        }
    };

    spinner_show(){
        if(this.state.initialized === false){
            return(
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            );
        }
    }

    render(){
        return(
            <Container fluid >
                <Row className='cont_img_Utenti'>
                    <Col xs={12}></Col>
                    <Col className='d-flex justify-content-center'>
                        <h1 id='text_shadow' className='text-white'>UTENTE</h1>
                    </Col>
                    <Col xs={12}></Col>
                </Row>
                <Row className='d-flex my-2'>
                    <Col xs={3}></Col>
                    <Col xs={6}>
                        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZr1dVOdGlC0IFK6IaG9Z3TwBm_MmYVWIyPlui9aPUiT2tPFJfoWfeVRiaD8qNApu1gnM&usqp=CAU'></img>
                        {this.spinner_show()}
                    </Col>
                    <Col xs={3}></Col>
                </Row>
                <Row>
                <Col></Col>
                <Col xs={6}>
                    <Alert  variant='success' hidden={!this.state.show_al_success}>Modifica effettuata con successo!</Alert>
                </Col>
                <Col></Col>
                </Row>
                <Row className='d-flex my-2'>
                    <Col xs={3}>
                    </Col>
                    <Col xs={6} className='my-2'>
                    
                    <Form.Group className="mb-3">
                        <Form.Label>Nome:*</Form.Label>
                        <Form.Control placeholder={this.state.utente.nome} disabled={!this.state.modifying} onChange={(event) => this.setState({nome_m: event.target.value})} value={this.state.nome_m}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Cognome:*</Form.Label>
                        <Form.Control placeholder={this.state.utente.cognome} disabled={!this.state.modifying} onChange={(event) => this.setState({cognome_m: event.target.value})} value={this.state.cognome_m}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>E-Mail:*</Form.Label>
                        <Form.Control placeholder={this.state.utente.email} disabled={!this.state.modifying} onChange={(event) => this.setState({email_m: event.target.value})} value={this.state.email_m}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>User ID:</Form.Label>
                        <Form.Control placeholder={this.state.utente.user_id} disabled={true} onChange={(event) => this.setState({user_id_m: event.target.value})} value={this.state.user_id_m}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Password:*</Form.Label>
                        <Form.Control disabled={true} type='password' value={this.state.passw_m}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Indirizzo:</Form.Label>
                        <Form.Control placeholder={this.state.utente.indirizzo} disabled={!this.state.modifying} onChange={(event) => this.setState({indirizzo_m: event.target.value})} value={this.state.indirizzo_m}/>
                    </Form.Group>
                    </Col>
                    <Col xs={3}></Col>
                </Row>
                <Row>
                    <Col xs={3}></Col>
                    <Col xs={6}>
                        <h4>Tickets:</h4>
                    </Col>
                    <Col xs={3}></Col>
                </Row>
                <Row  className="my-2 mx-5 cards_section d-flex flex-row flex-nowrap" style={{border:'solid 1px black', overflow: "hidden", overflowX: "auto"}}>
                    {this.show_abbonamenti()}
                </Row>
                <Row>
                    <Col></Col>
                    <Col xs={6}>
                        <Alert variant='danger' hidden={!this.state.show_al_err} >Attenzione, i campi contrassegnati devono essere riempiti!</Alert>
                    </Col>
                    <Col></Col>
                </Row>
                <Row className='my-2'>
                    <Col xs={3}></Col>
                    <Col xs={4}>
                        <Button variant="outline-dark" className='mx-2 my-2' hidden={this.state.modifying} onClick={()=>this.Modify_User()}>Modifica</Button>
                        <Button variant="outline-danger" hidden={!this.state.modifying} className='mx-2 my-2' onClick={()=>this.End_Modify()}>Chiudi</Button>
                        <Button variant="outline-dark" hidden={!this.state.modifying} className='mx-2 my-2' onClick={()=>this.Save_Modify()}>Conferma</Button>
                    </Col>
                    <Col xs={3}></Col>
                </Row>
            </Container>
        );
    }
};