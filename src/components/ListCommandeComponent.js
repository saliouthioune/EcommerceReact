import React, { Component } from 'react'
import ProductService from '../services/ProductService'
class ListCommandeComponent extends Component{
  constructor(props){
  	super(props)
  	this.state={
  		adminId:this.props.match.params.adminId,
       coms:[],
       admin:''
  	}
  	this.getAllOrder();
  	this.updacomstatus=this.updacomstatus.bind(this);
  	this.gotoSenderEmail=this.gotoSenderEmail.bind(this);
  	this.getAdminById=this.getAdminById.bind(this);
}
componentDidMount(){
    this.getAllOrder(); 
    this.getAdminById();
}
gotoSenderEmail(customerId,adminId){
	this.props.history.push('/senderemail/'+customerId+"/"+adminId);
}
getAdminById(){
       ProductService.getCustomertById(this.state.adminId).then((res) => {
        let admin=res.data;
      this.setState({admin:admin});
        });
    }
getAllOrder(){
 ProductService.getAllCommande().then(res=>{
 let order=res.data;
    this.setState({coms:order});
   });
}
updacomstatus(comdId,comstatus){
   ProductService.updateComStatus(comdId,comstatus).subscribe(data=>{
    console.log(data);
   })
}
render(){
  	return(
       <div className="container-fluid">
       {this.state.admin.customerId}
           <table className="table table-striped table-bordered">
           <thead>
             <tr>
                <th>ComdId</th>
                 <th>Product</th>
                <th>Status</th>
                <th>FirstName</th>
                <th>Action</th>
             </tr>
           </thead>
           <tbody>
           {
            this.state.coms.map(com=>
            <tr>
            	<td>{com.comdId}</td>
            	<td>{com.product.name}</td>
            	<td>{com.status}</td>
            	<td>{com.customer.firstname}</td>
            	<td>
            	  <button style={{color:'green'}} onClick={()=>this.updacomstatus(com.comdId,'Accepter')}>Acepter</button>
            	   <button style={{color:'red',marginLeft:'5px'}} onClick={()=>this.updacomstatus(com.comdId,'Rejeter')}>Rejeter</button>
            	   <i style={{marginLeft:'5px'}} className="fa fa-envelope" onClick={()=>this.gotoSenderEmail(com.customer.customerId,this.state.admin.customerId)}></i>
            	</td>
            </tr>
             )
           }
          </tbody>
        </table>
    </div>
  		)
  }
}
export default ListCommandeComponent