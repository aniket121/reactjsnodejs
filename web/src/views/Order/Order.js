import React, { Component } from 'react';
import {
  Badge, InputGroup, InputGroupAddon, Input,
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
import SkyLight, { SkyLightStateless } from 'react-skylight';
import axios from 'axios';
import Env from '../../environment/environment';
import './order.css';
import cookie from 'react-cookies';

var divStyle = {
  marginLeft: "10%",
};

class Order extends Component {
  constructor(props) {
    super(props);
    this.state = { items: [] };
    this.getOrders = this.getOrders.bind(this);
    this.getOrders();
  }
  getOrders() {
    axios.get(Env.url + '/yinn/orders/get').then(response => {
      this.setState({ items: response.data });
      console.log(this.state)
    })
  }


  searchElement(evt) {
    this.state.search = evt.target.value
    if (evt.target.value.length == 0) {
      this.getOrders()
    }
  }

  search(evt) {
    axios.get(Env.url + '/yinn/orders/search/' + this.state.search).then(response => {
      this.setState({ items: response.data });
    })
  }

  deleteModal(id) {
    this.setState({ id: id })
    this.simpleDialog.show()
  }
  delete() {
    axios.delete(Env.url + '/yinn/group/delete/' + this.state.id).then(response => {
      this.getGroups()
      this.simpleDialog.hide()
      toast.success(response.data, {
        position: toast.POSITION.TOP_RIGHT
      });
    })
  }
  viewOrders(order_id) {
    cookie.save('order_id', order_id, { path: '/' })
    window.location = "#/order/view-order"
  }


  render() {
    var myBigGreenDialog = {
      width: '40%',
      // height: '39%',
      minHeight: '20%',
    };
    return (
      <div className="animated fadeIn">
        <ToastContainer autoClose={1200} />
        <SkyLight dialogStyles={myBigGreenDialog} hideOnOverlayClicked ref={ref => this.simpleDialog = ref} title={<p style={{ display: 'flex', justifyContent: 'center' }}>
          <b><h4>Are you sure you want to delete this Group ?</h4></b></p>}>
          <Row style={{ display: 'flex', justifyContent: 'center' }}>
            <Button type="submit" onClick={this.delete.bind(this)} size="md" color="warning"> Yes  </Button>
            <Col xs="12" sm="1"></Col>
            <Button type="submit" size="md" onClick={() => this.simpleDialog.hide()} color="danger"> No </Button>
          </Row>
        </SkyLight>
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <Row>
                  <Col xs="12" sm="9">
                    <b>Orders</b>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody className="card-body">
                <Row>
                  <Col xs="12" sm="4">
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <Button type="button" color="warning" onClick={this.search.bind(this)} ><i className="fa fa-search search-color"></i>Search</Button>
                      </InputGroupAddon>
                      <Input type="text" id="input1-group2" onChange={this.searchElement.bind(this)} className="search-color" name="input1-group2" placeholder=" Search Orders" />
                    </InputGroup>
                  </Col>
                </Row><br />
                <Table hover bordered striped responsive size="sm">
                  <thead>
                    <tr className="header-color">
                      <th> Sr.No</th>
                      <th> Order Status</th>
                      <th> Order Number</th>
                      <th> Total</th>
                      <th> Order Date</th>
                      <th> Customer Name</th>
                      <th> Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.items.length > 0 && this.state.items.map((item, index) => (
                      <tr>
                        <td> {index + 1} </td>
                        <td> {item.order_status} </td>
                        <td> {item._id} </td>
                        <td> {item.total} </td>
                        <td> {item.order_place_date} </td>
                        <td> {item.user_name} </td>
                        <td >
                          <Button type="submit" onClick={() => { this.viewOrders(item._id) }} color="warning" style={divStyle} btn="sm" ><b>view order </b></Button>
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
    );
  }
}
export default Order;
