import React, {useState} from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';
import { Alert, Row , Col, Form, Button, Container, ListGroup, ListGroupItem, Stack, Modal,InputGroup} from 'react-bootstrap';


const del_pren_sale = (pren, id_sala) =>{
  var z=0;
  while(z<pren.length){
    if(pren[z].Sala == id_sala){
      fetch(process.env.Server_Url+'prenotazioni/'+pren[z]._id,{
        method: 'DELETE'
      }).then(()=>{z = z+1})
      .then(()=>console.log('eliminato'))
    }else{
      z=z+1
    }
  }
};

export default class Home_Amm extends React.Component{
  constructor(props){
    super(props);
    this.state={
        sale: [],
        postazioni:[],
        prenotazioni:[],
        initialized: false,
        show_modal:false,
        show_form_var:true,
        show_modal_delete:false,
        id_form_modal: "",
        disp_form_modal: true,
        capienza_form_modal: 0,
        costo_form_modal: 0,
        extra_form_modal: "",
        show_modal_modify: false,
        id_post_mod: "",
        stat_post_mod: true,
        cost_post_mod: 0,
        id_sale_mod: "",
        original_id_sal: "",
        original_id_post: "",
        stat_sale_mod: true,
        cost_sale_mod: 0,
        cap_sale_mod: 0,
        ex_sale_mod: "",
        element_post_to_modify: {},
        element_sale_to_modify: {},
        show_modal_modify_sale: false,
        show_alert_riemp: false,
        show_alert_id: false,
        show_al_del: false,
        show_modal_add_success: false,
        show_al_del_succ: false,
        show_al_mod_succ: false,
        show_al_mod_err: false
    };
    this.init=this.init.bind(this);
    this.add_to_list = this.add_to_list.bind(this);
    this.show=this.show.bind(this);
    this.Example = this.Example.bind(this);
    this.ShowModalModify = this.ShowModalModify.bind(this);
    this.ShowModalModifySale = this.ShowModalModifySale.bind(this);
    this.CloseModalModify = this.CloseModalModify.bind(this);
    this.CloseModalModifySale = this.CloseModalModifySale.bind(this);
    this.SaveModifyPostazione = this.SaveModifyPostazione.bind(this);
    this.SaveModifySale = this.SaveModifySale.bind(this);
  }
  init(){
    //console.log(process.env.REACT_APP_SERVER_URL);
    console.log(window.server_url);
    fetch(window.server_url+'postazioni')
    .then(res => res.json())
    .then(res => this.setState({postazioni: res}))
    .then(()=> fetch(window.server_url+'sale'))
    .then(res2 => res2.json())
    .then(res2 => this.setState({sale: res2}))
    .then(()=> fetch(window.server_url+'prenotazioni'))
    .then(res3 => res3.json())
    .then(res3 => this.setState({prenotazioni: res3}))
    .then(this.setState({initialized:true}));
  };
  componentDidMount(){
    this.init();
  };

  ShowModalModify(element, index){
    this.setState({show_al_mod_err:false});
    this.setState({show_al_del_succ:false});
    this.setState({show_al_mod_succ:false});
    this.setState({show_modal_add_success: false});
    this.setState({show_modal_modify: true});
    this.setState({element_post_to_modify: element});
    this.setState({id_post_mod: element.id});
    this.setState({original_id_post: index});
    this.setState({cost_post_mod: element.costo});
    this.setState({stat_post_mod: element.stato});
    console.log(element.stato);
  };

  CloseModalModify(){
    this.setState({show_modal_modify: false});
  };

  ShowModalModifySale(element,index){
    this.setState({show_al_mod_succ:false});
    this.setState({show_al_del_succ:false});
    this.setState({show_al_mod_err:false});
    this.setState({show_modal_add_success: false});
    this.setState({show_modal_modify_sale: true});
    this.setState({element_sale_to_modify: element});
    this.setState({original_id_sal: index})
    this.setState({stat_sale_mod: element.stato});
    this.setState({id_sale_mod: element.id});
    this.setState({cost_sale_mod: element.costo});
    this.setState({ex_sale_mod: element.extra});
    this.setState({cap_sale_mod: element.capienza});
  };

  CloseModalModifySale(){
    this.setState({show_modal_modify_sale: false});
    console.log(this.state.show_modal_modify_sale);
  };
  
  SaveModifyPostazione(){
    var check = false;
    var id = this.state.id_post_mod;
    var element = this.state.element_post_to_modify;
    for(let i=0;i<this.state.postazioni.length;i++){
      if(i != this.state.original_id_post){
        if(id == this.state.postazioni[i].id){
          check=true;
        }
      }
    }
    if(check== true){
      console.log('errore modifica post');
      this.setState({show_al_mod_err:true});
    }else{
      element.id=this.state.id_post_mod;
      element.stato = this.state.stat_post_mod;
      element.costo = parseInt(this.state.cost_post_mod);
      this.setState({element_post_to_modify: element});
      fetch(window.server_url+'postazioni/'+this.state.element_post_to_modify._id,{
            headers: {'Content-Type':'application/json'},
            method: 'PATCH',
            mode: 'cors',
            body: JSON.stringify(this.state.element_post_to_modify)});
      this.setState({show_modal_modify: false});
      console.log(this.state.element_post_to_modify.id);
      this.setState({show_al_mod_succ:true});
    }
    
  };
  
  SaveModifySale(){
    var check = false;
    var id = this.state.id_sale_mod;
    console.log(this.state.element_sale_to_modify);
    var element = this.state.element_sale_to_modify;
    for(let i =0;i<this.state.sale.length;i++){
      if(i != this.state.original_id_sal){
        console.log('a')
        if(id == this.state.sale[i].id){
          check = true
          console.log(this.state.original_id_sal)
        }
      }
    }
    if(check == true){
      console.log('errore modifica sale!');
      this.setState({show_al_mod_err:true});
    }else{
      element.id= this.state.id_sale_mod;
      element.stato = this.state.stat_sale_mod;
      element.costo = parseInt(this.state.cost_sale_mod);
      element.capienza = parseInt(this.state.cap_sale_mod);
      element.extra = this.state.ex_sale_mod;
      this.setState({element_sale_to_modify: element});
      fetch(window.server_url+'sale/'+this.state.element_sale_to_modify._id,{
          headers: {'Content-Type':'application/json'},
          method: 'PATCH',
          mode: 'cors',
          body: JSON.stringify(this.state.element_sale_to_modify)});
      this.setState({show_modal_modify_sale: false});
      console.log(this.state.element_sale_to_modify.id);
      this.setState({show_al_mod_succ:true});
    }
    
  };

  add_to_list(element, types, index){
    var stato='';
    if(element.stato){
      stato = 'disponibile';
    }else{
      stato = 'non disponibile';
    }
    if(types === 'postazione'){
      return(
          <ListGroupItem key={element._id}>
              <Stack direction='horizontal'>
                    <div className='d-flex justify-content-start'>
                      <img className='image_list' width={160} height={160} src={'https://mh-1-agenzia-di-stock.panthermedia.net/media/media_detail/0028000000/28532000/~simbolo-dell-icona-della-sedia-da_28532199_detail.jpg'} />
                      <div className='mx-2'>
                        <h4>{element.id}</h4>
                        <p>{types+' '+stato}</p>
                      </div>
                    </div>
                    <div className='ms-auto'>
                      <h5>{element.costo+'$'}</h5>
                      <Button variant="dark" className='h-50 mt-2' onClick={()=>this.ShowModalModify(element,index)}>Modifica</Button>
                    </div>
              </Stack>
          </ListGroupItem>
      );
    }else{
      return(
        <ListGroupItem key={element._id}>
            <Stack direction='horizontal'>
                  <div className='d-flex justify-content-start'>
                    <img className='image_list' width={160} height={160} src={'https://thumbs.dreamstime.com/b/icona-sala-riunioni-illustrazione-semplice-dell-della-158395205.jpg'} />
                    <div className='mx-2'>
                      <h4>{element.id}</h4>
                      <p>{types+' '+stato}</p>
                      <p>{element.stato}</p>
                      <p><b>Capienza:</b> {element.capienza} persone</p>
                      <p><b>Servizi:</b> {element.extra}</p>
                    </div>
                  </div>
                  <div className='ms-auto'>
                    <h5>{element.costo+'$'}</h5>
                    <Button variant="dark" className='h-50 mt-2' onClick={() => this.ShowModalModifySale(element,index)}>Modifica</Button>
                  </div>
            </Stack>
        </ListGroupItem>
      );
    }
    
  };
  show(){
    console.log(this.state.postazioni[0]);
    if(this.state.initialized === true){
      console.log(this.state.postazioni[1]);
      var array=[];
      for(let i=0;i<this.state.postazioni.length;i++){
        array.push(this.add_to_list(this.state.postazioni[i],'postazione',i));
      }
      for(let j=0;j<this.state.sale.length;j++){
        array.push(this.add_to_list(this.state.sale[j],'sala',j));
      }
      return array;
    }
  };

  Example() {
    const add_Element = () => {
      var id = this.state.id_form_modal;
      var disp = this.state.disp_form_modal;
      var cap = this.state.capienza_form_modal;
      var costo = this.state.costo_form_modal;
      var extra = this.state.extra_form_modal;
      var check = false;
      console.log(disp);
      this.setState({show_alert_riemp: false});
      this.setState({show_alert_id: false});
      if(id == '' || costo == ''){
        console.log('errore riempimento');
        this.setState({show_alert_riemp: true});
      }else{
        if(this.state.show_form_var){
          for(let i=0;i<this.state.sale.length;i++){
            if(id == this.state.sale[i].id){
              check = true;
            }
          }
          if(check == true){
            console.log('errore id sala!');
            this.setState({show_alert_id: true});
          }else{
            this.setState({show_modal_add_success: true});
            this.setState({id_form_modal:""});
            this.setState({disp_form_modal:true});
            this.setState({capienza_form_modal:0});
            this.setState({costo_form_modal:0});
            this.setState({extra_form_modal:""});
            this.setState({show_modal: false});
            var new_sala={}
            var JsonSala = {
              id: id,
              stato: disp,
              costo: parseInt(costo,10),
              capienza: parseInt(cap,10),
              extra: extra
            }
            console.log(JsonSala);
            fetch(window.server_url+'sale',{
              headers: {'Content-Type':'application/json'},
              method: 'POST',
              mode: 'cors',
              body: JSON.stringify(JsonSala)
            })
            .then(res=>res.json())
            .then(res=>{
              new_sala ={
                _id: res._id,
                id: res.id,
                stato: res.stato,
                costo: res.costo,
                capienza: res.capienza,
                extra: res.extra
              }
            })
            .then(()=>console.log('new_sala: '+new_sala))
            .then(()=>{
              var array = this.state.sale;
              array.push(new_sala);
              this.setState({sale: array})
            })
          }
        }else{
          for(let i=0;i<this.state.postazioni.length;i++){
            if(id == this.state.postazioni[i].id){
              check = true;
            }
          }
          if(check == true){
            console.log('errore id sala!');
            this.setState({show_alert_id: true});
          }else{
            this.setState({show_modal_add_success: true});
            this.setState({id_form_modal:""});
            this.setState({disp_form_modal:true});
            this.setState({capienza_form_modal:0});
            this.setState({costo_form_modal:0});
            this.setState({extra_form_modal:""});
            this.setState({show_modal: false});
            var new_postazione = {}
            var JsonPostazione = {
              id: id,
              stato: disp,
              costo: parseInt(costo,10)
            }
            console.log(JsonPostazione);
            fetch(window.server_url+'postazioni',{
              headers: {'Content-Type':'application/json'},
              method: 'POST',
              mode: 'cors',
              body: JSON.stringify(JsonPostazione)
            })
            .then(res=>res.json())
            .then(res => {
              new_postazione = {
                _id: res._id,
                id: res.id,
                stato: res.stato,
                costo: res.costo
              }
            })
            .then(() => {
              var array = this.state.postazioni;
              array.push(new_postazione);
              this.setState({postazioni: array});
            })
          }
        }
      }
    }; 
    const delete_element = () => {
      var id = this.state.id_form_modal;
      console.log(id);
      var array = [];
      var check = false;
      for(let i=0; i<this.state.postazioni.length;i++){ 
        if(id === this.state.postazioni[i].id){
          console.log(this.state.postazioni[i]._id)
          check= true;
          var  k=0;
          while(k<this.state.prenotazioni.length){
              if(this.state.prenotazioni[k].Posto == this.state.postazioni[i]._id){
                fetch(window.server_url+'prenotazioni/'+this.state.prenotazioni[k]._id,{
                  method: 'DELETE'
                })
                k=k+1
              }else{
                k=k+1
              }
          }
          fetch(window.server_url+'postazioni/'+this.state.postazioni[i]._id,{
          method: 'DELETE'
          })
        }else{
          array.push(this.state.postazioni[i]);
        }
      }
      this.setState({postazioni: array});
      var array2 = [];
      for(let j=0; j<this.state.sale.length;j++){
        if(id === this.state.sale[j].id){
          check=true;
          var z=0;
          while(z<this.state.prenotazioni.length){
            if(this.state.prenotazioni[z].Sala == this.state.sale[j]._id){
              console.log('pren:'+this.state.prenotazioni[z]._id)
              console.log(z)
              fetch(window.server_url+'prenotazioni/'+this.state.prenotazioni[z]._id,{
                method: 'DELETE'
              })
              z = z+1
            }else{
              z=z+1
            }
          }
          fetch(window.server_url+'sale/'+this.state.sale[j]._id,{
            method: 'DELETE'
          })
        }else{
          array2.push(this.state.sale[j]);
        }
      }
      this.setState({sale: array2});
      if(check==false){
        console.log('non esist');
        this.setState({show_al_del:true});
      }else{
        this.setState({show_modal_delete: false});
        this.setState({show_al_del:false});
        this.setState({show_al_del_succ:true});
      }
    };
    const handleClose = () => {this.setState({show_modal:false})};
    const handleShow = () => {this.setState({show_modal:true}); this.setState({show_alert_riemp: false});this.setState({show_alert_id: false});this.setState({show_modal_add_success: false});this.setState({show_al_del_succ:false});this.setState({show_al_mod_succ:false});};
    const hide_forms = () => { this.setState({show_form_var:false}) };
    const show_forms = () => { this.setState({show_form_var:true})};
    const showDelModal = () => { this.setState({show_modal_delete:true}); this.setState({show_al_del:false}); this.setState({show_modal_add_success: false});this.setState({show_al_del_succ:false});this.setState({show_al_mod_succ:false});};
    const closeDelModal = () => { this.setState({show_modal_delete:false})};
  
    return (
      <>
        <Col>
            <Button variant="outline-dark" className='me-2 mt-1' onClick={handleShow}>Aggiungi</Button>
            <Button variant="outline-dark" className='mt-1' onClick={showDelModal}>Elimina</Button>
        </Col>
        <Col></Col>
        <Col></Col>
  
        <Modal
          show={this.state.show_modal}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Aggiungi</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Button variant="dark" className='me-2 mx-2' onClick={show_forms} disabled={this.state.show_form_var}>Sala</Button>
            <Button variant="dark" className='mx-2' onClick={hide_forms} disabled={!this.state.show_form_var}>Postazione</Button>
            <br/>
            <br/>
            <h6>Id:*</h6>
            <Form.Control type="text" placeholder="Id" onChange={(event) => this.setState({id_form_modal: event.target.value})}/>
            <br/>
            <h6>Disponibilità:</h6>
            <Form>
                {['radio'].map((type) => (
                  <div key={`inline-${type}`} className="mb-3">
                    <Form.Check
                      inline
                      label="Sì"
                      name="group1"
                      type={type}
                      id={`inline-${type}-1`}
                      onChange={() => this.setState({disp_form_modal: true})}
                    />
                    <Form.Check
                      inline
                      label="No"
                      name="group1"
                      type={type}
                      id={`inline-${type}-2`}
                      onChange={() => this.setState({disp_form_modal: false})}
                    />
                    </div>
                ))}
          </Form>
          {this.state.show_form_var&&<br/>}
          {this.state.show_form_var && <h6 id='cap_tit'>Capienza:</h6>}
          {this.state.show_form_var&&<Form.Control
            className="mobileBox"
            required
            name="mobile"
            type="number"
            maxLength="10"
            id='cap_form'  
            onChange={(event) => this.setState({capienza_form_modal: event.target.value})}
          />}
          <br/>
          <h6>Costo:*</h6>
          <br/>
          <InputGroup className="mb-3">
          <InputGroup.Text>$</InputGroup.Text>
          <Form.Control aria-label="costo*" onChange={(event) => this.setState({costo_form_modal: event.target.value})}/>
          <InputGroup.Text>.00</InputGroup.Text>
          </InputGroup>
          {this.state.show_form_var&&<Form.Control type="text" placeholder="extra" onChange={(event) => this.setState({extra_form_modal: event.target.value})}/>}
          <br/>
          <Alert variant="danger" hidden={!this.state.show_alert_riemp}>Riempi tutti i campi contrassegnati!</Alert>
          <br/>
          <Alert variant="danger" hidden={!this.state.show_alert_id}>Id già in uso!</Alert>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-danger" onClick={handleClose}>
              Chiudi
            </Button>
            <Button variant="dark" onClick={add_Element}>Invia</Button>
          </Modal.Footer>
        </Modal>

        <Modal show={this.state.show_modal_delete} onHide={closeDelModal}>
        <Modal.Header closeButton>
          <Modal.Title>Elimina</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6>
            Inserisci l'id dell'elemento da eliminare:
          </h6>
          <br/>
          <Form.Control type="text" placeholder="Id" onChange={(event) => this.setState({id_form_modal: event.target.value})} />
          <br/>
          <Alert variant='danger' hidden={!this.state.show_al_del}>Id non presente!</Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-danger" onClick={closeDelModal}>
            Chiudi
          </Button>
          <Button variant="dark" onClick={delete_element}>
            Salva Modifiche
          </Button>
        </Modal.Footer>
      </Modal>
      </>
    );
  };

  

  render(){
    

    return(
      <Container fluid >
        <Row className='cont_img_home'>
            <Col xs={12}></Col>
            <Col className='d-flex justify-content-center'>
                <h1 id='text_shadow' className='text-white'>SALE & POSTAZIONI</h1>
            </Col>
            <Col xs={12}></Col>
        </Row>
        <Row className='my-2'></Row>
        <Row>
          <Col xs={12}>
            <Alert variant='success' hidden={!this.state.show_modal_add_success}>Elemento aggiunto con successo!</Alert>
          </Col>
          <Col xs={12}>
            <Alert variant='success' hidden={!this.state.show_al_del_succ}>Elemento eliminato con successo!</Alert>
          </Col>
          <Col xs={12}>
            <Alert variant='success' hidden={!this.state.show_al_mod_succ}>Aggiornamento effettuato con successo!</Alert>
          </Col>
          {<this.Example></this.Example>}
        </Row>
        <Row className='d-flex my-2'>
            <Col></Col>
            <Col xs={12}>
            <ListGroup>
            <Modal show={this.state.show_modal_modify} onHide={this.CloseModalModify}>
              <Modal.Header closeButton>
                <Modal.Title>Modifica Postazione</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form.Control type="text" placeholder={this.state.element_post_to_modify.id} onChange={(event) => {this.setState({id_post_mod: event.target.value})}}/>
                <br/>
                <h6>Disponibilità:</h6>
                <Form>
                    {['radio'].map((type) => (
                      <div key={`inline-${type}`} className="mb-3">
                        <Form.Check
                          inline
                          label="Sì"
                          name="group1"
                          type={type}
                          id={`inline-${type}-1`}
                          checked={true && this.state.stat_post_mod}
                          onChange={() => {this.setState({stat_post_mod:true})}}
                        />
                        <Form.Check
                          inline
                          label="No"
                          name="group1"
                          type={type}
                          id={`inline-${type}-2`}
                          checked={true && !this.state.stat_post_mod}
                          onChange={() => {this.setState({stat_post_mod:false})}}
                        />
                        </div>
                    ))}
                  </Form>
                  <br/>
                  <h6>Costo:</h6>
                  <br/>
                  <InputGroup className="mb-3">
                  <InputGroup.Text>$</InputGroup.Text>
                  <Form.Control aria-label="costo" placeholder={this.state.element_post_to_modify.costo} onChange={(event) => this.setState({cost_post_mod: event.target.value})}/>
                  <InputGroup.Text>.00</InputGroup.Text>
                  </InputGroup>
                  <br/>
                  <Alert variant='danger' hidden={!this.state.show_al_mod_err}>Id già in uso!</Alert>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="outline-danger" onClick={this.CloseModalModify}>
                  Chiudi
                </Button>
                <Button variant="dark" onClick={this.SaveModifyPostazione}>
                  Salva Modifiche
                </Button>
              </Modal.Footer>
            </Modal>
            <Modal show={this.state.show_modal_modify_sale} onHide={this.CloseModalModifySale}>
              <Modal.Header closeButton>
                <Modal.Title>Modifica Sale</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              <Form.Control type="text" placeholder={this.state.element_sale_to_modify.id} onChange={(event) => {this.setState({id_sale_mod: event.target.value})}}/>
                <br/>
                <h6>Disponibilità:</h6>
                <Form>
                    {['radio'].map((type) => (
                      <div key={`inline-${type}`} className="mb-3">
                        <Form.Check
                          inline
                          label="Sì"
                          name="group1"
                          type={type}
                          id={`inline-${type}-1`}
                          checked={true && this.state.stat_sale_mod}
                          onChange={() => {this.setState({stat_sale_mod:true})}}
                        />
                        <Form.Check
                          inline
                          label="No"
                          name="group1"
                          type={type}
                          id={`inline-${type}-2`}
                          checked={true && !this.state.stat_sale_mod}
                          onChange={() => {this.setState({stat_sale_mod:false})}}
                        />
                        </div>
                    ))}
                  </Form>
                  <br/>
                  <h6 id='cap_tit'>Capienza:</h6>
                  <Form.Control
                    className="mobileBox"
                    required
                    name="mobile"
                    type="number"
                    maxLength="10"
                    id='cap_form'
                    placeholder={this.state.element_sale_to_modify.capienza}  
                    onChange={(event) => this.setState({cap_sale_mod: event.target.value})}
                  />
                  <br/>
                  <h6>Costo:</h6>
                  <br/>
                  <InputGroup className="mb-3">
                  <InputGroup.Text>$</InputGroup.Text>
                  <Form.Control aria-label="costo" placeholder={this.state.element_sale_to_modify.costo} onChange={(event) => this.setState({cost_sale_mod: event.target.value})}/>
                  <InputGroup.Text>.00</InputGroup.Text>
                  </InputGroup>
                  <br/>
                  <h6>Extra:</h6>
                  <br/>
                  <Form.Control type="text" placeholder={this.state.element_sale_to_modify.extra} onChange={(event) => this.setState({ex_sale_mod: event.target.value})}/>
                  <br/>
                  <Alert variant='danger' hidden={!this.state.show_al_mod_err}>Id già in uso!</Alert>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="outline-danger" onClick={this.CloseModalModifySale}>
                  Chiudi
                </Button>
                <Button variant="dark" onClick={this.SaveModifySale}>
                  Salva Modifiche
                </Button>
              </Modal.Footer>
            </Modal>
             {this.show()}
            </ListGroup>
            </Col>
            <Col></Col>
        </Row>
        <Row></Row>
      </Container>

    );
  }
};