import React, { Component } from "react";
import {
  Row, Badge,
  Col, Table,
  Button, Pagination,
  ButtonDropdown, PaginationItem,
  DropdownToggle, PaginationLink,
  DropdownMenu,
  DropdownItem, InputGroupText,
  Card,
  CardHeader,
  CardFooter,
  CardBlock,
  CardBody,
  Form,
  FormGroup,
  FormText,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupButton
} from "reactstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
// import ImagePreview from 'react-image-preview';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import './../product.css';
import SkyLight, { SkyLightStateless } from 'react-skylight';
import Env from '../../../environment/environment';
// var Base_url = Env.url + '/'+ Env.token;

var attribute = [];

function hashCode(str) {
  return str.split('').reduce((prevHash, currVal) =>
    (((prevHash << 5) - prevHash) + currVal.charCodeAt(0)) | 0, 0);
}

class EditProduct extends Component {
  constructor(props) {
    super(props);
    this.categoryData = [];
    this.attribute_val = {}
    this.data = {};
    this.state = {
      startDate: moment(),
      endDate: moment(),
      expectedDate: moment(),
      selectedImage: true,
      image: [],
      attribute: '',
      show_attr_modal: true,
      show_attr_del_modal: true,
      category:[]
    };

    this.setState({ attr: true })
    this.handleChangeStartDate = this.handleChangeStartDate.bind(this);
    this.handleChangeEndDate = this.handleChangeEndDate.bind(this);
    this.handleChangeExpectedDate = this.handleChangeExpectedDate.bind(this);
    this.getCategory = this.getCategory.bind(this);
    this.getCategory();

  }


  getCategory(){
    axios.get(Env.url+'/yinn/product/category/get').then(response =>{
      this.setState({category : response.data});
    })
  }

  getSubcategory(id){
    axios.get(Env.url+'/yinn/product/subcategory/get/'+id).then(response =>{

    });
  }

  handleChangeStartDate(date) {
    this.setState({
      startDate: date
    });
  }

  handleChangeEndDate(date) {
    this.setState({
      endDate: date
    });
  }

  handleChangeExpectedDate(date) {
    this.setState({
      expectedDate: date
    });
  }

  _handleSubmit(e) {
    e.preventDefault();
  }

  _handleImageChange(e) {
    e.preventDefault();
    let reader = new FileReader();
    // console.log(e.target.files[0])
    // console.log(e.target.files[1])
    for (var i in e.target.files) {
      let file = e.target.files[i];

      if (file) {
        if (file.type == "image/png" || file.type == "image/jpeg" || file.type == "image/jpg") {
          this.setState({ selectedImage: false })
          reader.onloadend = () => {
            this.setState({ image: [...this.state.image, ...reader.result] });
            console.log(this.state)
          }
          reader.readAsDataURL(file);
        } else {
          console.log("file not present---------------------")
        }
      }
    }
  }



  handleName(evt) {
    this.data["name"] = evt.target.value;
  }

  handleSpecification(evt) {
    this.data["Specification"] = evt.target.value;
  }

  handleCategory(evt) {
    this.data["category"] = { "name": 'electronic' };
  }

  handleManufacturer(evt) {
    this.data["manufacture_by"] = evt.target.value;
  }

  handlePricing(evt) {
    this.data["regular_price"] = evt.target.value;
  }

  handleSalesPrice(evt) {
    this.data["sales_price"] = evt.target.value;
  }

  handleCost(evt) {
    this.data["cost"] = evt.target.value;
  }

  handleInventoryName(evt) {
    this.data["inventory_name"] = evt.target.value;
  }

  handleQuantity(evt) {
    this.data["stock_quantity"] = evt.target.value;
  }

  handleWeight(evt) {
    this.data["unit_weight"] = evt.target.value;
  }

  handleDescription(evt) {
    this.data["description"] = evt.target.value;
  }

  handleTotalQuantityCost(evt) {
    this.data["total_quantity_cost"] = evt.target.value;
  }


  handleTotalUnitWeight(evt) {
    this.data["total_unit_weight"] = evt.target.value;
  }

  handleWidth(evt) {
    this.data["width"] = evt.target.value;
  }

  handleDepth(evt) {
    this.data["depth"] = evt.target.value;
  }

  handleHeight(evt) {
    this.data["height"] = evt.target.value;
  }

  handleGirth(evt) {
    this.data["girth"] = evt.target.value;
  }

  handleShippingCharges(evt) {
    this.data["shipping_charges"] = evt.target.value;
  }

  save() {
    // this.data["category"] = {"name" : 'electronic'};
    axios.post(Env.url + '/yinn/product/create', this.data).then(function (response) {
      window.location = "#/product";
      // if(response.status === 200){	 
      //   this.setState({ success: false });   	
      //   }
    })
  }

  addAttribute() {
    this.state.attribute_title = "Add Attribute"
    this.setState({ attribute_name: '' })
    this.setState({ attribute_value: '' })
    this.setState({ show_attr_del_modal: true })
    this.setState({ show_attr_modal: false })
    this.simpleDialog.show()
  }

  attributeName(evt) {
    this.setState({ attribute_name: evt.target.value })
  }
  attributeValue(evt) {
    this.setState({ attribute_value: evt.target.value })
  }

  attributeSave() {
    var id = hashCode(this.state.attribute_name)
    attribute.push({ 'name': this.state.attribute_name, 'value': this.state.attribute_value })
    this.setState({ attribute: attribute })
    this.simpleDialog.hide()
  }

  deleteAttibute(index) {
    this.setState({ delete_attr_index: index })
    this.state.attribute_title = "Are you sure you want to delete this Product ?"
    this.setState({ show_attr_del_modal: false })
    this.setState({ show_attr_modal: true })
    this.simpleDialog.show()
  }

  deleteAttribute_val() {
    var array = [...this.state.attribute];
    array.splice(this.state.delete_attr_index, 1);
    attribute = array
    this.setState({ attribute: attribute });
    this.simpleDialog.hide()
  }

  render() {

    var myBigGreenDialog = {
      width: '40%',
      minHeight: '20%',
    };

    // let $imagePreview = null;
    return (
      <div className="animated fadeIn">
        <SkyLight dialogStyles={myBigGreenDialog} hideOnOverlayClicked ref={ref => this.simpleDialog = ref} title={<p style={{ display: 'flex', justifyContent: 'center' }}>
          <b><h4>{this.state.attribute_title}</h4></b></p>}>

          <div hidden={this.state.show_attr_modal}>
            <FormGroup >
              <Label > Attribute Name</Label>
              <div className="controls">
                <InputGroup className="input-prepend">
                  <InputGroupAddon addonType="prepend">
                  </InputGroupAddon>
                  <Input placeholder="Attribute Name" value={this.state.attribute_name} onChange={this.attributeName.bind(this)} size="16" type="text" />
                </InputGroup>
              </div>
            </FormGroup>

            <FormGroup>
              <Label> Attribute Value</Label>
              <div className="controls">
                <InputGroup className="input-prepend">
                  <InputGroupAddon addonType="prepend">
                  </InputGroupAddon>
                  <Input placeholder="Attribute Value" value={this.state.attribute_value} onChange={this.attributeValue.bind(this)} size="16" type="textarea" />
                </InputGroup>
              </div>
            </FormGroup>
            <Row style={{ display: 'flex', justifyContent: 'center' }}>
              <Button type="submit" onClick={this.attributeSave.bind(this)} size="md" color="warning"> Save  </Button>
              <Col xs="12" sm="1"></Col>
              <Button type="submit" size="md" onClick={() => this.simpleDialog.hide()} color="danger"> Cancel </Button>
            </Row>
          </div>
          <div hidden={this.state.show_attr_del_modal}>
            <Row style={{ display: 'flex', justifyContent: 'center' }}>
              <Button type="submit" onClick={this.deleteAttribute_val.bind(this)} size="md" color="warning"> Yes  </Button>
              <Col xs="12" sm="1"></Col>
              <Button type="submit" size="md" onClick={() => this.simpleDialog.hide()} color="danger"> No </Button>
            </Row>
          </div>
        </SkyLight>

        <Row>
          <Col xs="12">
            <Card>
              <CardHeader>
                <b>General</b>
              </CardHeader>
              <CardBody className="card-body">
                <Row>
                  <Col xs="12" sm="7">
                    <Form className="form-horizontal">
                      <FormGroup>
                        <Label htmlFor="prependedInput">Product Name</Label>
                        <div className="controls">
                          <InputGroup className="input-prepend">
                            <InputGroupAddon>
                            </InputGroupAddon>
                            <Input onChange={this.handleName.bind(this)} size="16" type="text" placeholder="Product name" />
                          </InputGroup>
                          {/* <p className="help-block">Here's some help text</p> */}
                        </div>
                      </FormGroup>
                      <FormGroup>
                        <Label htmlFor="appendedInput">Product Specification</Label>
                        <div className="controls">
                          <InputGroup>
                            <Input type="textarea" onChange={this.handleSpecification.bind(this)} name="textarea-input" id="textarea-input" rows="5"
                              placeholder="Content" />
                          </InputGroup>
                          {/* <span className="help-block">Here's more help text</span> */}
                        </div>
                      </FormGroup>


                      <FormGroup >
                        <Label htmlFor="appendedInput">Manufacturer</Label>
                        <div className="controls">
                          <InputGroup className="input-prepend">
                            <Input id="appendedPrependedInput" placeholder="Manufacturer By" onChange={this.handleManufacturer.bind(this)} size="16" type="text" />
                          </InputGroup>
                        </div>
                      </FormGroup>
                    </Form>
                  </Col>
                  <Col xs="12" sm="5">
                    <Card>
                      <CardBody className="card-body">
                        <Form action="" method="post">
                          <FormGroup style={{ display: 'flex', justifyContent: 'center' }}>
                            <img hidden={this.state.selectedImage} src={this.state.image} width="200" height="200" />
                          </FormGroup>
                          <FormGroup style={{ display: 'flex', justifyContent: 'center' }}>
                            <form onSubmit={(e) => this._handleSubmit(e)}>
                              <input type="file" placeholder="Choose Image file" onChange={(e) => this._handleImageChange(e)} multiple />
                              {/* <div>
                                  {$imagePreview}
                                </div> */}
                            </form>
                          </FormGroup>
                        </Form>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>

                <Row>
                <Col xs="12" sm="12">

                    <Card>
                      <CardHeader>
                            <b>Choose Category</b>
                      </CardHeader>
                      <CardBody className="card-body">
                      <FormGroup>                        
                          {this.state.category.length > 0 ? this.state.category.map((item, index) => (



                            <div>
                <div className="dd-wrapper">
                  <div className="dd-header">
                    <div className="dd-header-title"></div>
                  </div>
                  <ul className="dd-list">
                    <li className="dd-list-item">fsadfsa</li>
                    <li className="dd-list-item"></li>
                    <li className="dd-list-item"></li>
                  </ul>
                </div>

                                <Row>                               
                                  <div className="col-8"  onClick={(e)=>this.getSubcategory(item._id)}>
                                      <Col xs="12" sm="8">
                                        <Input type="checkbox" />
                                        <Label> {item.name}</Label>
                                      </Col>
                                  </div>
                                </Row>
                            </div>
                        )) : 'No Category Found '}                        
                        </FormGroup>
                                

                      </CardBody>
                    </Card>



                </Col>
                  
                </Row>    

                <Row>
                  <Col xs="12" sm="12">
                    <Card>
                      <CardHeader><b>Product Details</b></CardHeader>
                      <CardBody className="card-body">
                        <Form action="" method="post" className="form-horizontal">


                          <Row>

                            <Col xs="12" sm="4">
                              <FormGroup>
                                <div className="controls">
                                  <InputGroup className="input-prepend">
                                    <Input placeholder="Regular Price" onChange={this.handlePricing.bind(this)} id="appendedPrependedInput" size="16" type="text" />
                                  </InputGroup>
                                </div>
                              </FormGroup>
                            </Col>
                            <Col xs="12" sm="4">
                              <FormGroup>
                                <div className="controls">
                                  <InputGroup className="input-prepend">
                                    <Input placeholder="Sales Price" onChange={this.handleSalesPrice.bind(this)} id="appendedPrependedInput" size="16" type="text" />
                                  </InputGroup>
                                </div>
                              </FormGroup>
                            </Col>
                            <Col xs="12" sm="4">
                              <FormGroup>
                                <div className="controls">
                                  <InputGroup className="input-prepend">
                                    <Input placeholder="Cost" onChange={this.handleCost.bind(this)} id="appendedPrependedInput" size="16" type="text" />
                                  </InputGroup>
                                </div>
                              </FormGroup>
                            </Col>
                            <Col xs="12" sm="4">
                              <FormGroup>
                                <div className="controls">
                                  <InputGroup className="input-prepend">
                                    <Input placeholder="Width" onChange={this.handleWidth.bind(this)} id="appendedPrependedInput" size="16" type="text" />
                                  </InputGroup>
                                </div>
                              </FormGroup>
                            </Col>

                            <Col xs="12" sm="4">
                              <FormGroup>
                                <div className="controls">
                                  <InputGroup className="input-prepend">
                                    <Input placeholder="Depth" onChange={this.handleDepth.bind(this)} id="appendedPrependedInput" size="16" type="text" />
                                  </InputGroup>
                                </div>
                              </FormGroup>
                            </Col>

                            <Col xs="12" sm="4">
                              <FormGroup>
                                <div className="controls">
                                  <InputGroup className="input-prepend">
                                    <Input placeholder="Height" onChange={this.handleHeight.bind(this)} id="appendedPrependedInput" size="16" type="text" />
                                  </InputGroup>
                                </div>
                              </FormGroup>
                            </Col>
                            <Col xs="12" sm="4">
                              <FormGroup>
                                <div className="controls">
                                  <InputGroup className="input-prepend">
                                    <Input placeholder="Girth" onChange={this.handleGirth.bind(this)} id="appendedPrependedInput" size="16" type="text" />
                                  </InputGroup>
                                </div>
                              </FormGroup>
                            </Col>
                          </Row>
                          <FormGroup>
                            <Row>

                              <Col xs="12" sm="4">
                                <Card>
                                  <CardHeader>Dimension Units</CardHeader>
                                  <CardBody className="card-body">
                                    <Form action="" method="post" className="form-horizontal">
                                      <FormGroup>
                                        <Row style={{ display: 'flex', justifyContent: 'center' }}>
                                          <Col xs="12" sm="1"  >
                                            <InputGroup className="input-prepend">
                                              <Input className="form-check-input" type="radio" id="inline-radio1" name="inline-radios" value="no value selected" />
                                            </InputGroup>
                                          </Col>
                                          <Col xs="12" sm="8">
                                            <Label htmlFor="appendedPrependedInput"> No Value Selected</Label>
                                          </Col>
                                        </Row>
                                        <Row style={{ display: 'flex', justifyContent: 'center' }}>
                                          <Col xs="12" sm="1"  >
                                            <InputGroup className="input-prepend">
                                              <Input className="form-check-input" type="radio" id="inline-radio1" name="inline-radios" value="kilogram" />
                                            </InputGroup>
                                          </Col>
                                          <Col xs="12" sm="8">
                                            <Label htmlFor="appendedPrependedInput"> Centimeter</Label>
                                          </Col>
                                        </Row>
                                        <Row style={{ display: 'flex', justifyContent: 'center' }}>
                                          <Col xs="12" sm="1">
                                            <InputGroup className="input-prepend">
                                              <Input className="form-check-input" type="radio" id="inline-radio1" name="inline-radios" value="pound" />
                                            </InputGroup>
                                          </Col>
                                          <Col xs="12" sm="8">
                                            <Label htmlFor="appendedPrependedInput"> Feet</Label>
                                          </Col>
                                        </Row>
                                        <Row style={{ display: 'flex', justifyContent: 'center' }}>
                                          <Col xs="12" sm="1">
                                            <InputGroup className="input-prepend">
                                              <Input className="form-check-input" type="radio" id="inline-radio1" name="inline-radios" value="pound" />
                                            </InputGroup>
                                          </Col>
                                          <Col xs="12" sm="8">
                                            <Label htmlFor="appendedPrependedInput"> Inches</Label>
                                          </Col>
                                        </Row>
                                        <Row style={{ display: 'flex', justifyContent: 'center' }}>
                                          <Col xs="12" sm="1">
                                            <InputGroup className="input-prepend">
                                              <Input className="form-check-input" type="radio" id="inline-radio1" name="inline-radios" value="pound" />
                                            </InputGroup>
                                          </Col>
                                          <Col xs="12" sm="8">
                                            <Label htmlFor="appendedPrependedInput"> Meters</Label>
                                          </Col>
                                        </Row>
                                      </FormGroup>
                                    </Form>
                                  </CardBody>
                                </Card>
                              </Col>

                              <Col xs="12" sm="5">
                                <Card>
                                  <CardHeader>Weight Units</CardHeader>
                                  <CardBody className="card-body">
                                    <Form action="" method="post" className="form-horizontal">
                                      <FormGroup>
                                        <Row style={{ display: 'flex', justifyContent: 'center' }}>
                                          <Col xs="12" sm="1"  >
                                            <InputGroup className="input-prepend">
                                              <Input className="form-check-input" type="radio" id="inline-radio1" name="inline-radios" value="no value selected" />
                                            </InputGroup>
                                          </Col>
                                          <Col xs="12" sm="8">
                                            <Label htmlFor="appendedPrependedInput"> No Value Selected</Label>
                                          </Col>
                                        </Row>

                                        <Row style={{ display: 'flex', justifyContent: 'center' }}>
                                          <Col xs="12" sm="1"  >
                                            <InputGroup className="input-prepend">
                                              <Input className="form-check-input" type="radio" id="inline-radio1" name="inline-radios" value="kilogram" />
                                            </InputGroup>
                                          </Col>
                                          <Col xs="12" sm="8">
                                            <Label htmlFor="appendedPrependedInput"> Kilogram</Label>
                                          </Col>
                                        </Row>
                                        <Row style={{ display: 'flex', justifyContent: 'center' }}>
                                          <Col xs="12" sm="1">
                                            <InputGroup className="input-prepend">
                                              <Input className="form-check-input" type="radio" id="inline-radio1" name="inline-radios" value="pound" />
                                            </InputGroup>
                                          </Col>
                                          <Col xs="12" sm="8">
                                            <Label htmlFor="appendedPrependedInput"> Pound</Label>
                                          </Col>
                                        </Row>
                                      </FormGroup>
                                    </Form>
                                  </CardBody>
                                </Card>
                              </Col>

                            </Row>
                          </FormGroup>
                        </Form>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12" lg="12">
                    <Card>
                      <CardHeader>
                        <Row>
                          <Col xs="12" sm="11">
                            <b>Product Attribute</b>
                          </Col>
                          <Col xs="12" sm="1">
                            <Button type="submit" onClick={this.addAttribute.bind(this)} size="md" color="warning"> Add </Button>  <span> </span>
                          </Col>
                        </Row>
                      </CardHeader>
                      <CardBody className="card-body">
                        <Table hover bordered striped responsive size="sm">
                          <thead>
                            <tr className="header-color">
                              <th>id</th>
                              <th>Attribute Name</th>
                              <th>Attribute Value</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {attribute.length > 0 && attribute.map((item, index) => (
                              <tr>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.value}</td>
                                <td>
                                  <i onClick={this.deleteAttibute.bind(this, index)} className="fa fa-trash fa-lg mt-4"></i>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12" lg="12">
                    <Card>
                      <CardHeader>
                        <Row>
                          <Col xs="12" sm="11">
                            <b>Inventory</b>
                          </Col>
                        </Row>
                      </CardHeader>
                      <CardBody className="card-body">
                        <Row>
                          <Col xs="6" sm="4">
                            <FormGroup>

                              <div className="controls">
                                <InputGroup className="input-prepend">
                                  <Input placeholder="Name" onChange={this.handleInventoryName.bind(this)} id="appendedPrependedInput" size="16" type="text" />
                                </InputGroup>
                              </div>
                            </FormGroup>
                          </Col>
                          <Col xs="6" sm="4">
                            <FormGroup>
                              <div className="controls">
                                <InputGroup className="input-prepend">
                                  <Input placeholder="Stock Quantity" onChange={this.handleQuantity.bind(this)} id="appendedPrependedInput" size="16" type="text" />
                                </InputGroup>
                              </div>
                            </FormGroup>
                          </Col>
                          <Col xs="6" sm="4">
                            <FormGroup>
                              <div className="controls">
                                <InputGroup className="input-prepend">
                                  <Input placeholder="Unit Weight" onChange={this.handleWeight.bind(this)} id="appendedPrependedInput" size="16" type="text" />
                                </InputGroup>
                              </div>
                            </FormGroup>
                          </Col>

                          <Col xs="6" sm="4">
                            <FormGroup>
                              <div className="controls">
                                <InputGroup className="input-prepend">
                                  <Input placeholder="Description" onChange={this.handleDescription.bind(this)} id="appendedPrependedInput" size="16" type="text" />
                                </InputGroup>
                              </div>
                            </FormGroup>
                          </Col>

                          <Col xs="6" sm="4">
                            <FormGroup>
                              <div className="controls">
                                <InputGroup className="input-prepend">
                                  <Input placeholder="Total Quantity Cost" onChange={this.handleTotalQuantityCost.bind(this)} id="appendedPrependedInput" size="16" type="text" />
                                </InputGroup>
                              </div>
                            </FormGroup>
                          </Col>

                          <Col xs="6" sm="4">
                            <FormGroup>
                              <div className="controls">
                                <InputGroup className="input-prepend">
                                  <Input placeholder="Total Units Weight" onChange={this.handleTotalUnitWeight.bind(this)} id="appendedPrependedInput" size="16" type="text" />
                                </InputGroup>
                              </div>
                            </FormGroup>
                          </Col>

                          <Col xs="12" sm="6">
                            <Card>
                              <CardHeader>
                                Active Date Groups
                                  </CardHeader>
                              <CardBody className="card-body">
                                <Form action="" method="post" className="form-horizontal">
                                  <FormGroup>
                                    <Row>
                                      <Col xs="12" sm="4">
                                        <Label htmlFor="appendedPrependedInput"> Start Date</Label>
                                      </Col>
                                      <Col xs="12" sm="4">
                                        <div className="controls">
                                          <InputGroup className="input-prepend">
                                            <DatePicker
                                              selected={this.state.startDate}
                                              onChange={this.handleChangeStartDate}
                                            />
                                          </InputGroup>
                                        </div>
                                      </Col>
                                    </Row><br />
                                    <Row>
                                      <Col xs="12" sm="4">
                                        <Label htmlFor="appendedPrependedInput"> End Date</Label>
                                      </Col>
                                      <Col xs="12" sm="4">
                                        <div className="controls">
                                          <InputGroup className="input-prepend">
                                            <DatePicker
                                              selected={this.state.endDate}
                                              onChange={this.handleChangeEndDate}
                                            />
                                          </InputGroup>
                                        </div>
                                      </Col>
                                    </Row>
                                  </FormGroup>
                                </Form>
                              </CardBody>
                            </Card>
                          </Col>


                          <Col xs="6" sm="6">
                            <FormGroup>
                              <div className="controls">
                                <InputGroup className="input-prepend">
                                  <Input placeholder="Shipping Charges" onChange={this.handleShippingCharges.bind(this)} id="appendedPrependedInput" size="16" type="text" />
                                </InputGroup>
                              </div>
                            </FormGroup>
                          </Col>

                        </Row>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter className="p-2" >
                <Row style={{ display: 'flex', justifyContent: 'center' }}>
                  <Col xs="6" sm="2" >
                    <Button color="primary" className="btn btn-sm" onClick={this.save.bind(this)} block>Save</Button>
                  </Col>
                  <Col xs="6" sm="2">
                    <Button color="danger" className="btn btn-sm" block>Cancel</Button>
                  </Col>
                </Row>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default EditProduct;
