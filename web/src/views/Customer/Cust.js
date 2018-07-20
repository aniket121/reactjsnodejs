import React, { Component } from 'react';
import {
  Badge,InputGroup,InputGroupAddon,Input,
  Row,
  Col,
  Card,
  CardHeader,
  CardBlock,
  CardBody,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink,
  Button
} from "reactstrap";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SkyLight, {SkyLightStateless} from 'react-skylight';
import axios from 'axios';
import './cust.css';
import Env from '../../environment/environment';


var divStyle = {
  marginLeft : "81%"
};

// https://daveceddia.com/open-modal-in-react/

class Cust extends Component {
  constructor(props) {
    super(props);
    this.state = {items: []};
    this.getCustomer = this.getCustomer.bind(this);
    this.getCustomer();
  }

  getCustomer(){
    axios.get(Env.url+'/yinn/customer/get').then(response =>{
      this.setState({items : response.data});
    })
  }
 

  deleteModal(id){
    this.setState({id : id})
    this.simpleDialog.show()    
  } 
  delete(){
    axios.delete(Env.url+'/delete/'+this.state.id).then(response =>{
      this.getCustomer()
      this.simpleDialog.hide()
      toast.success(response.data, {
        position: toast.POSITION.TOP_RIGHT
      }); 
    })
  }

  searchElement(evt){
    this.state.search = evt.target.value
    if(evt.target.value.length == 0){
      this.getCustomer()
    }
  }

  search(){
    axios.get(Env.url+'/yinn/customer/search/'+this.state.search).then(response =>{
      this.setState({items : response.data});
    })
  }



  render() {
    return (
      <div className="animated fadeIn">
          <Row>
          <Col>
            <Card>
            <CardHeader>                
                <Row>
                    <Col xs="12" sm="9">
                      <b>Customer List</b>
                    </Col>
                    <Col  xs="12"  sm="2">                    
                          <Button type="submit" href="#/customer/add" size="sm"  style={divStyle} color="warning"> <b>Add Customer</b> </Button>                    
                    </Col>
                </Row>
              </CardHeader>
              <CardBody className="card-body">
              <Row>
              <Col xs="12" sm="4">
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <Button type="button" color="warning" onClick={this.search.bind(this)} ><i className="fa fa-search search-color"></i> Search</Button>
                      </InputGroupAddon>
                      <Input type="text" id="input1-group2" onChange={this.searchElement.bind(this)} className="search-color" name="input1-group2" placeholder="Customer Name" />
                    </InputGroup>
              </Col>
            </Row><br/>
                <Table hover bordered striped responsive size="sm">
                  <thead>
                  <tr className="header-color">
                  <th> Sr.no</th>
                    <th> First Name</th>
                    <th> Last Name</th>
                    <th> Email Address</th>
                    <th> Phone</th>
                    <th> Status</th>
                    <th> Action</th>
                  </tr>
                  </thead>
                  <tbody>
                     {this.state.items.length > 0 && this.state.items.map((item, index) => (
                            <tr>
                              <td>{index+1}</td> 
                             <td>{item.firstname}</td>                             
                             <td>{item.lastname || "NA"}</td>
                              <td>{item.email}</td>
                              <td>{item.phone || "NA"}</td>
                              <td>$ {true}</td>
                              <td > 
                                  <i className="fa fa-eye fa-lg mt-4"></i><span>{'  '} </span>  
                                  <i className="fa fa-edit fa-lg mt-4">{  } </i> <span>{'  '} </span>
                                  <i className="fa fa-trash fa-lg mt-4" onClick={(e)=>this.deleteModal(item._id)}></i>
                              </td>
                            </tr>
                      ))}
                   
                  </tbody>
                </Table>
                <nav>
                  <Pagination>
                    <PaginationItem><PaginationLink previous href="#">Prev</PaginationLink></PaginationItem>
                    <PaginationItem active>
                      <PaginationLink href="#">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem><PaginationLink href="#">2</PaginationLink></PaginationItem>                   
                    <PaginationItem><PaginationLink next href="#">Next</PaginationLink></PaginationItem>
                  </Pagination>
                </nav>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Cust;

