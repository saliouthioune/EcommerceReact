import React, { Component } from 'react'
import ProductService from '../services/ProductService'
import { Button } from 'reactstrap';
import './ProductList.css';
class CustomerListComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            customers: []

        }
        this.getAllCustomer();
        this.gotoAddCustomer=this.gotoAddCustomer.bind(this);
        this.deleteCustomer=this.deleteCustomer.bind(this);
        this.editCustomer=this.editCustomer.bind(this);
    }
    getAllCustomer() {
        ProductService.getAllCustomer().then((res) => {
            this.setState({ customers: res.data });
        });
    }
    gotoAddCustomer() {
        this.props.history.push('/addcustomer')
    }
    deleteCustomer(customerId){
        if(window.confirm('Are you sure to detele product?')){
            ProductService.deleteCustomer(customerId).then(res=>{
                console.log(res);
                this.getAllCustomer();
               })
        }
       
    }
    editCustomer(customerId) {
        this.props.history.push('/editcustomer/' +customerId)
    }
    render() {
        return (
            <div className="container-fluid">
                <div className='menu-hori'>
                    <ul>
                        <li><a>Acceuil</a></li>
                        <li><a>Contact</a></li>
                        <li><a>About</a></li>
                    </ul>
                    <p>Vous pouvez nous retrouver sur nos plateforme digitales</p>
                </div>
                <div className="sectionmvt">
                    <div className="tab">
                        <h2 className="text-center">Products List</h2>
                        <button className="btn btn-danger" style={{ width: '100px' }} onClick={()=>this.gotoAddCustomer()}> Add Customer</button>
                        <br></br>
                        <table className="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th> Customer Id</th>
                                    <th> Customer FirstName</th>
                                    <th> Customer LastName</th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.customers.map(
                                        customer =>
                                            <tr key={customer.customerId}>
                                                <td> {customer.customerId} </td>
                                                <td> {customer.firstname} </td>
                                                <td> {customer.lastname}</td>
                                                <td>
                                                    <Button className="btn btn-info" onClick={()=>this.editCustomer(customer.customerId)}>Update </Button >
                                                    <button style={{ marginLeft: "10px" }}  className="btn btn-danger" onClick={()=>this.deleteCustomer(customer.customerId)}>Delete </button>
                                                </td>
                                            </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="card-text">
                        <p>Bonjour</p>
                        <p>Les Etudaints</p>
                    </div>
                </div>
                <div className='footer'> 
                <p>facebook </p>
                <p>wathshap </p>
                </div>
            </div>
        )
    }
}
export default CustomerListComponent