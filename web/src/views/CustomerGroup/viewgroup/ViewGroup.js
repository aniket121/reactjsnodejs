import React, { Component } from 'react';
import {
    Button, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row, CardHeader,
    Badge, Nav, NavItem, NavLink, TabContent, TabPane, Card, CardBody, Form, FormGroup, Label, Table,
} from 'reactstrap';
import axios from 'axios';
import classnames from 'classnames';
import Env from '../../../environment/environment';
import cookie from 'react-cookies';
import './viewgroup.css'
import FileUpLoad from './FileUpLoad';
import SkyLight, { SkyLightStateless } from 'react-skylight';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



class ViewGroup extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            items: [],
            activeTab: '1',
            selectedImage: true,
            image: [],
            folders: [],

        };
        this.handleClick = this.handleClick.bind(this);
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab,
            });
        }
    }

    componentDidMount() {
        axios.get(Env.url + '/yinn/group/get/' + cookie.load('group_id'))
            .then(res => {
                const items = res.data;
                this.setState({ items });
            })
    }

    getFolders() {
        this.toggle('2');
        axios.get(Env.url + '/yinn/viewgroup/folder/get/' + cookie.load('group_id')).then(res => {
            this.setState({ 'folders': res.data })
            console.log(this.state.folders, '-----------folder---------')
        })

    }


    handleClick(e) {
        this.refs.fileUploader.click();
    }

    _handleSubmit(e) {
        e.preventDefault();
    }

    createFolder() {
        this.simpleDialog.show()
    }

    folderName(evt) {
        this.setState({ name: evt.target.value });
    }

    saveFolder() {
        var data = { name: this.state.name, user_id: cookie.load('_id', { path: '/' }), group_id: cookie.load('group_id', { path: '/' }) }
        axios.post(Env.url + '/yinn/viewgroup/folder/create', data).then(function (response) {
            console.log(response.status)
            console.log(response.data)
            if (response.status == 200) {
                toast.success('Folder Created Sucessfully', {
                    position: toast.POSITION.TOP_RIGHT
                });
                this.getFolders();
                this.simpleDialog.hide()
            }
        }.bind(this)).catch(err => {
            toast.error('Failed to create new Folder', {
                position: toast.POSITION.TOP_CENTER
            });
        })
    }

    showModal() {
        // cookie.save('group_id', id, { path: '/' })
        window.location = "#/customergroup/viewgroup/upload";
    }

    render() {
        var myBigGreenDialog = {
            width: '40%',
            minHeight: '20%',
        };
        return (
            <div className="animated fadeIn">
                <ToastContainer autoClose={1500} />
                <SkyLight hideOnOverlayClicked dialogStyles={myBigGreenDialog} ref={ref => this.simpleDialog = ref} title={<p style={{ display: 'flex', justifyContent: 'center' }}>
                    <b><h3>Create New Folder</h3></b></p>}>
                    <div hidden={this.state.show_cat_modal}>
                        <FormGroup>
                            <Label htmlFor="appendedInput">Folder Name</Label>
                            <div className="controls">
                                <InputGroup>
                                    <Input type="test" value={this.state.name} onChange={this.folderName.bind(this)} />
                                </InputGroup>
                            </div>
                        </FormGroup>

                        <Row style={{ display: 'flex', justifyContent: 'center' }}>
                            <Button type="submit" onClick={this.saveFolder.bind(this)} size="md" color="primary"> Save  </Button>
                            <Col xs="12" sm="1"></Col>
                            <Button type="submit" size="md" onClick={() => this.simpleDialog.hide()} color="danger"> Cancel </Button>
                        </Row>
                    </div>
                </SkyLight>
                <Row>
                    <Col xs="12" md="12" className="mb-4">
                        <Nav tabs>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: this.state.activeTab === '1' })}
                                    onClick={() => { this.toggle('1'); }}
                                >
                                    *Home
                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: this.state.activeTab === '2' })}
                                    onClick={() => { this.getFolders() }}
                                >
                                    Folders
                </NavLink>
                            </NavItem>


                        </Nav>
                        <TabContent activeTab={this.state.activeTab}>
                            <TabPane tabId="1">
                                <Row>
                                    <Col sm="12">
                                        <Card>
                                            <CardHeader>
                                                <b><i> {this.state.items.name}</i> </b>
                                            </CardHeader>
                                            <CardBody className="card-body">
                                                <Row>
                                                    <Label htmlFor="appendedPrependedInput"><b> *Group Information</b></Label>
                                                </Row>


                                                <div className="row">
                                                    <section className="col-md-6">
                                                        <Label htmlFor="appendedPrependedInput"><b> Group Founded</b></Label><br />
                                                        {this.state.items.createdAt}
                                                    </section>

                                                    <section className="col-md-6">
                                                        <Label htmlFor="appendedPrependedInput"><b> Founder</b></Label><br />
                                                        {this.state.items.founder}
                                                    </section>
                                                </div><br />

                                                <div className="row">
                                                    <section className="col-md-6">
                                                        <Label htmlFor="appendedPrependedInput"><b> Location</b></Label><br />
                                                        {this.state.items.location}
                                                    </section>

                                                    <section className="col-md-6">
                                                        <Label htmlFor="appendedPrependedInput"><b> Group Category</b></Label><br />
                                                        {this.state.items.group_category}
                                                    </section>
                                                </div><br />

                                                <Row>
                                                    <div>
                                                        <Col md="12">
                                                            <Label htmlFor="appendedPrependedInput"><b> About Us</b></Label><br />

                                                            {this.state.items.about_us}
                                                        </Col>
                                                    </div>
                                                </Row><br />

                                                <Card>
                                                    <CardBody className="card-body">
                                                        <Row>
                                                            <Col xs="12" sm="4">
                                                                <div className="controls">
                                                                    <InputGroup className="input-prepend">
                                                                        <img src="./../assets/img/folder1.png" alt="folder1.png" height="100px" width="100px" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                                    <img src="./../assets/img/folder.jpeg" alt="folder.jpeg" height="100px" width="100px" />
                                                                        <input type="file" id="file" ref="fileUploader" style={{ display: "none" }} />
                                                                    </InputGroup>
                                                                </div>
                                                            </Col>
                                                        </Row><br />
                                                        <Row>
                                                            <Col xs="12" sm="4">
                                                                <div className="controls">
                                                                    <InputGroup className="input-prepend">
                                                                        <Label htmlFor="appendedPrependedInput">&nbsp;&nbsp;<b> Music</b></Label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                                    <Label htmlFor="appendedPrependedInput"><b> features</b></Label><br />
                                                                    </InputGroup>
                                                                </div>
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
                                </Row>
                            </TabPane>
                            <TabPane tabId="2">
                                <Card>
                                    <CardHeader>
                                        <Row>
                                            <Col xs="12" sm="10"> </Col>
                                            <Col xs="12" sm="2">
                                                <Button type="submit" size="md" onClick={(e) => this.createFolder()} color="warning" raised> <b>new folder</b> </Button>
                                            </Col>
                                        </Row>
                                    </CardHeader>
                                    <CardBody className="card-body">
                                        <Row>
                                            {this.state.folders.length > 0 ? this.state.folders.map((da, i) => (
                                                <Col xs="12" sm="2">
                                                    <div className="controls">
                                                        <InputGroup className="input-prepend">
                                                            <img src="./../assets/img/folder1.png" alt="folder1.png" height="100px" width="100px" onClick={(e) => this.showModal()} />
                                                        </InputGroup>
                                                    </div>
                                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                        {da.name}
                                                    </div>
                                                </Col>
                                            )) : 'No Category Found '}
                                        </Row><br />

                                    </CardBody>
                                </Card>
                            </TabPane>
                        </TabContent>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default ViewGroup;
