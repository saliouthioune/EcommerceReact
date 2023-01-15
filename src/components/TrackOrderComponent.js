import React, { Component,useEffect } from 'react'
import ProductService from '../services/ProductService'
import './tracOrder.css';
import signature from '../assets/signature.png';
class TrackOrderComponent extends Component{
	constructor(props){
		super(props)
		this.state={
       customerId:this.props.match.params.customerId,
       coms:[],
       customer:'',
       iscommande:false,
       totalprice:'',
       
		}
		this.getCustomerById=this.getCustomerById.bind(this);
    this.getSumoforder=this.getSumoforder.bind(this);
}
	componentDidMount(){
      this.getAllOrder();
      this.getSumoforder();
      this. getCustomerById();  
   }
	getAllOrder(){
		ProductService.getAllCommande().then(res=>{
			let order=res.data;
            this.setState({coms:order});
            this.setState({iscommande:true});
		});
	}
	 getCustomerById() {
       ProductService.getCustomertById(this.state.customerId).then((res) => {
        let customer=res.data;
      this.setState({customer:customer});
        });
    }
    getSumoforder(){
      ProductService.getSumoforder(this.state.customerId).then((res) =>{
        let p=res.data;
        this.setState({totalprice:p});
      })
    }
render(){
	return(
       <div className="container-fluid">
       <div className="customer-info">
         <p>Nom:{this.state.customer.firstname}    Prénom:{this.state.customer.lastname}  DateNaissance:{this.state.customer.bathdate}  Email: {this.state.customer.email}</p>
       </div>
       <br/>
           <table className="table table-striped table-bordered">
           <thead>
             <tr>
                <th>ComdId</th>
                <th>Quantity</th>
                <th>Product Name</th>
                 <th>Product Price</th>
                  <th>Date</th>
                <th>Status</th>
             </tr>  
           </thead>
           <tbody>
           {
            this.state.coms.map(com=>{
            return this.state.iscommande&&this.state.customerId==com.customer.customerId?
            <tr key={com.comdId}>
            	<td>{com.comdId}</td>
              <td>{com.quantity}</td>
              <td>{com.product.name}</td>
              <td>{com.product.price}</td>
              <td>{com.datecomd}</td>
            	<td>{com.status}</td>
            </tr>:null;}
             )}
            <tr>
            <td>Total</td>
             <td></td>
             <td></td>
            <td>{this.state.totalprice} fcfa</td>
            <td></td>
            <td></td>
            </tr>
            </tbody>
             </table>
            <div className="signature">
              <p>Signature</p>
              <img src={signature} style={{ width:'60px',height:'60px'}}/>
            </div>
             </div>
	 )
	}
}
export default TrackOrderComponent