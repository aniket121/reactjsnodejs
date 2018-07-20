import React, { Component } from 'react';
import { Button, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row ,
    Badge, Nav, NavItem, NavLink, TabContent, TabPane, Card,CardBody,Form,FormGroup,Label,Table
} from 'reactstrap';
import axios from 'axios';
import classnames from 'classnames';
import Country from '../../../assets/country/countries';
import States from '../../../assets/country/states';
import Cities from '../../../assets/country/cities';
import Env from '../../../environment/environment';

var user = {}
var address = []
var availabelAddress = []
class Customer extends Component {
    constructor(props) {
        super(props);
        this.addrData = {}
        this.toggle = this.toggle.bind(this);
        this.state = {
          activeTab: '1',
          element  : [],
          addrerr  : true,
          states   : 0,
          count    : 0,
          addbtnstate : false,
        };
        this.save = this.save.bind(this);
        this.forceUpdate = this.forceUpdate.bind(this);
        // this.submitAddr  = this.submitAddr.bind(this);
      }
    
      toggle(tab) {
        if (this.state.activeTab !== tab) {
          this.setState({
            activeTab: tab,
          });
        }
      }

      selectState(event){        
        // var data = this.state.element
        // this.setState({ element: [...this.state.element, ...data] });
        this.state.states = States.filter(state => state.country_id == event.target.value)
        // this.setState({ states: States.filter(state => state.country_id == event.target.value)});
        
      }

      selectFirstName(event){
          if(/^([a-zA-z]){1,20}$/.test(event.target.value))
            user['firstname'] = event.target.value
      }

      selectLastName(event){
        if(/^([a-zA-z]){1,20}$/.test(event.target.value))
            user['lastname'] = event.target.value
      }
      selectPhone(event){
        if(/^([0-9]){1,13}$/.test(event.target.value))
            user['phone'] = event.target.value
      }

      selectGender(event){
            if(event.target.value != 'Gender'){
                user['gender'] = event.target.value
            }   
      }
      selectEmail(event){        
          user['email'] = event.target.value
     }
      selectPassword(event){
            user['password'] = event.target.value
      }
      selectConfirm(event){
          this.setState({confirm : event.target.value})          
      }

    close(){
        const element = this.state.element;
        this.setState({ 
            element: [...element.slice(0,this.state.count), ...element.slice(this.state.count+1)]
          });
        this.state.count = this.state.count  -1 ;
      }

      forceUpdate(){
        
        this.setState({addrerr : true})
        var count = [1]
        var data = count.map((el, i) =>          
            <Card>
                <Row><Col xs="12" sm="11"></Col>
                    <Col xs="12" sm="1">
                        <button type="button" style={{"color" :"red" }} class="close" onClick={this.close.bind(this)} aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                        </button>                    
                    </Col>
                </Row>
                <CardBody className="card-body">
                    <Form action="" method="post" className="form-horizontal">                                
                            <FormGroup>
                                <Row>
                                    <Col xs="12" sm="6">
                                        <Label htmlFor="appendedPrependedInput"> Select Address Type</Label>
                                    </Col>
                                    <Col xs="12" sm="6">
                                        <FormGroup>
                                            <Input onChange={this.addressType.bind(this)} type="select" name="select" id="exampleSelect">
                                                <option>Address Type</option>
                                                <option>Permanent</option>
                                                <option>Current</option>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="12" sm="6">
                                        <Label htmlFor="appendedPrependedInput"> Address line 1*</Label>
                                    </Col>
                                    <Col xs="12" sm="6">
                                        <InputGroup className="input-prepend">
                                            <Input onChange={this.addressLine1.bind(this)} type="text"/>
                                        </InputGroup>
                                    </Col>
                                </Row><br/>
                                <Row>
                                <Col xs="12" sm="6">
                                    <Label htmlFor="appendedPrependedInput"> Address line 2</Label>
                                </Col>
                                <Col xs="12" sm="6">
                                        <InputGroup className="input-prepend">
                                        <Input onChange={this.addressLine2.bind(this)} type="text"/>
                                        </InputGroup>
                                </Col>
                                </Row><br/>
                                <Row>
                                    <Col xs="12" sm="6">
                                        <Label htmlFor="appendedPrependedInput"> Country</Label>
                                    </Col>
                                    <Col xs="12" sm="6">
                                        <FormGroup>
                                                <Input onChange={this.country.bind(this)} type="select" name="select" id="exampleSelect">
                                                    <option>Select Country</option>
                                                    {Country ?Country.map((ct, i)=>(
                                                    <option value={ct.id} >{ct.name}</option>
                                                )) :'Country not found'}
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="12" sm="6">
                                        <Label htmlFor="appendedPrependedInput"> State</Label>
                                    </Col>
                                    <Col xs="12" sm="6">
                                        <FormGroup>
                                            <Input onChange={this.states.bind(this)} type="select" name="select" id="exampleSelect">
                                                <option>Select State</option>
                                                {States.length > 0 ? States.map((ct, i)=>(
                                                <option>{ct.name}</option>
                                                )) :'State not found'}
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="12" sm="6">
                                        <Label htmlFor="appendedPrependedInput"> City</Label>
                                    </Col>
                                    <Col xs="12" sm="6">
                                        <FormGroup>
                                            <Input onChange={this.city.bind(this)} type="select" name="select" id="exampleSelect">
                                                <option>Select City</option>
                                                {Cities.length > 0 ? Cities.map((ct, i)=>(
                                                <option>{ct.name}</option>
                                                )) :'State not found'}
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="12" sm="6">
                                        <Label htmlFor="appendedPrependedInput"> Zip*</Label>
                                    </Col>
                                    <Col xs="12" sm="6">
                                        <InputGroup className="input-prepend">
                                            <Input onClick={this.zip.bind(this)} type="text"/>
                                        </InputGroup>
                                    </Col>
                                </Row><br/>                        
                                <Row>
                                    <Col xs="12" sm="6">
                                        <Label htmlFor="appendedPrependedInput"> Phone*</Label>
                                    </Col>
                                    <Col xs="12" sm="6">
                                        <InputGroup className="input-prepend">
                                            <Input onClick={this.phone.bind(this)} type="text"/>
                                        </InputGroup>
                                    </Col>
                                </Row><br/>

                            </FormGroup>
                    </Form>
                    <Row style={{display: 'flex', justifyContent: 'center'}}>
                        <Button className="col-3" block color="primary" onClick={this.submitAddr.bind(this)}   size="sm"  ><b>Add</b></Button>
                    </Row>
                </CardBody>
            </Card>
        )
        this.setState({status :  true})
        this.setState({ element: [...this.state.element, ...data] });
      }

    addAddress(){
        this.addrData = {}
        this.state.addbtnstate = !this.state.addbtnstate;
        this.state.count =  this.state.count + 1;
        this.forceUpdate();
    }

    addressType(event){
        if(event.target.value != 'Address Type'){
            this.addrData['address_type'] = event.target.value
        }   
    }
    addressLine1(event){
        this.addrData['addressline_1'] = event.target.value
    }
    addressLine2(event){
        this.addrData['addressline_2'] = event.target.value
    }
    country(event){
        if(event.target.value != 'Select Country'){
            this.addrData['country'] = event.target.value
        }   
    }
    states(event){
        if(event.target.value != 'Select State'){
            this.addrData['states'] = event.target.value
        }   
    }
    city(event){
        if(event.target.value != 'Select City'){
            this.addrData['city'] = event.target.value
        }   
    }
    zip(event){
        this.addrData['zip'] = event.target.value
    }
    phone(event){
        this.addrData['phone'] = event.target.value   
    }

    submitAddr(){
        if(!availabelAddress.includes(this.state.count)){
            address.push(this.addrData)
            this.setState({addbtnstate : !this.state.addbtnstate })
            availabelAddress.push(this.state.count)
        }        
    }  

    save(){
        if(this.state.element.length == 0){
            this.setState({addrerr : false})
        }else{
            //this.state.confirm 
            user['user_type'] = 'customer';
            // user['Address'] = address;
            console.log(user)
            axios.post(Env.url+'/yinn/user/signup', user ).then(function (response) {  
                if(response.status === 200){
                    var data ={}
                    data['user_id'] = response.data.user_id;
                    data['address'] = address;
                    axios.post(Env.url+'/yinn/customer/create', data ).then(function (response) {  
                        if(response.status === 200){
                            setTimeout(function() { window.location="#/login"; }.bind(this), 3000);                               
                        }
                    });                              
                }
              });
        }            
    }
    
  render() {
    return (
      <div  className="animated fadeIn">
        <Row>
          <Col xs="12" md="12" className="mb-4">
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '1' })}
                  onClick={() => { this.toggle('1'); }}
                >
                  General
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '2' })}
                  onClick={() => { this.toggle('2'); }}
                >
                  Payment Method
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '3' })}
                  onClick={() => { this.toggle('3'); }}
                >
                  Order History
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '4' })}
                  onClick={() => { this.toggle('4'); }}
                >
                  Product Returns
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="1">
                <Row>
                    <Col xs="12" sm="4">
                        <InputGroup className="mb-3">
                            <InputGroupAddon> <InputGroupText><i className="icon-user"></i></InputGroupText></InputGroupAddon>
                            <Input onChange={this.selectFirstName} type="text" maxlength="20" placeholder="First name"/>
                        </InputGroup>
                    </Col>
                    <Col xs="12" sm="4">
                        <InputGroup className="mb-3">
                            <InputGroupAddon><InputGroupText><i className="icon-user"></i></InputGroupText></InputGroupAddon>
                            <Input onChange={this.selectLastName} type="text" maxlength="20"  placeholder="Last name"/>
                        </InputGroup>
                    </Col><Col xs="12" sm="4"></Col>
                    <Col xs="12" sm="4">
                        <InputGroup className="mb-3">
                            <InputGroupAddon><InputGroupText><i className="icon-phone"></i></InputGroupText></InputGroupAddon>
                            <Input onChange={this.selectPhone} type="text" maxlength="20"  placeholder="Contact Number"/>
                        </InputGroup>
                    </Col>
                    <Col xs="12" sm="4">
                        <InputGroup className="mb-3">
                            <Input onChange={this.selectGender} type="select" name="select" id="exampleSelect">
                                <option>Gender</option>
                                <option>Male</option>
                                <option>Female</option>
                                <option>Others</option>                        
                            </Input>
                        </InputGroup>
                    </Col>
                    <Col xs="12" sm="8">
                        <InputGroup className="mb-3">
                            <InputGroupAddon><InputGroupText>@</InputGroupText></InputGroupAddon>
                            <Input type="text" maxlength="20" onChange={this.selectEmail}   placeholder="Email"/>
                        </InputGroup>
                    </Col>
                    <Col xs="12" sm="2"></Col> 
                    <Col xs="12" sm="4">
                        <InputGroup className="mb-3">
                            <InputGroupAddon> <InputGroupText><i className="icon-user"></i></InputGroupText></InputGroupAddon>
                            <Input onChange={this.selectPassword} type="password" maxlength="20" placeholder="Password"/>
                        </InputGroup>
                    </Col>
                    <Col xs="12" sm="4">
                        <InputGroup className="mb-3">
                            <InputGroupAddon> <InputGroupText><i className="icon-user"></i></InputGroupText></InputGroupAddon>
                            <Input onChange={this.selectConfirm.bind(this)} type="text" maxlength="20" placeholder="Confirm Password"/>
                        </InputGroup>
                    </Col>                   
                </Row>
                <Row>
                        <Col xs="12" sm="10"></Col>
                        <Col col="6" sm="4" md="5" xl className="mb-3 mb-xl-0" >
                            <Button block color="warning" size="sm" onClick={(e)=>this.addAddress()} disabled={this.state.addbtnstate} >
                                <b>Add Address*</b>
                            </Button>
                            <div style={{"color":"red"}} hidden={this.state.addrerr}>
                                    Please Add Address
                            </div>
                        </Col>
                </Row>
                <Row>                    
                    {this.state.element.length > 0 ? this.state.element.map((item, index) => (
                        <Col xs="12" sm="5">
                            {item}
                        </Col>
                    )) : ' '}
                </Row>
                    <Row>
                        <Col xs="12" sm="5"></Col>
                        <Col col="12" sm="2"   >
                            <Button block color="warning" size="sm" onClick={(e)=>this.save()} ><b>Save</b></Button>
                        </Col>
                    </Row>
              </TabPane>
              <TabPane tabId="2">
                    Payment Method
              </TabPane>
              <TabPane tabId="3">

              <Row>
          <Col>
            <Card>
            {/* <CardHeader>                
                <Row>
                    <Col xs="12" sm="9">
                      <b>Product List</b>
                    </Col>
                    <Col  xs="12"  sm="2">                    
                          <Button type="submit" href="#/product/add" size="sm"  style={divStyle} color="warning"> <b>Add Product</b> </Button>                    
                    </Col>
                </Row>
              </CardHeader> */}
              <CardBody className="card-body">
                <Row>
                  <Col xs="12" sm="4">
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <Button type="button" color="warning"><i className="fa fa-search search-color"></i> Search</Button>
                          </InputGroupAddon>
                          <Input type="text" id="input1-group2" className="search-color" name="input1-group2" placeholder="Order" />
                        </InputGroup>
                  </Col>
                </Row><br/>
                <Table hover bordered striped responsive size="sm">
                  <thead>
                  <tr className="header-color">
                    <th> Sr.no</th>
                    <th> Order Status</th>
                    <th> Total</th>
                    <th> Customer Name</th>
                    <th> Tracking Order</th>
                    {/* <th> Action</th> */}
                  </tr>
                  </thead>
                  <tbody>
                     
                            <tr>
                             <td>1</td>
                             <td>Pending</td>
                             <td>2</td>
                             <td>Andreo</td>
                             <td>1297sj78</td>
                             {/* <td>true</td>                              */}
                        
                            </tr>
                   
                  </tbody>
                </Table>
                {/* <nav>
                  <Pagination>
                    <PaginationItem><PaginationLink previous href="#">Prev</PaginationLink></PaginationItem>
                    <PaginationItem active>
                      <PaginationLink href="#">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem><PaginationLink href="#">2</PaginationLink></PaginationItem>                   
                    <PaginationItem><PaginationLink next href="#">Next</PaginationLink></PaginationItem>
                  </Pagination>
                </nav> */}
              </CardBody>
            </Card>
          </Col>
        </Row>



              </TabPane>
              <TabPane tabId="4">
                    Return
              </TabPane>
            </TabContent>
          </Col>
          </Row>
      </div>
    );
  }
}

export default Customer;
