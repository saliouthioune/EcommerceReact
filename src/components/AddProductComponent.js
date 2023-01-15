import React, { Component } from 'react'
import ProductService from '../services/ProductService'
import './addProduct.css'
import axios from 'axios'
class AddProductComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
               catId:'',
                price: '',
                name: '',
                category:{
                    catId:'',
                    name:''
                },
                cats:[],
                selectedFile:'',
                imgURL:'',
                image:'',
                isUpload:false
        }
        
        this.changeHandler = this.changeHandler.bind(this);
        this.onFileChanged=this.onFileChanged.bind(this);
        this.addIProduct=this.addIProduct.bind(this);
        this.handlechange=this.handlechange.bind(this);
    }
    componentDidMount(){
        this.getAllCategory();
        
    }
    onFileChanged(event) {
    console.log(event);
    this.selectedFile = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event2) => {
      this.imgURL = reader.result;
      this.setState({isUpload: true});
    };
  }
  //-------
addIProduct= (e) =>{
    e.preventDefault();
  let product={ name:this.state.name,price:this.state.price,category:this.state.category.catId};
     const uploadData = new FormData();
      uploadData.append('imageFile', this.selectedFile, this.selectedFile.name);
      this.selectedFile.imageName = this.selectedFile.name;
        uploadData.append('imageFile', this.state.selectedFile);
      ProductService.upload(uploadData).then((response) => {
            ProductService.createProduct(product).then(
              (product) => {
                //this.bookAddedEvent.emit();
                //this.router.navigate(['admin', 'books']);
           alert("Product added successful");
           this.props.history.push('/productss');
              });
        });
      
}
changeHandler = (event) => {
        this.setState({ [event.target.name]: event.target.value });
}
 handlechange(event)
 {
   const name=event.target.name;
   const value=event.target.value;

   this.setState({category:{[name]:[value]}});
 } 
    getAllCategory(){
        ProductService.getAllCategory().then(res =>{
          this.setState({ cats: res.data });
        });
    }
    render() {
       const { name,price,catId}=this.state;
       const isUpload=this.state.isUpload;
       let image;
        return (
            <div className="container-fluid">
              <div className="row menu">
                <ul>
                  <li><a>Acceuil</a></li>
                  <li><a>Contact</a></li>
                  <li><a>About</a></li>
                </ul>
               </div>
            <div className="row">
                <div className="forms">
                   <form>
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" className="form-control"  name="name" placeholder='Enter the Name' onChange={this.changeHandler} />
                    </div>
                    <div className="form-group">
                        <label>Price</label>
                        <input type="number" className="form-control" name="price" placeholder='Enter the Price' onChange={this.changeHandler} />
                    </div>
                    <div className="form-group">
                        <label>Category:</label>
                        <select name="category" value={this.state.category.catId} onChange={this.handlechange} className="form-select">
                        {this.state.cats.map(c => <option value={c.catId} key={c.catId}>{c.name}</option>)}
                        </select>
                    </div>
                    <div className="form-group">
                        <input type="file" name="image" onChange={this.onFileChanged}/>
                         <img src={this.imgURL} mame="images" id="images" style={{ width: '200px',height:'200px',cursor:'pointer'}}/>
                     </div>
                    <div className="form-group btn">
                        <button class="btn btn-success" disabled={!this.imgURL||!price} onClick={this.addIProduct}>Save</button>
                    </div>

                </form>
                </div>
                <div className="container-text">
                   <p>Bonjour</p>
                </div>
            </div>
            </div>
           
        )
    }
}
export default AddProductComponent