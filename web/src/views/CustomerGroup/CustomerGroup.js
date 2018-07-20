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
    Button,
} from "reactstrap";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SkyLight, { SkyLightStateless } from 'react-skylight';
import axios from 'axios';
import Env from '../../environment/environment';
import './customergroup.css';
import cookie from 'react-cookies';

var divStyle = {
    marginLeft: "10%",
};

class CustomerGroup extends Component {
    constructor(props) {
        super(props);
        this.state = { items: [] };
        this.getGroups = this.getGroups.bind(this);
        this.getGroups();
    }

    searchElement(evt){
        this.state.search = evt.target.value
        if(evt.target.value.length == 0){
          this.getGroups()
        }
      }
    
      search(evt){
        axios.get(Env.url+'/yinn/group/search/'+this.state.search).then(response =>{
          this.setState({items : response.data});
        })
      }
    

    getGroups() {
        axios.get(Env.url + '/yinn/group/get').then(response => {
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

    showModal(id){
        cookie.save('group_id', id, { path: '/' })
        window.location="#/customergroup/viewgroup"; 
    }

    uploadModal(id){
        cookie.save('group_id', id, { path: '/' })
        window.location="#/customergroup/uploadgroup";
    }
    

    render() {
        var myBigGreenDialog = {
            width: '40%',
            // height: '39%',
            minHeight: '20%',
        };
        return (
            <div className="animated fadeIn">
            <ToastContainer autoClose={1200}/>
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
                                        <b>Groups</b>
                                    </Col>
                                    <Col xs="12" sm="2">
                                        <Button type="submit" href="#/customergroup/addgroup" style={divStyle} className="btn btn-md" color="warning" > <b>Create A Group</b> </Button>
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
                                            <Input type="text" id="input1-group2" onChange={this.searchElement.bind(this)} className="search-color" name="input1-group2" placeholder=" Group Name" />
                                        </InputGroup>
                                    </Col>
                                    
                                </Row><br />
                                <Table hover bordered striped responsive size="sm">
                                    <thead>
                                        <tr className="header-color">
                                            <th> GroupID</th>
                                            <th> Group Name</th>
                                            <th> Created Date</th>
                                            <th> Category</th>
                                            <th> Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.items.length > 0 && this.state.items.map((item, index) => (
                                            <tr>
                                                <td>{item._id}</td>
                                                <td>{item.name}</td>
                                                <td>{item.createdAt}</td>
                                                <td> {item.group_category}</td>
                                                <td >
                                                   
                                                    <i className="fa fa-eye fa-lg mt-4"   onClick={(e) => this.showModal(item._id)}  ></i><span>{'  '} </span>
                                                    <i className="fa fa-trash fa-lg mt-4" onClick={(e) => this.deleteModal(item._id)}></i>
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
export default CustomerGroup;
