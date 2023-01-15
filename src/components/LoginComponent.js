import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import ProductService from '../services/ProductService'
import { Button } from 'reactstrap';
import './Login.css';
import poster22 from '../assets/poster22.jpg'
import img1 from '../assets/profil.png'
class LoginComponent extends Component {
    constructor() {
        super()
        this.state = {
            products: [],
            email:'',
            password:'',
            isLoginSus:false,
            isLoginFail:false

        }
        this.openMenuVertical=this.openMenuVertical.bind(this);
        this.closeMenuVertical=this.closeMenuVertical.bind(this);
         this.gotoAddProduct = this.gotoAddProduct.bind(this);
        this.gotoCustomerList = this.gotoCustomerList.bind(this);
        this.gotoAddCommande = this.gotoAddCommande.bind(this);
        this.addCategory=this.addCategory.bind(this);
        this.gotoProductList=this.gotoProductList.bind(this);
        this.changeHandler=this.changeHandler.bind(this);
       this.onSubmit=this.onSubmit.bind(this);
       this.gotoInscrire=this.gotoInscrire.bind(this);
    }
    changeHandler = (event) => {
        this.setState({ [event.target.name]: event.target.value });
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
     gotoProductList() {
        this.props.history.push('/productss')
    }
    componentDidMount(){
       //this.state.isLoginSus=document.getElementById('btnl');
        //if (a) {
            
        //} 
        this.state.email=document.getElementById('email');
    }
     onSubmit(e){
    e.preventDefault();
        let c={email:this.state.email,password:this.state.password}
        ProductService.login(c).then(res=>{
            let cc=res.data;
            if(cc['email']&&cc['password']){
                this.state.isLoginSus=true;
            alert("thank you login Successful");
            this.props.history.push('/products/'+cc['email']);
        }else{
           alert("error you login is not Successful"); 
           this.state.isLoginFail=false;
        }
        });
    }
    addCategory(){
        this.props.history.push('/addcategory');
    }
    openMenuVertical(){
    document.getElementById("menu-verticale").style.width="250px";
     }
   closeMenuVertical(){
    document.getElementById("menu-verticale").style.width="0";
    }
    gotoInscrire(){
        this.props.history.push('/addcustomer');
    }
    render() {
        return (
            <div className="container-fluid">
            <p>
                {this.state.isLoginFail?<img src={img1} style={{ width: '60px',height:'60px',cursor:'pointer'}}/>:""}
            </p>
                <div className='menu-hori'>
                    <ul>
                        <li><a> <i className="fa fa-user"></i>Acceuil</a></li>
                        <li><a>Contact</a></li>
                        <li><a>About</a></li>
                    </ul>
                    <p>Vous pouvez nous retrouver sur nos plateforme digitales</p>
                </div>
                <div className="sectionmvt">
                    <div className="forms">
                    <form>
                    <h1>Login</h1>
                        <label>Email:</label>
                        <div className="email">
                       <i className="fa fa-envelope"></i><input type="text" className="form-control" name="email" id="email" placeholder='Enter the Email' onChange={this.changeHandler} />
                    </div>
                    
                        <label>Password:</label>
                        <div className="email">
                       <i className="fa fa-lock"></i> <input type="password" className="form-control" name="password" placeholder='Enter the Password' onChange={this.changeHandler} />
                    </div>
                    <div className="form-group">
                        <button id="btnl" class="btn btn-success" onClick={(e)=>this.onSubmit(e)}>Login</button>
                    </div>
                     <div className="form-group">
                         <button id="btnl" class="btn btn-success" onClick={()=>this.gotoInscrire()}>S'inscrire</button>
                    </div>
                    </form>
                   </div>
                   <div className="divider">
                     <span></span>
                   </div>
                    <div className="card-image">
                        <img src={poster22} className="image"/>
                    </div>
                </div>
                <div className="description">
                    <p>Bonjour</p>
                </div>
                <div className='footer'> 
                  <p>facebook </p>
                  <p>wathshap </p>
                </div>
            </div>
        )
    }
}
export default LoginComponent
