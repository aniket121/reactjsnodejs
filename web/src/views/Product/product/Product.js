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
  Form,
  Pagination,
  PaginationItem,
  PaginationLink,
  Button
} from "reactstrap";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SkyLight, {SkyLightStateless} from 'react-skylight';
import axios from 'axios';
import './../product.css';
import Env from '../../../environment/environment';
import cookie from 'react-cookies';


var divStyle = {
  marginLeft : "81%"
};

// https://daveceddia.com/open-modal-in-react/

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items : [],
      pages : '',
      initialPage : 1 ,
    };
    this.getProduct = this.getProduct.bind(this);
    this.getProduct();
  }

  getProduct(){
    axios.get(Env.url+'/yinn/product/get').then(response =>{
      this.setState({items : response.data});
      console.log(this.state)
    })
  }
 

  deleteModal(id){
    this.setState({id : id})
    this.simpleDialog.show()    
  } 
  delete(){
    axios.delete(Env.url+'/yinn/product/delete/'+this.state.id).then(response =>{
      this.getProduct()
      this.simpleDialog.hide()
      toast.success(response.data, {
        position: toast.POSITION.TOP_RIGHT
      }); 
    })
  }

  searchElement(evt){
    this.state.search = evt.target.value
    if(evt.target.value.length == 0){
      this.getProduct()
    }
  }

  search(){
    axios.get(Env.url+'/yinn/product/search/'+this.state.search).then(response =>{
      this.setState({items : response.data});
    })
  }

  paginate(){
    axios.get(Env.url+'/yinn/product/pages'+ '?pageno=1&size=5').then(response =>{
      this.setState({items : response.data});
    })
  }

  showModal(id){
    cookie.save('product_id', id, { path: '/' })
    window.location="#/product/editproduct"; 
}



  render() {
    var myBigGreenDialog = {
      width: '40%',
      // height: '39%',
      minHeight: '20%',     
    };

    return (
      <div className="animated fadeIn">

        <ToastContainer autoClose={1500} /> 
         <SkyLight dialogStyles={myBigGreenDialog}  hideOnOverlayClicked ref={ref => this.simpleDialog = ref} title={<p style={{display: 'flex', justifyContent: 'center'}}>
            <b><h4>Are you sure you want to delete this Product ?</h4></b></p>}>
            <Row style={{display: 'flex', justifyContent: 'center'}}>
                <Button type="submit" onClick={this.delete.bind(this)}  size="md"  color="warning"> Yes  </Button> 
                <Col xs="12" sm="1"></Col>
                <Button type="submit"  size="md"  onClick={() => this.simpleDialog.hide()}  color="danger"> No </Button> 
            </Row>            
        </SkyLight>
          <Row>
          <Col>
            <Card>
            <CardHeader>                
                <Row>
                    <Col xs="12" sm="9">
                      <b>Product List</b>
                    </Col>
                    <Col  xs="12"  sm="2">                    
                          <Button type="submit" href="#/product/add" size="sm"  style={divStyle} color="warning"> <b>Add Product</b> </Button>                    
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
                          <Input type="text" id="input1-group2" onChange={this.searchElement.bind(this)} className="search-color" name="input1-group2" placeholder="Product Name" />
                        </InputGroup>
                  </Col>
                </Row><br/>
                <Table hover bordered striped responsive size="sm">
                  <thead>
                  <tr className="header-color">
                    <th> Sr.no</th>
                    <th> Name</th>
                    {/* <th> Category</th> */}
                    <th> Stock Quantity</th>
                    <th> Manufacturer</th>
                    <th> MSRP</th>
                    <th> Price</th>
                    <th> Action</th>
                  </tr>
                  </thead>
                  <tbody>
                      {this.state.items.length > 0 && this.state.items.map((item, index) => (
                            <tr>
                              <td>{index+1}</td> 
                             <td>{item.name}</td>                             
                             {/* <td>{item.category.name || "NA"}</td> */}
                              <td>{item.stock_quantity}</td>
                              <td>{item.manufacture_by}</td>
                              <td>$ {item.sales_price}</td>
                              <td>$ {item.regular_price}</td>
                              <td > 
                                  {/* <i className="fa fa-eye fa-lg mt-4"></i><span>{'  '} </span>   */}
                                  <i className="fa fa-edit fa-lg mt-4" onClick={(e) => this.showModal(item._id)}>{  } </i> <span>{'  '} </span>
                                  <i className="fa fa-trash fa-lg mt-4" onClick={(e)=>this.deleteModal(item._id)}></i>
                              </td>
                            </tr>
                      ))}
                  </tbody>
                </Table>
                <nav>
                  <Pagination>
                    <PaginationItem ><PaginationLink previous href="#">Prev</PaginationLink></PaginationItem>
                    <PaginationItem active>
                      <PaginationLink href="#" onClick = {(e)=>this.paginate()}>1</PaginationLink>
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

export default ProductList;

