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
    FormGroup,
    Label,
    InputGroupButton, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, ButtonDropdown
} from "reactstrap";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SkyLight, { SkyLightStateless } from 'react-skylight';
import axios from 'axios';
import Env from '../../../environment/environment';
import './AddGroup.css';
// import cookie from 'react-cookies';
// import { SSL_OP_NETSCAPE_DEMO_CIPHER_CHANGE_BUG } from 'constants';


var divStyle = {
    width: "500px",
    height: "30px"
};

class AddGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',    nameState: false,
            founder: '', founderState: false,
            about_us: '', aboutusState: false, 
            location: '',  locationState: false,
            group_category: '', groupcategoryState: false
        };
        this.location_data = ['North America', 'Central America', 'South America', 'Africa', 'Europe',
            'Middle East', 'Asia', 'South East Asia', 'Australia', 'Antartica'];

        this.category_data = ['Art Creation', 'Art Collection', 'Fan Club', 'Common Interest', 'Social',
            'Support And Cause', 'Yinn Art Related', 'Others'];
    }

    handleName(evt) {
        this.setState({ name: evt.target.value });
    }

    handleFounder(evt) {
        this.setState({ founder: evt.target.value });
    }

    handleAboutus(evt) {
        this.setState({ about_us: evt.target.value });

    }

    handleLocation(evt) {
        if (evt.target.value != 'Please choose location...') {
            this.setState({ location: evt.target.value });
        }
    }

    handleCategory(evt) {
        if (evt.target.value != 'Please choose category...') {
            this.setState({ group_category: evt.target.value });
        }
    }

    save(state) {
        console.log("before save", state)
        axios.post(Env.url + '/yinn/group/create', this.state).then(function (response) {
            if (response.status === 200) {
                toast.success(response.data, {
                    position: toast.POSITION.TOP_RIGHT
                });
                window.location = "#/customergroup";
            }
        });
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
                <Row>
                    <Col>
                        <Card>
                            <CardHeader>
                                <Row>
                                    <Col xs="12" sm="10">
                                        <b> Create A Group</b>
                                    </Col>
                                    <Col xs="12" sm="2">
                                        <Button type="submit" size="md" color="warning" onClick={this.save.bind(this)} block><b> Save </b></Button>  <span> </span>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody className="card-body">
                                <Row>
                                    <Col xs="12" sm="8">
                                        <span>
                                            *Groups is the latest creation from YINN. It's a brand new platform that allows you to:
                                     </span><br /><br />
                                        <span>
                                            1. Create your own art community within YINN.
                                     </span><br />
                                        <span>
                                            2. Find others that share the same interests.
                                     </span><br />
                                        <span>
                                            3. Build an organization with Retailers and members.
                                     </span><br />
                                    </Col>
                                </Row>
                                <hr /><br />
                                <Row>
                                    <Col xs="12" sm="6">
                                        <FormGroup>
                                            <Label htmlFor="prependedInput" >Group Name</Label>
                                            <InputGroup className="input-prepend">                                                <InputGroupAddon>
                                            </InputGroupAddon>
                                                <Input size="16" type="text" className="form-control is-valid" name={this.state.value} onChange={this.handleName.bind(this)} placeholder="Group name..." required />
                                            </InputGroup>
                                        </FormGroup>
                                    </Col>
                                </Row><br />
                                <Row>
                                    <Col xs="12" sm="6">
                                        <FormGroup>
                                            <Label htmlFor="prependedInput" >Group Founder</Label>
                                            <InputGroup className="input-prepend">                                                <InputGroupAddon>
                                            </InputGroupAddon>
                                                <Input size="16" type="text" className="form-control is-valid" founder={this.state.value} onChange={this.handleFounder.bind(this)} placeholder="Group founder..." required />
                                            </InputGroup>
                                        </FormGroup>
                                    </Col>
                                </Row><br />
                                <Row>
                                    <Col xs="12" sm="6">
                                        <FormGroup>
                                            <Label htmlFor="prependedInput" >About Us</Label>
                                            <InputGroup className="input-prepend">
                                                <InputGroupAddon>
                                                </InputGroupAddon>
                                                <Input type="textarea" className="form-control is-valid" about_us={this.state.value} onChange={this.handleAboutus.bind(this)} name="textarea-input" id="textarea-input" rows="5"
                                                    placeholder="About us..." required />
                                            </InputGroup>
                                        </FormGroup>
                                    </Col>
                                </Row><br />
                                <Row>
                                    <Col xs="12" sm="6">
                                        <FormGroup>
                                            <Label htmlFor="prependedInput">Location</Label>
                                            <InputGroup className="input-prepend">
                                                <InputGroupAddon>
                                                </InputGroupAddon>
                                                {/* <Input size="16" type="text" location={this.state.value} onChange={this.handleLocation.bind(this)} placeholder="Location..." /> */}
                                                <select required location={this.state.value} onChange={this.handleLocation.bind(this)} style={divStyle}>
                                                    <option disabled selected hidden>Please choose location...</option>
                                                    {this.location_data.map((i, index) => (
                                                        <option >{i}</option>
                                                    ))}
                                                </select>
                                            </InputGroup>
                                        </FormGroup>
                                    </Col>
                                </Row><br />
                                <Row>
                                    <Col xs="12" sm="6">
                                        <FormGroup>
                                            <Label htmlFor="prependedInput">Group Category</Label>
                                            <InputGroup className="input-prepend">                                                <InputGroupAddon>
                                            </InputGroupAddon>
                                                <select required group_category={this.state.value} onChange={this.handleCategory.bind(this)} style={divStyle}>
                                                    <option disabled selected hidden>Please choose category...</option>
                                                    {this.category_data.map((i, index) => (
                                                        <option >{i}</option>
                                                    ))}
                                                </select>
                                            </InputGroup>
                                        </FormGroup>
                                    </Col>
                                </Row><br />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}
export default AddGroup;
