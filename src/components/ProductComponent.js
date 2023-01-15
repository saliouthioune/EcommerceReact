import React, { Component } from 'react'
import ProductService from '../services/ProductService'
import { Button } from 'reactstrap';
import './ProductList.css';
import img from '../assets/add.jpg';
import close from '../assets/close.jpg';
import order from '../assets/order.png';
class ProductComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            emaile:this.props.match.params.email,
            product:{
                image:'',
                name:'',
                price:'',
                productId:'',
                retrievedImage:'',
                email:''
            },
            products:[],
            customer:'',
            iscustomer:false,
            isdamin:false,
            isproduct:false,
            isproductdata:'',
            numberofOrder:''


        }
        this.gotoAddProduct = this.gotoAddProduct.bind(this);
        this.gotoCustomerList = this.gotoCustomerList.bind(this);
        this.gotoAddCommande = this.gotoAddCommande.bind(this);
        this.openMenuVertical=this.openMenuVertical.bind(this);
        this.closeMenuVertical=this.closeMenuVertical.bind(this);
        this.addOrder=this.addOrder.bind(this);
        this.trackorder=this.trackorder.bind(this);
        this.closeMenu=this.closeMenu.bind(this);
        this.openMenu=this.openMenu.bind(this);
        this.gotoListOrder=this.gotoListOrder.bind(this);
        this.Admin=this.Admin.bind(this);
        this.changeHandler=this.changeHandler.bind(this);
        this.getProductById=this.getProductById.bind(this);
        this.gotoAddCategory=this.gotoAddCategory.bind(this);

    }
     componentDidMount(){
        this.getAllProduct();
        this.getCustomerByEmail();
        this.getProductById();
        this. getnumberOfOrder();
    }
    getCustomerByEmail() {
       ProductService.getCustomerByEmail(this.state.emaile).then((res) => {
        let customer=res.data;
      this.setState({customer:customer,iscustomer:true,isdamin:true});
        });
    }
    getnumberOfOrder(){
      ProductService.getOrderofCustomer(this.state.emaile).then((res)=>{
        let nbrorder=res.data;
        this.setState({numberofOrder:nbrorder});
      });
    }
    addOrder(customerId,productId){
     ProductService.createOrder(customerId,productId).subscribe(res=>{
      console.log(res);
      alert("Ok order added successful");
     });
    }
getAllProduct() {
       ProductService.getAllProduct().then((res) => {
        let products=res.data;
      this.setState({products:products});
        });
    }
    deleteProduct(productId) {
        if (window.confirm('Etes vous sur de vouloir supprimer ce produit')) {
            ProductService.deleteProduct(productId).then(
                data => {
                    console.log(data);
                    this.getAllProduct();
                }).catch(error => {
                    console.log(error);
                })
        }
    }
     openMenu() {
    document.getElementById("sidenav").style.width="250px";
  }
  closeMenu() {
      document.getElementById("sidenav").style.width="0";
  }
    gotoAddProduct() {
        this.props.history.push('/addproduct')
    }
    Admin() {
        this.props.history.push('/admin')
    }
    getProductById(){
        ProductService.getProductById(this.state.productId).then(res =>{
            let pp=res.data;
            this.setState({isproductdata:pp});
            this.state.isproduct=true;
            console.log(res);
        })
    }
    gotoAddCommande() {
        this.props.history.push('/addcommande')
    }
    gotoAddCategory() {
        this.props.history.push('/addcategory')
    }
    gotoCustomerList() {
        this.props.history.push('/customers')
    }
     gotoListOrder(adminId) {
        this.props.history.push('/orders/'+adminId)
    }
    editProduct(productId) {
        this.props.history.push('/editproduct/'+productId)
    }
    trackorder(customerId) {
        this.props.history.push('/trackorder/'+customerId)
     }
    openMenuVertical(){
    document.getElementById("menu-verticale").style.width="250px";
     }
   closeMenuVertical(){
    document.getElementById("menu-verticale").style.width="0";
    }
    changeHandler = (event) => {
        this.setState({ [event.target.name]: event.target.value });
}
    render() {
        return (
<div className="container-fluid">
  {this.state.isproduct?<p>{this.state.isproductdata['name']}</p>:""}

{ this.state.iscustomer&&this.state.customer.role=='customer'?
 <div class="sidenav" id="sidenav">
   <a  class="closebtn" onClick={() =>this.closeMenu()}>
     <img src={close} style={{width:'30px',height:'20px'}}/>
   </a>
   <ul>
     <li><a onClick={()=>this.trackorder(this.state.customer.customerId)}>Trackorder</a></li>
      <li><a>New Commande</a></li>
      <li>{this.state.iscustomer&&this.state.customer.role=='customer'?<li><a>{this.state.numberofOrder} Commandes placées</a></li>:""}</li>
   </ul>
  </div>:""}
{ this.state.iscustomer&&this.state.customer.role=='customer'?<span class="hamburger" id="hamburger" onClick={() =>this.openMenu()}>
   <img  src={order} style={{width:'80px',height:'80px'}}/>
 </span>:""}
             <div className='menu-hori'>
                    <ul>
                    {this.state.iscustomer&&this.state.customer.role=='customer'?<li><a>Acceuil</a></li>:""}
                        {this.state.isdamin&&this.state.customer.role=='admin'?<li><a>Contact</a></li>:""}
                        {this.state.isdamin&&this.state.customer.role=='admin'?<li><a>About</a></li>:""}
                        <li><a onClick={()=>this.trackorder(this.state.customer.customerId)}>Trackorder</a></li>
        <li><input type="number" name="productId" placeholder="Enter number"  onChange={this.changeHandler}/><i onClick={() => this.getProductById()} className="fa fa-search"></i></li>
                    </ul>
                </div>
                <div className="sectionmvt">
                   {this.state.isdamin&&this.state.customer.role=='admin'?<div className="menu-verticale" id="menu-verticale">
                     <a  class="closebtnv" onClick={() => this.closeMenuVertical()}>x</a>
                        <ul>
                        <li><a>{this.state.customer.role}</a></li>
                           <li><a>{this.state.emaile}</a></li>
                            <li>{this.state.isdamin&&this.state.customer.role=='admin'?<a onClick={() => this.gotoAddProduct()}><img src={img} style={{ width: '50px',height:'50px',cursor:'pointer'}}/>Add Product</a>:""}</li>
                            <li> {this.state.isdamin&&this.state.customer.role=='admin'?<a onClick={() => this.gotoCustomerList()}>Customer List</a>:""}</li>
                            <li> {this.state.isdamin&&this.state.customer.role=='admin'?<a onClick={() => this.gotoAddCommande()}> Add Commande</a>:""}</li>
                             <li><a onClick={()=>this.gotoListOrder(this.state.customer.customerId)}>Liste Order</a></li>
                             <li><a onClick={()=>this.gotoAddCategory()}>Add Category</a></li>
                             {this.state.isdamin&&this.state.customer.role=='admin'?<li><a onClick={()=>this.Admin()}>Admin</a></li>:""}
                        </ul>
                    </div>:""}
                    {this.state.isdamin&&this.state.customer.role=='admin'?<a class="hamburgerv" id="hamburgerv" onClick={() =>this.openMenuVertical()}>☰</a>:""}  
                    <div className="tab">
                        <h2 className="text-center">Products List</h2>
                        <div className="container-fluid row">
                                {
                                    this.state.products.map(
                                        pro =>
                                        <div className="col-md-3">
                                          <div class="card" style={{ marginTop: "5px" }} key={pro.productId}>
                                            <img src={"data:image/jpeg;base64,"+pro.image} style={{ width: '200px',height:'200px' }}/>
                                            <p><strong>{pro.name}: {pro.price}fcfa</strong></p>
                                            <p>{pro.status}</p>
                                            {this.state.isdamin&&this.state.customer.role=='admin'?<p><strong>
                                     <i style={{ marginLeft: "10px" ,color:"red"}} onClick={() => this.deleteProduct(pro.productId)} className="fa fa-trash"></i>
                                               </strong>
                                            </p>:""}
                                            <p>
                                            {this.state.isdamin&&this.state.customer.role=='admin'?<strong>
                                               <i  onClick={() => this.editProduct(pro.productId)} className="fa fa-pencil"></i>
                                               </strong>:""}
                                               <strong>
                                               <Button className="btn btn-info" disabled={pro.status=='desactiver'} onClick={() => this.addOrder(this.state.customer.customerId,pro.productId)} >Commander</Button>
                                               </strong>
                                            </p>
                                          </div>
                                        </div>
                                    )
                                }
                       
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default ProductComponent
