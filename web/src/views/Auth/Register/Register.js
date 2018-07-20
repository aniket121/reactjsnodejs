import React, {Component} from "react";
import {Container,Form,  Row, Col,FormGroup, Card,InputGroupText, CardBody, CardFooter, Button, Label, Input, InputGroup, InputGroupAddon} from "reactstrap";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './register.css';
import Country from '../../../assets/country/countries';
// import Modal from './Modal';
import Env from '../../../environment/environment';
import SkyLight, {SkyLightStateless} from 'react-skylight';



var divStyle = {
  color: "red",
  marginTop : "-3%"
};

class Register extends Component {
  
	constructor() {
    super();
    this.state = {
      fnameState:true,
      lnameState:true,
      emailState:true,
      passwordState:true,
      cpasswordState:true,
      countrystate : true,
      condition : false,
      termcondition:false,
      condvalidation : true,
      toster_condition : 0,
    };
    this.data = {};
    this.signUp = this.signUp.bind(this);
    this.showConditions = ''
   
  }

  handleFirstName(evt) {
    if(evt.target.value == ''){
      this.setState({ fnameState: false });
      this.data["firstname"] = '';
    }  
    if(/^[a-zA-Z]{1,20}$/.test(evt.target.value)){
      this.data["firstname"] = evt.target.value;
      this.setState({ fnameState: true });
    }else{
      this.setState({ fnameState: false });
      this.state.firstnameMessage = "Enter Only Alphabets";      
    }
  }

  handleLastName(evt){
    if(evt.target.value == ''){
      this.setState({ lnameState: false });
      this.data["lastname"] = '';
    }  
    if(/^[a-zA-Z]{1,20}$/.test(evt.target.value)){
      this.data["lastname"] = evt.target.value;
      this.setState({ lnameState: true });
    }else{
      this.setState({ lnameState: false });
      this.state.lastnameMessage = "Enter Only Alphabets";
    }
  }

  handleEmail(evt) {
    this.data["email"] = evt.target.value;
    this.setState({ emailState: true });
  }

  handlePassword(evt){
    this.data["password"] = evt.target.value;
    this.setState({ passwordState: true });
  }

  handleCPassword(evt){
    this.setState({cpassword : evt.target.value});
    this.setState({ cpasswordState: true });
  }

  selectCountry(evt){
    if (evt.target.value != 'Select Country' ){
      this.data["country"] = evt.target.value;
      this.setState({ countrystate: true });
    }    
  }
  
  condition(){
    this.simpleDialog.show()  
    
  }

  termCondition(){
    this.setState({termcondition : !this.state.termcondition}) 
  }

  signUp(event){
    event.preventDefault();
    var condition  = true;
    if(this.data["password"] === this.state.cpassword && this.data["password"] != undefined){
      this.setState({ passwordState: true });
      this.setState({ cpasswordState: true });
      if(this.data["password"].length < 8 ){
        this.setState({ passwordState: false });
        this.state.passwordMessage = "Password should be atleast 8 Character !!"
        condition = false;
      }
    }else{
      condition = false;
      this.setState({ passwordState: false });
      this.setState({ cpasswordState: false });    
    }

    if(this.data["firstname"] === undefined && this.state.fnameState){
      this.setState({firstnameMessage : "Enter First Name"})
      this.setState({fnameState : false})
      condition = false;
    }

    if(this.data["lastname"] === undefined && this.state.lnameState){
      this.state.lastnameMessage = "Enter Last Name";
      this.setState({lnameState : false})
      condition = false;
    }
    if(this.data["country"] === undefined && this.state.countrystate){
      this.setState({countrystate : false})
      condition = false;
    }
    if(!this.state.termcondition){
      this.setState({condvalidation : false })
      condition = false;
    }else{
      condition = true;
    }

    if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.data["email"])){
      this.setState({ emailState: false });
      condition = false;
    }
    if(condition && this.state.toster_condition == 0){
      axios.post(Env.url+'/yinn/user/signup', this.data ).then(function (response) {  
        if(response.status === 200 ){
                this.state.toster_condition = 1
                toast.success('Registration Successfull', {
                position: toast.POSITION.TOP_CENTER
              });        
            setTimeout(function() { window.location="#/login"; }.bind(this), 3000);                               
        }
      }.bind(this)).catch(err =>{
        if(this.state.toster_condition === 0){
          this.state.toster_condition = 1
          toast.error(err.response.data, {
            position: toast.POSITION.TOP_RIGHT
          });
        }
      })
    }
  }

  goToLogin(){
    window.location="#/login";
  }
  render() {
    return (
      <div className="app flex-row align-items-center">
        <ToastContainer  autoClose={1500}/>  
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <Card className="mx-4" style={{"width": "80%", "height":"100%","margin": "0"}}>
                <CardBody className="card-body p-3">
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <div><img src={'assets/img/logo.png'} width="100" height="50" /></div>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <Label  check htmlFor="inline-checkbox1">
                            <b>Create your account</b>
                        </Label>
                    </div><br/>
                    <Form action=""  onSubmit={ e => this.signUp(e)} encType="multipart/form-data" className="form-horizontal">
                        <InputGroup className="mb-2">
                          <InputGroupAddon> <InputGroupText><i className="icon-user"></i></InputGroupText></InputGroupAddon>
                          <Input type="text" maxlength="20"  onChange={this.handleFirstName.bind(this)} placeholder="First name" autoFocus/>
                        </InputGroup>
                        <InputGroup className="mb-1">
                          <div style={divStyle} hidden={this.state.fnameState}>
                                  {this.state.firstnameMessage}
                          </div>
                        </InputGroup>
                        <InputGroup className="mb-2">
                          <InputGroupAddon><InputGroupText><i className="icon-user"></i></InputGroupText></InputGroupAddon>
                          <Input type="text" maxlength="20" onChange={this.handleLastName.bind(this)} placeholder="Last name"/>
                        </InputGroup>
                        <InputGroup className="mb-1">
                          <div style={divStyle} hidden={this.state.lnameState}>
                                {this.state.lastnameMessage}
                          </div>
                        </InputGroup>
                        <InputGroup className="mb-2">
                        <InputGroupAddon><InputGroupText><i className="icon-envelope-letter"></i></InputGroupText></InputGroupAddon>
                          <Input type="text"  onChange={this.handleEmail.bind(this)} placeholder="Email"/>
                        </InputGroup>
                        <InputGroup className="mb-1">
                          <div style={divStyle} hidden={this.state.emailState}>
                                  Enter valid Email address.
                          </div>
                        </InputGroup>
                        <InputGroup className="mb-2">
                          <InputGroupAddon><InputGroupText><i className="icon-lock"></i></InputGroupText></InputGroupAddon>
                          <Input type="password"  onChange={this.handlePassword.bind(this)}  placeholder="Password"/>
                        </InputGroup>
                        <InputGroup className="mb-1">
                            <div style={divStyle} hidden={this.state.passwordState}>
                                  Enter valid Password.
                                  {this.state.passwordMessage}
                            </div>
                        </InputGroup>
                        <InputGroup className="mb-2">
                          <InputGroupAddon><InputGroupText><i className="icon-lock"></i></InputGroupText></InputGroupAddon>
                          <Input type="password"  minlength="8" required onChange={this.handleCPassword.bind(this)} placeholder="Confirm Password"/>
                        </InputGroup>
                        <InputGroup className="mb-1">
                            <div style={divStyle} hidden={this.state.cpasswordState}>
                                  Password do not match.
                            </div>
                        </InputGroup>
                        <InputGroup className="mb-2">
                          <Input type="select" onChange={this.selectCountry.bind(this)} name="select" id="exampleSelect" >
                            <option>Select Country</option>
                            {Country ?Country.map((ct, i)=>(
                              <option>{ct.name}</option>
                            )) :'Country not found'}
                          </Input>
                        </InputGroup>

                        <InputGroup hidden={this.state.countrystate} className = "mb-1">
                            <div style={divStyle}>
                            Please Select Country.
                            </div>
                          </InputGroup>

                          <InputGroup className = "mb-2">
                            <Col xs="12">
                              <Input type="checkbox" onClick={this.termCondition.bind(this)} value="option1"/><span >I agree to Yinn's<a onClick={ e => this.condition(e)}><u>  Terms & Conditions</u></a></span>
                            </Col>
                          </InputGroup>

                          <InputGroup hidden={this.state.condvalidation} className = "mb-1">
                            <div style={divStyle}>
                                Please Agree Terms & Conditions.
                            </div>
                          </InputGroup>
                    
                          
                        <Button color="warning"  onSubmit={this.signUp.bind(this)} block><b>Register</b></Button><br/>                 
                        </Form>
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                              <Label check htmlFor="inline-checkbox1">
                                  <p>Already have an account? Sign in</p>
                              </Label>
                        </div>                          
                        <Button color="warning" onClick={this.goToLogin} block><b>Sign In</b></Button>
                </CardBody>
                <CardFooter className="p-4">
                    <div style={{display: 'flex', justifyContent: 'center', marginTop: "-6%"}}>
                            or Login using
                    </div>
                  <Row style={{marginTop: "4%"}}>
                    <Col xs="12" sm="6">
                      <Button className="btn-facebook" block><span><b>facebook</b></span></Button>
                    </Col>
                    <Col xs="12" sm="6">
                      <Button className="btn-twitter" block><span><b>twitter</b></span></Button>
                    </Col>
                  </Row>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>

        <SkyLight  hideOnOverlayClicked ref={ref => this.simpleDialog = ref} title={<p style={{display: 'flex', justifyContent: 'center'}}>
            <b><h3>Terms and Conditions</h3></b></p>}>
            
            Please read these Terms and Conditions ("Terms", "Terms and Conditions") carefully before using the http://www.mywebsite.com (change this) website and the My Mobile App (change this) mobile application (the "Service") operated by My Company (change this) ("us", "we", or "our").

Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users and others who access or use the Service.

By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service.

Purchases

If you wish to purchase any product or service made available through the Service ("Purchase"), you may be asked to supply certain information relevant to your Purchase including, without limitation, your …

The Purchases section is for businesses that sell online (physical or digital). For the full disclosure section, create your own Terms and Conditions.

Subscriptions

Some parts of the Service are billed on a subscription basis ("Subscription(s)"). You will be billed in advance on a recurring ...

The Subscriptions section is for SaaS businesses. For the full disclosure section, create your own Terms and Conditions.

Content

Our Service allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material ("Content"). You are responsible for the …

The Content section is for businesses that allow users to create, edit, share, make content on their websites or apps. For the full disclosure section, create your own Terms and Conditions.



Links To Other Web Sites

Our Service may contain links to third-party web sites or services that are not owned or controlled by My Company (change this).

My Company (change this) has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services. You further acknowledge and agree that My Company (change this) shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods or services available on or through any such web sites or services.

Changes

We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 (change this) days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.

Contact Us

If you have any questions about these Terms, please contact us.


        </SkyLight>


      </div>
    );
  }
}

export default Register;
