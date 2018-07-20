import React, { Component } from 'react';
import {
    Button, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row, CardHeader,
    Badge, Nav, NavItem, NavLink, TabContent, TabPane, Card, CardBody, Form, FormGroup, Label, Table
} from 'reactstrap';
import axios from 'axios';
import classnames from 'classnames';
import Env from '../../../environment/environment';
import cookie from 'react-cookies';
import './vieworder.css'


class ViewOrder extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            product : {},
            activeTab: '1',
            order : {},
            user : {},
            address : [],
            product_name : '',
            prod_description : '',
            prod_quantity : '',
            sales_price : '',
            price : '',
            discount : '10%',
            total : ''
        };
    }

    componentWillMount() {
            axios.get(Env.url + '/yinn/orders/get/'+ cookie.load('order_id')).then(response => {
            this.setState({ order   : response.data.order });
            this.setState({ user    : response.data.user });
            this.setState({ product : response.data.product });
            var count = response.data.user.address.length-1
            this.setState({ address : response.data.user.address[count] });

            this.setState({ product_name : response.data.product.name });
            this.setState({ prod_description : response.data.product.description });
            this.setState({ prod_quantity : response.data.product.stock_quantity });
            this.setState({ sales_price : response.data.product.sales_price });
            this.setState({ price : response.data.product.price });
        });
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab,
            });
        }
    }


    render() {
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" md="12" className="mb-4">
                        <Nav tabs>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: this.state.activeTab === '1' })}
                                    onClick={() => { this.toggle('1'); }}
                                >
                                    *Order Summary
                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: this.state.activeTab === '2' })}
                                    onClick={() => { this.toggle('2'); }}
                                >
                                    Payments and Credits
                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: this.state.activeTab === '3' })}
                                    onClick={() => { this.toggle('3'); }}
                                >
                                    Notes
                </NavLink>
                            </NavItem>
                        </Nav>
                        <TabContent activeTab={this.state.activeTab}>
                            <TabPane tabId="1">
                                <Row>
                                <Col sm="8">
                                    <Card>
                                    <CardHeader>
                                    <Label htmlFor="appendedPrependedInput"><b> Fullfillment Orders</b></Label>
                                    </CardHeader>
                                        <CardBody className="card-body">
                                            <Row>
                                                <Col sm="4">
                                                    <div>
                                                        <Label htmlFor="appendedPrependedInput" ><b> Address</b></Label>
                                                    </div>
                                                    <div>
                                                        {this.state.user.firstname}  {this.state.user.lastname}                                                      
                                                    </div>
                                                    <div>
                                                        { this.state.address.length > 0 && this.state.address.map((addr,index)=>(
                                                            <div>
                                                               
                                                                {addr.addressline_1}
                                                                {addr.phone}
                                                            </div>
                                                        ))}                                                       
                                                    </div>  
                                                </Col>
                                                <div>
                                                <Col sm="12">
                                                   <Label htmlFor="appendedPrependedInput" ><b> Order Number</b></Label>                                                                                                        
                                                </Col>
                                                {this.state.order._id}            
                                                </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                              
                                                <div>
                                                <Col sm="4">
                                                    <Label htmlFor="appendedPrependedInput"><b> Status</b></Label>
                                                </Col>
                                                {this.state.order.order_status}      
                                                </div>
                                                
                                            </Row><br/>
                                            <Card>
                                                <CardBody className="card-body">
                                                    <Row>
                                                        <Col sm="12">
                                                            <Table hover bordered striped responsive size="sm" border="1">
                                                                <thead>
                                                                    <tr className="header-color">
                                                                        <th> Items</th>
                                                                        <th> Product Details</th>
                                                                        <th> Quantity</th>
                                                                        <th> Sales Price</th>
                                                                        <th> Retail Price</th>                                                                        
                                                                        <th> Discount</th>                                                                        
                                                                        <th> Total</th>
                                                                    </tr>
                                                                </thead>
                                                                
                                                                <tbody>
                                                                {/* {this.state.product.length > 0 && */}
                                                                    <tr>
                                                                        <td>{this.state.product_name}</td>
                                                                        <td>{this.state.prod_description}</td>
                                                                        <td>{this.state.prod_quantity}</td>
                                                                        <td>{this.state.sales_price}</td>
                                                                        <td>{this.state.price}</td>
                                                                        <td>{this.state.discount}</td>

                                                                        <td>2000</td>
                                                                        {/* <td>{prod.price}</td> */}
                                                                    </tr>
                                                                       {/* } */}
                                                                </tbody>
                                                             
                                                            </Table>
                                                        </Col>
                                                        <Col xs="12" sm="4">
                                                            <div className="controls">
                                                                <InputGroup className="input-prepend">

                                                                </InputGroup>
                                                            </div>
                                                        </Col>
                                                    </Row><br />
                                                    <Row>
                                                        <Col xs="12" sm="4">

                                                        </Col>
                                                        <Col xs="12" sm="4">
                                                            <div className="controls">
                                                                <InputGroup className="input-prepend">

                                                                </InputGroup>
                                                            </div>
                                                        </Col>
                                                    </Row>

                                                </CardBody>
                                            </Card>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col sm="4">
                                <Card>
                                    <CardHeader>
                                    <b>Order SUMMARY</b>
                                    </CardHeader>
                                    <CardBody>
                                    <Label htmlFor="appendedPrependedInput"> Item Sub total : </Label> 300<br/>
                                    <Label htmlFor="appendedPrependedInput"> Discount :</Label> 10%<br/>
                                    <Label htmlFor="appendedPrependedInput"> Promotion Codes :</Label> pqxy231<br/>
                                    <Label htmlFor="appendedPrependedInput"> Estimated Tax : </Label> 2%<br/>
                                    <Label htmlFor="appendedPrependedInput"> Shipping & Handling : </Label> 50<br/>
                                    <Label htmlFor="appendedPrependedInput"> Grand Total : </Label> 2000<br/>
                                    <Label htmlFor="appendedPrependedInput"> Billing Address : </Label> AT deccan Gymkhana Pune<br/>                                 
                                    </CardBody>
                                </Card>
                                </Col>
                            </Row>
                            </TabPane>
                            <TabPane tabId="2">
                                Payments and Credits
                            </TabPane>
                            <TabPane tabId="3">
                                Notes
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


                                                </Row><br />


                                                {/* <nav>
                 
                </nav> */}
                                            </CardBody>
                                        </Card>
                                    </Col>
                                </Row>
                            </TabPane>
                        </TabContent>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default ViewOrder;
