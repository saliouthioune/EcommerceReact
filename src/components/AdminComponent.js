import React, { Component } from 'react'
import ProductService from '../services/ProductService'
import { Button } from 'reactstrap';
import './ProductList.css';
import img from '../assets/add.jpg';
import close from '../assets/close.jpg';
import order from '../assets/order.png';
class AdminComponent extends Component {
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
            isdamin:false

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

    }
     componentDidMount(){
        this.getAllProduct();
        this.getCustomerByEmail();
    }
    getCustomerByEmail() {
       ProductService.getCustomerByEmail(this.state.emaile).then((res) => {
        let customer=res.data;
      this.setState({customer:customer,iscustomer:true,isdamin:true});
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
    gotoAddCommande() {
        this.props.history.push('/addcommande')
    }
    gotoCustomerList() {
        this.props.history.push('/customers')
    }
     gotoListOrder() {
        this.props.history.push('/orders')
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
    render() {
        return (
<div className="container-fluid">
 <div class="sidenav" id="sidenav">
   <a  class="closebtn" onClick={() =>this.closeMenu()}>
     <img src={close} style={{width:'30px',height:'20px'}}/>
   </a>
   <ul>
     <li><a onClick={()=>this.trackorder(this.state.customer.customerId)}>Trackorder</a></li>
      <li><a>New Commande</a></li>
   </ul>
  </div>
 <span class="hamburger" id="hamburger" onClick={() =>this.openMenu()}>
   <img  src={order} style={{width:'80px',height:'80px'}}/>
 </span>
            <a>{this.state.emaile}</a>
            <a>{this.state.customer.role}</a>
                <div className='menu-hori'>
                    <ul>
                    {this.state.iscustomer&&this.state.customer.role=='customer'?<li><a>Acceuil</a></li>:""}
                        {this.state.isdamin&&this.state.customer.role=='admin'?<li><a>Contact</a></li>:""}
                        {this.state.isdamin&&this.state.customer.role=='admin'?<li><a>About</a></li>:""}
                        <li><a onClick={()=>this.trackorder(this.state.customer.customerId)}>Trackorder</a></li>
                        <li><i className="fa fa-user"></i></li>
                    </ul>
                </div>
                <div className="sectionmvt">
                    <div className="menu-verticale" id="menu-verticale">
                     <a  class="closebtnv" onClick={() => this.closeMenuVertical()}>x</a>
                        <ul>
                            <li><a>Acceuil</a></li>
                            <li><a>Contact</a></li>
                            <li><a>About</a></li>
                             <li><a onClick={()=>this.gotoListOrder()}>Liste Order</a></li>
                        </ul>
                    </div>
                    <a class="hamburgerv" id="hamburgerv" onClick={() =>this.openMenuVertical()}>☰</a>  
                    <div className="tab">
                        <h2 className="text-center">Products List</h2>
                        <button className="btn btn-danger" style={{ width: '100px' }} onClick={() => this.gotoCustomerList()}>Customer List</button>
                        <a onClick={() => this.gotoAddProduct()}><img src={img} style={{ width: '50px',height:'50px',cursor:'pointer'}}/>Add Product</a>
                        <button className="btn btn-danger" style={{ width: '100px' }} onClick={() => this.gotoAddCommande()}> Add Commande</button>
                        <br></br>
                        <div className="container-fluid row">
                                {
                                    this.state.products.map(
                                        pro =>
                                        <div className="col-md-3">
                                          <div class="card" style={{ marginTop: "5px" }} key={pro.productId}>
                                            <img src={"data:image/jpeg;base64,"+pro.image} style={{ width: '200px',height:'200px' }}/>
                                            <p><strong>{pro.name}: {pro.price}fcfa</strong></p>
                                            <p>{pro.status}</p>
                                            <p><strong>
                                                <i style={{ marginLeft: "10px" ,color:"red"}} onClick={() => this.deleteProduct(pro.productId)} className="fa fa-trash"></i>
                                               </strong>
                                            </p>
                                            <p><strong>
                                               <i  onClick={() => this.editProduct(pro.productId)} className="fa fa-pencil"></i>
                                               </strong>
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
export default AdminComponent
