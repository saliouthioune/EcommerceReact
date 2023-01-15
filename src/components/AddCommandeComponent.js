import React, { Component } from 'react'
import ProductService from '../services/ProductService'
import './addCommande.css'
class AddCommandeComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            com:{
                 quantity: '',
            customer:{
                customerId:null,
            },
            product:{
              productId:null,  
            },
            },   
            customers: [],
            products: [],
            commandes:[]

        }
        this.getAllCommande();
        this.getAllProduct();
        this.getAllCustomer();
        this.changeHandler = this.changeHandler.bind(this);
        this.addCommande = this.addCommande.bind(this);

    }

    addCommande() {
        let com = { quantity: this.state.quantity,customer: this.state.customer.customerId, productId: this.state.productId };
        ProductService.createCommande(this.state.com).then(res => {
            console.log(res);
            alert("Ok Order added success");
            this.props.history.push('/');
        });

    }
      getAllCommande() {
        ProductService.getAllCommande().then((res) => {
            this.setState({ commandes: res.data });
        });
    }
    getAllCustomer() {
        ProductService.getAllCustomer().then((res) => {
            this.setState({ customers: res.data })
        })
    }
    getAllProduct() {
        ProductService.getAllProduct().then((res) => {
            this.setState({ products: res.data })
        })
    }
    changeHandler = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }
    render() {
        return (

            <div className="container-fluid">

                <div className="row">
                    <form>
                        <div className="form-group">
                            <label>Name</label>
                            <input type="number" className="form-control" name="{this.state.com.quantity}" placeholder='Enter the Quantity' onChange={this.changeHandler} />
                        </div>
                        <div className="form-group">
                            <label>Product:</label>
                            <select  name="{this.state.com.product.productId}" onChange={this.changeHandler} className="form-control">
                                {this.state.products.map(p => <option key={p.productId} value={p.productId}>{p.name}</option>)}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Customer:</label>
                            <select name="{this.state.com.customer.customerId}" onChange={this.changeHandler} className="form-control">
                                {this.state.customers.map(c => <option key={c.customerId} value={c.customerId}>{c.firstname}</option>)}
                            </select>
                        </div>
                        <div className="form-group btn">
                            <button class="btn btn-success" onClick={this.addCommande}>Save</button>
                            <button class="btn btn-danger">Cancel</button>
                        </div>
                    </form>
                </div>
                <br/>
                <div>
                   <table className="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th> Product Id</th>
                                     <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.commandes.map(
                                        com =>
                                            <tr key={com.comdId}>
                                                <td> {com.comdId} </td>
                                                <td> {com.status} </td>
                                            </tr>
                                    )
                                }
                            </tbody>
                    </table>
                    </div>
            </div>
        )
    }
}
export default AddCommandeComponent