import React, { Component } from 'react';
import {
  Badge,
  Row,
  Col,
  Card,
  CardHeader,
  CardBlock,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink,
  Button
} from "reactstrap";
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SkyLight, {SkyLightStateless} from 'react-skylight';
import './../product.css';
import Env from '../../../environment/environment';

var divStyle = {
  marginLeft : "65%"
};


class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {items: []};
    this.getCategory = this.getCategory.bind(this);
    this.getCategory();
  }

  getCategory(){
    axios.get(Env.url+'/yinn/product/category/get').then(response =>{
      this.setState({items : response.data});
    })
  }
  
  deleteModal(id){
    this.setState({id : id})
    this.simpleDialog.show()    
  } 
  delete(){
    axios.delete(Env.url+'/yinn/product/category/delete/'+this.state.id).then(response =>{
      this.getCategory()
      this.simpleDialog.hide()
      toast.success(response.data, {
        position: toast.POSITION.TOP_RIGHT
      }); 
    })
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
            <b><h3>Are you sure you want to Delete this Category ??</h3></b></p>}>
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
                  <Col xs="12" sm="10">
                      <b>Category List</b>
                  </Col>
                  <Col xs="12" sm="1">
                    <Col xs="12" sm="3">
                    </Col>
                        <Button type="submit" href="#/product/category/add" size="sm"  style={divStyle}  color="warning"> <b>Add Category</b> </Button>
                  </Col>
              </Row>
              </CardHeader>
              <CardBlock className="card-body">
                <Table hover bordered striped responsive size="sm">
                  <thead>
                  <tr>
                    <th> Name</th>                   
                    <th> Status</th>
                    <th> Created At</th>
                    <th> Action </th>
                    
                  </tr>
                  </thead>
                  <tbody>
                      {this.state.items.length > 0 && this.state.items.map((item, index) => (
                            <tr>
                             <td> {item.name}</td>                             
                              <td> active</td>                              
                              <td> {item.createdAt}</td>
                              <td >{ }
                                    <i className="fa fa-eye fa-lg mt-4"></i><span>{'  '} </span>
                                    <i className="fa fa-edit fa-lg mt-4"></i><span>{'  '} </span> 
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
              </CardBlock>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Category;