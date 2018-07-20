import React, {Component} from "react";
import {  Row,  Col, Table, Button,Label, FormGroup,InputGroup,Input, Card,  CardHeader,  CardFooter,  CardBody} from "reactstrap";
import axios from 'axios';
import './category.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SkyLight, {SkyLightStateless} from 'react-skylight';
import Env from '../../../environment/environment';
var Base_url = Env.url + '/'+ Env.token;

// http://marcio.github.io/react-skylight/


var myBigGreenDialog = {};

class AddCategory extends Component {
  constructor(props) {
    super(props);
    this.data = {};
    
    this.state = { category : [],
                   element  : [],
                   prev_id  : '',
                   show_cat_modal : false,
                   show_delete_modal : true,
    };
    this.getCategory = this.getCategory.bind(this);
    this.getCategory();   
  }

  getCategory(){
    axios.get(Env.url+'/yinn/product/category/get').then(response =>{
      this.setState({category : response.data});
    })
  }

  forceUpdate(item, category=null){
    if(category)
     this.state.element = []
    axios.get(Env.url+'/yinn/product/subcategory/get/'+item._id).then(response =>{
      this.setState({status :  true})
      var count = [1]
      if(response.data.length > 0) {     
            this.setState({ element: [...this.state.element, ...count.map((el, i) =>          
              <Card>
                  <CardHeader>
                    <b>Sub Category</b>
                  </CardHeader>
                  <CardBody className="card-body">
                          <FormGroup>
                              {response.data ? response.data.map((it, index) => (
                                <div>
                                    <Row>
                                      <div className="col-8"  onClick={(e)=>this.forceUpdate(it)}>
                                          <Col xs="12" sm="8">
                                              <Label htmlFor="appendedPrependedInput"> {it.name}</Label>
                                          </Col>
                                      </div>
                                      <Col xs="12" sm="4">
                                          <i className="fa fa-plus" onClick={(e)=>this.showSubCategoryModal(it,'subcategory')} ></i>{ " " } 
                                          <i  className="fa fa-edit" onClick={(e)=>this.editSubCategoryModal(it)} ></i>{ " " }
                                          <i  className="fa fa-trash" onClick={(e)=>this.deleteSubCategory(it)}></i>{ " "}
                                      </Col>
                                    </Row>
                                    <hr />
                                </div>
                            )) : ' '} 

                          </FormGroup>
                  </CardBody>
              </Card>
          )] });}else{
          toast.error("No Subcategory Available.", {
            position: toast.POSITION.TOP_CENTER
          });
        }
    })
  }


  showCategoryModal(){
    myBigGreenDialog = {};
    this.setState({name : ''})
    this.setState({description : ''})
    this.setState({currentId : 0})
    this.setState({current_state : 0})
    this.state.addSubCategorytitle = "Create New Category"
    this.setState({name_title : 'Category Name'})
    this.setState({description_title : 'Category Description'})
    this.setState({show_delete_modal : true})
    this.simpleDialog.show();
    
  }

  handleCategory(evt){
    this.setState({name : evt.target.value});   
  }
  handleCategoryDes(evt){
    this.setState({description : evt.target.value});
  }

  createCategory(){
    if(this.state.currentId && this.state.current_state === 'add_sub'){
      this.saveSubCategory()
    }else if(this.state.currentId && this.state.current_state === 'edit_cat'){
      this.editCategory()
    }else if(this.state.currentId && this.state.current_state === 'edit_sub'){
      this.editSubCategory()
    }else if(this.state.currentId == 0 && this.state.current_state === 0){
      this.saveCategory()
    }
  }

  saveCategory(){
    var data = {}
    data['name']        = this.state.name;
    data['description'] = this.state.description;
    axios.post(Env.url+'/yinn/product/category/create', data).then(function (response) {
      if(response.status === 200){
        toast.success(response.data, {
          position: toast.POSITION.TOP_RIGHT
        }); 
        this.getCategory();
        this.simpleDialog.hide()                                       
      }    
    }.bind(this)).catch(err =>{
      toast.error(err.response.data, {
        position: toast.POSITION.TOP_CENTER
      });
    })
  }

  editCategoryModal(data){
    myBigGreenDialog = {};
    this.setState({show_delete_modal : true})
    this.setState({name : data.name})
    this.setState({description : data.description})
    this.setState({currentId : data._id})
    this.setState({current_state : 'edit_cat'})
    this.state.addSubCategorytitle = "Edit Category"
    this.setState({name_title : 'Category Name'})
    this.setState({description_title : 'Category Description'})
    this.simpleDialog.show();
  }

  editCategory(){
    var data = {'name': this.state.name, 'description': this.state.description};
    axios.put(Env.url+'/yinn/product/category/update/'+this.state.currentId, data).then(function (response) {
      if(response.status === 200){
        toast.success(response.data, {
          position: toast.POSITION.TOP_RIGHT
        }); 
        this.getCategory();
        this.simpleDialog.hide()                                       
      }    
    }.bind(this)).catch(err =>{
      toast.error(err.response.data, {
        position: toast.POSITION.TOP_CENTER
      });
    })
  }

  showSubCategoryModal(item, type){
    myBigGreenDialog = {};
    this.setState({show_delete_modal : true})    
    this.setState({name : ''})
    this.setState({description : ''})
    this.setState({currentId : item._id})
    this.setState({current_state : 'add_sub'})
    this.state.addSubCategorytitle = "Create New SubCategroy"
    this.setState({name_title : 'SubCategory Name'})
    this.setState({description_title : 'SubCategory Description'})
    this.simpleDialog.show();
  }

  saveSubCategory(){
    var data = {}
    data['name']        = this.state.name;
    data['description'] = this.state.description;
    data['category_id'] = this.state.currentId;
    console.log(data,'-------------data---------')

    axios.post(Env.url+'/yinn/product/subcategory/create', data).then(function (response) {
      if(response.status === 200){
        toast.success(response.data, {
          position: toast.POSITION.TOP_RIGHT
        }); 
        this.getCategory();
        this.simpleDialog.hide()                                       
      }    
    }.bind(this)).catch(err =>{
      toast.error(err.response.data, {
        position: toast.POSITION.TOP_CENTER
      });
    })
  }

  editSubCategoryModal(data){
    myBigGreenDialog = {};
    this.setState({show_delete_modal : true})
    this.setState({name : data.name})
    this.setState({description : data.description})
    this.setState({currentId : data._id})
    this.setState({current_state : 'edit_sub'})
    this.state.addSubCategorytitle = "Edit SubCategory"
    this.setState({name_title : 'SubCategory Name'})
    this.setState({description_title : 'SubCategory Description'})
    this.simpleDialog.show();
  }

  editSubCategory(){
    var data = {'name': this.state.name, 'description': this.state.description};
    axios.put(Env.url+'/yinn/product/subcategory/update/'+this.state.currentId, data).then(function (response) {
      if(response.status === 200){
        toast.success(response.data, {
          position: toast.POSITION.TOP_RIGHT
        }); 
        window.location.reload();
        this.getCategory();
        this.simpleDialog.hide()                                       
      }    
    }.bind(this)).catch(err =>{
      toast.error(err.response.data, {
        position: toast.POSITION.TOP_CENTER
      });
    })
  }

  deleteCategory(id){
    myBigGreenDialog = {
      width: '40%',
      minHeight: '20%',     
    };
    this.setState({current_state : 'delete_cat'})
    this.setState({addSubCategorytitle : 'Do you want to delete Category'})
    this.setState({currentId : id})    
    this.setState({show_cat_modal : true})
    this.setState({show_delete_modal : false})
    this.simpleDialog.show()
  }

  deleteSubCategory(id){
  
    myBigGreenDialog = {
      width: '40%',
      minHeight: '20%',     
    };
    this.setState({currentId : id._id})
    this.setState({addSubCategorytitle : 'Do you want to delete SubCategory'})
    this.setState({current_state : 'delete_sub'})
    this.setState({show_cat_modal : true})
    this.setState({show_delete_modal : false})
    this.simpleDialog.show()
  }

  delete(){
    if(this.state.current_state == 'delete_cat')
        var url = Env.url+'/yinn/product/category/delete/'+this.state.currentId
    if(this.state.current_state == 'delete_sub')
        var url = Env.url+'/yinn/product/subcategory/delete/'+this.state.currentId
    axios.delete(url).then(response =>{
      this.getCategory()
      this.simpleDialog.hide()
      toast.success(response.data, {
        position: toast.POSITION.TOP_RIGHT
      });
      window.location.reload(); 
    })
  }


  render() {

    return (
      <div className="animated fadeIn">
        <ToastContainer  autoClose={1500} /> 
        <SkyLight dialogStyles={myBigGreenDialog} hideOnOverlayClicked ref={ref => this.simpleDialog = ref} title={<p style={{display: 'flex', justifyContent: 'center'}}>
            <b><h3>{this.state.addSubCategorytitle}</h3></b></p>}>            
            <div hidden={this.state.show_cat_modal}>
              <FormGroup>
                  <Label htmlFor="appendedInput">{this.state.name_title}</Label>
                  <div className="controls">
                    <InputGroup>
                    <Input type="test" value={this.state.name} onChange={this.handleCategory.bind(this)}
                        />
                    </InputGroup>
                  </div>
              </FormGroup>
              <FormGroup>
                  <Label htmlFor="appendedInput">{this.state.description_title}</Label>
                  <div className="controls">
                    <InputGroup>
                    <Input value={this.state.description} type="textarea"  onChange={this.handleCategoryDes.bind(this)} rows="5"
                        />
                    </InputGroup>
                  </div>
              </FormGroup>
              <Row style={{display: 'flex', justifyContent: 'center'}}>
                  <Button type="submit" onClick={this.createCategory.bind(this)}  size="md"  color="primary"> Save  </Button> 
                  <Col xs="12" sm="1"></Col>
                  <Button type="submit"  size="md"  onClick={() => this.simpleDialog.hide()}  color="danger"> Cancel </Button> 
              </Row>
        </div> 
        
        <Row hidden={this.state.show_delete_modal} style={{display: 'flex', justifyContent: 'center'}}>
                <Button type="submit" onClick={this.delete.bind(this)}  size="md"  color="warning"> Yes  </Button> 
                <Col xs="12" sm="1"></Col>
                <Button type="submit"  size="md"  onClick={() => this.simpleDialog.hide()}  color="danger"> No </Button> 
            </Row>          

        </SkyLight>

      <Row>
        <Col xs="12" sm="10">
        </Col>
        <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0" >
            <Button block color="warning" size="sm" onClick={(e)=>this.showCategoryModal()}><b>Add Category</b></Button>
        </Col>
      </Row><br/>
        <Row>
          <Col xs="12" sm="3">
            <Card>
                <CardHeader>
                  <b>Category</b>
                </CardHeader>
                <CardBody className="card-body">
                        <FormGroup>                        
                          {this.state.category.length > 0 ? this.state.category.map((item, index) => (
                            <div>
                                <Row>
                                  <div className="col-8"  onClick={(e)=>this.forceUpdate(item, 'category')}>
                                      <Col xs="12" sm="8">
                                          <Label htmlFor="appendedPrependedInput"> {item.name}</Label>
                                      </Col>
                                  </div>
                                  <Col xs="12" sm="4" >
                                      <i className="fa fa-plus" onClick={(e)=>this.showSubCategoryModal(item,'category')}></i>{ " " }
                                      <i  className="fa fa-edit" onClick={(e)=>this.editCategoryModal(item)}></i>{ " "}
                                      <i  className="fa fa-trash" onClick={(e)=>this.deleteCategory(item._id)}></i>{ " "}
                                  </Col>
                                </Row>
                                <hr />
                            </div>
                        )) : 'No Category Found '}                        
                        </FormGroup>
                </CardBody>
             </Card>
          </Col>
          {this.state.element.length > 0 ? this.state.element.map((item, index) => (
              <Col xs="12" sm="3">
                {item}
              </Col>
          )) : ' '}
        </Row>
      </div>
    )
  }
}

export default AddCategory;
