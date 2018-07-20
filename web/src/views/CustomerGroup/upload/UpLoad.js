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
    Form,
    FormGroup,
    FormText,
    Label,
    InputGroupButton, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, ButtonDropdown
} from "reactstrap";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SkyLight, { SkyLightStateless } from 'react-skylight';
import axios, { post } from 'axios';
import Env from '../../../environment/environment';
import './UpLoad.css';
import cookie from 'react-cookies';



var divStyle = {
    width: "500px",
    height: "30px"
};

class UpLoad extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null
        }
        this.onFormSubmit = this.onFormSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
        this.fileUpload = this.fileUpload.bind(this)
    }
    onFormSubmit(e) {
        e.preventDefault() // Stop form submit
        this.fileUpload(this.state.file).then((response) => {
            console.log(response.data);
        })
    }
    onChange(e) {
        this.setState({ file: e.target.files[0] })
    }
    fileUpload(file) {
        const url = 'http://localhost:4000/upload';
        const formData = new FormData();
        formData.append('file', file)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return post(url, formData, config)
    }

    render() {
        return (
            <div className="animated fadeIn">
                <ToastContainer autoClose={1500} />
                <Row>
                    <Col>
                        <Card>
                            <CardHeader>
                                <Row>
                                    <Col xs="12" sm="7"><b><i>*Gallery</i></b></Col>
                                    <Col xs="12" sm="5">
                                        {/* <FormGroup style={{display: 'flex', justifyContent: 'center'}}> 
                                            <form onSubmit={(e)=>this._handleSubmit(e)}>
                                                <input type="file" placeholder="Choose Image file" onChange={(e)=>this._handleImageChange(e)} multiple/>
                                            </form>                            
                                        </FormGroup> */}
                                        
                                        <form onSubmit={this.onFormSubmit}>
                                            <input type="file" onChange={this.onChange} />
                                            <button type="submit">Upload</button>
                                        </form>

                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody className="card-body">
                                <Row>

                                    <Col xs="12" sm="4">
                                        <div className="controls">
                                            <InputGroup className="input-prepend">
                                                <img src="./../assets/img/iphonex.jpg" alt="iphonex.jpg" height="500px" />

                                            </InputGroup>
                                        </div>

                                    </Col>
                                    <Col xs="12" sm="4">
                                        <div className="controls">
                                            <InputGroup className="input-prepend">
                                                <img src="./../assets/img/oneplus.jpg" alt="oneplus.jpg" width="400px" height="450px" />

                                            </InputGroup>
                                        </div>

                                    </Col>
                                </Row>

                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}
export default UpLoad;
