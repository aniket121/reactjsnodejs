import React, {Component} from "react";
// import {Container, Row, Col, CardGroup, Card, CardBlock, Button, Input, InputGroup, InputGroupAddon} from "reactstrap";
// import {Container,Checkbox, Row, Col,InputGroupText,  Card, CardBlock, CardFooter, Button, Input,Label, InputGroup, InputGroupAddon} from "reactstrap";
import { Button, Form, Card, CardBody,Label, CardGroup, Col, Container, Input, InputGroup,CardFooter, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';
import axios from 'axios';
import { Link } from 'react-router'
import Env from '../../../environment/environment';
import cookie from 'react-cookies';
import FacebookLogin from 'react-facebook-login';
import SocialLogin from 'react-social-login'
import TwitterLogin from 'react-twitter-auth';
import GoogleLogin from 'react-google-login';

var divStyle = {
  color: "red",
  marginTop : "-3%"
};

 const responseFacebook = (response) => {
  console.log(response);
}
const handleSocialLogin = (user) => {
  console.log(user)
}
const responseGoogle = (response) => {
  console.log(response);
}
 
const handleSocialLoginFailure = (err) => {
  console.error(err)
}


const ColoredLine = ({ color }) => (
  <hr
      style={{
          color: color,
          backgroundColor: color,
          height: 1
      }}
  />
);

class Login extends Component {
	constructor() {
    super();
    this.state = {
      emailState :  true,
      passwordState : true,
      toster_condition : 0,
    };
    this.data = {};

  }


  handleEmail(evt) {
    this.data["email"] = evt.target.value;
    this.setState({ emailState: true });
  }

  handlePassword(evt){
    this.data["password"] = evt.target.value;
    this.setState({ passwordState: true });
  }

  signIn(){
    var condition = true;
    if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.data["email"])){
      this.setState({ emailState: false });
      condition = false;
    }

    if(this.data["password"] === undefined){
      this.setState({ passwordState: false });
      condition = false;
    }

    if(condition && this.state.toster_condition === 0){
      axios.post(Env.url+'/yinn/user/login', this.data).then(function (response) {      
          if(response.status === 200){
            cookie.save('user', response.data.user, { path: '/' })
            cookie.save('_id', response.data._id, { path: '/' })
            cookie.save('name', response.data.name, { path: '/' })
            // cookie.save('token', response.data.token, { path: '/' })
            this.state.toster_condition = 1
            toast.success("Login Sucessfull", {
              position: toast.POSITION.TOP_CENTER
            });
            setTimeout(function() { window.location="#/dashboard"; }.bind(this), 2500);                                
          }
        
        }.bind(this)).catch(err =>{
          if(this.state.toster_condition === 0){
            this.state.toster_condition =1
            toast.error(err.response.data, {
              position: toast.POSITION.TOP_CENTER
            });
          }
        })
    }
  }
  onFailed()
  {
    alert("falied")
  }
  onSuccess(){
    alert("sucess")
  }

  goToRegister(){
    window.location="#/register";
  }
  

  render() {
    return (     
        <div className="app flex-row align-items-center">
            <Container>
            <ToastContainer autoClose={1500}/> 
              <Row className="justify-content-center">
                <Col md="5">
                  <CardGroup>
                    <Card className="p-3">
                      {/* <CardBody className="text-center"> */}
                            <div style={{display: 'flex', justifyContent: 'center'}}><img src={'assets/img/logo.png'} width="100" height="50" /></div>
                            <Label style={{display: 'flex', justifyContent: 'center'}} check htmlFor="inline-checkbox1">
                                <b>Sign In to YINN Account</b>
                            </Label>
                      {/* </CardBody> */}
                      <CardBody>
                      <Form action=""  onSubmit={ e => this.signIn(e)} encType="multipart/form-data" className="form-horizontal">
                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-envelope-letter"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input type="text"  onChange={this.handleEmail.bind(this)} placeholder="Email"/>
                        </InputGroup>
                        <InputGroup className="mb-3">
                          <div style={divStyle} hidden={this.state.emailState}>
                                Enter valid Email address.
                          </div>
                        </InputGroup>
                        <InputGroup className="mb-4">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-lock"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input type="password"  onChange={this.handlePassword.bind(this)}  placeholder="Password"/>
                        </InputGroup>
                        <InputGroup className="mb-3">
                          <div style={divStyle} hidden={this.state.passwordState}>
                                Enter valid Password.
                          </div>
                        </InputGroup>
                        <InputGroup className="mb-4">
                            <Col xs="6"><br/>
                                  <Input type="checkbox" id="inline-checkbox1" name="inline-checkbox1" value="option1"/> Remember me
                            </Col>
                            <Col xs="6" className="text-right">
                              <Button color="link" className="px-0">Forgot password?</Button>
                            </Col>
                        </InputGroup>
                        <InputGroup className="mb-4">
                              <Button color="warning"   onClick={this.signIn.bind(this)}  block><b>Sign In</b></Button>
                        </InputGroup>
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                                <p className="subtitle fancy" ><span>Don't have an Account?</span></p>
                        </div>
                        <InputGroup className="mb-4">
                              <Button color="warning" onClick={this.goToRegister} block><b>Create New Account</b></Button>
                        </InputGroup>
                        </Form>
                      </CardBody>
                      <CardFooter className="p-4">
                            <div style={{display: 'flex', justifyContent: 'center', marginTop: "-6%"}}>
                                  or Login using
                            </div>
                          <Row style={{marginTop: "4%"}}>
                            <Col xs="12" sm="6">
                              <FacebookLogin
    appId="393267904497089"
    autoLoad={true}
    fields="name,email,picture"
    callback={responseFacebook}
    cssClass="my-facebook-button-class"
    icon="fa-facebook"
  />
                            </Col>
                            <Col xs="12" sm="6">
                              
                            <GoogleLogin
    clientId="734749952478-f3089qa9em1sl5qc03kqukv839ebe1hv.apps.googleusercontent.com"
    buttonText="Login with Google"
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
  />
                            </Col>
                          </Row>
                    </CardFooter>
                    </Card>

                  </CardGroup>
                </Col>
              </Row>
            </Container>
          </div>


    );
  }
}

export default Login;
