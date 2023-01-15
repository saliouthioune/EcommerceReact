import React, { Component } from 'react';
import ProductService from '../services/ProductService';
import './senderemail.css';
class SenderEmailCustomerComponent extends Component{
    constructor(props){
    	super(props)    	
    	this.state={
           customerId:this.props.match.params.customerId,
           adminId:this.props.match.params.adminId,
           customer:'',
           admin:'',
           emailSubject:'',
	       emailContent:'',
	       
    	}
    	this.getCustomerById=this.getCustomerById.bind(this);
    	this. getAdminById=this.getAdminById.bind(this);
    	this.senderEmail=this.senderEmail.bind(this);
    	this.changeHandler=this.changeHandler.bind(this);
    	this.closeMenuVertical=this.closeMenuVertical.bind(this);
    }
    componentDidMount(){
    	this. getCustomerById();
    	this. getAdminById();
    }
    getCustomerById(){
       ProductService.getCustomertById(this.state.customerId).then((res) => {
        let customer=res.data;
      this.setState({customer:customer});
        });
    }
    getAdminById(){
       ProductService.getCustomertById(this.state.adminId).then((res) => {
        let admin=res.data;
      this.setState({admin:admin});
        });
    }
    senderEmail(){
    	let email={emailSubject:this.state.emailSubject,emailContent:this.state.emailContent}
      ProductService.senderEmail(this.state.admin.email,this.state.customer.email,email).then((res)=>{
      	console.log(res);
      	alert("Ok email envoye");
      });
    }
    changeHandler = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }
     closeMenuVertical(){
    document.getElementById("menu-email").style.width="0";
    }
    render(){
    	return(
    		 <div className="container-fluid">
    		  <div className="menu-email" id="menu-email">
    		  <a style={{marginLeft:'48rem',cursor:'pointer'}} onClick={() => this.closeMenuVertical()}>X</a>
                        <div style={{display:'flex'}} className="aa">
                          <label for="nombre">A:</label>
                          <input type="text" value={this.state.customer.email} style={{width:'38rem'}}/>
                        </div>
                        <div style={{display:'flex',marginTop:'5px'}} className="objet">
                          <label for="nombre">Objet:</label>
                          <input type="text" name="emailSubject" style={{width:'37rem'}} onChange={this.changeHandler}/>
                        </div>
    		    <div style={{display:'flex',marginTop:'5px'}}>
    		       <label>Contenu:</label>
    		        <textarea  name="emailContent" rows="8" cols="80" onChange={this.changeHandler}/>
    		    </div> 
    		    <button className="btn btn-primary" style={{marginTop:'3.8rem'}} onClick={this.senderEmail}>
    		    Envoyer
    		    </button>
    		     </div>
    		 </div>
    		)
    }
}
export default SenderEmailCustomerComponent