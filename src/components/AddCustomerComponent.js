import React, { Component } from 'react'
import ProductService from '../services/ProductService'
import './addcustomer.css'
import img from '../assets/product1.jpg'
class AddCustomerComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            customerId: '',
            firstname: '',
            lastname: '',
            address: '',
            phone: '',
            password: '',
            bathdate: '',
            sexe: '',
            email: '',
            age: ''

        }

        this.changeHandler = this.changeHandler.bind(this);
        this.addCustomer = this.addCustomer.bind(this);
    }
    addCustomer() {
        let customer = {
            customerId: this.state.customerId, firstname: this.state.firstname, lastname: this.state.lastname, address: this.state.address, phone: this.state.phone,
            email: this.state.email, age: this.state.age, bathdate: this.state.bathdate, password: this.state.password, sexe: this.state.sexe
        };
        ProductService.createCustomer(customer).then(res => {
            console.log(res);
            alert("Ok customer added success");
            this.props.history.push('/login');

        });

    }
    changeHandler = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }
    render() {
        const handleChange = (e) => {
            this.setState({ sexe: e.target.value })
        }
        return (
            <div className="container-fluid"> 
              <div className="content">
                  <div className="customer">
                        <label>FirstName:</label>
                        <div className="iinput">
                         <i className="fa fa-user"></i><input type="text" className="form-control" name="firstname" placeholder='Enter the Name' onChange={this.changeHandler}/>
                        </div>
                            <label>LastName:</label>
                            <div className="iinput">
                            <i className="fa fa-users"></i> <input type="text" className="form-control" name="lastname" placeholder='Enter the Price' onChange={this.changeHandler} />
                        </div>
                        
                            <label>Address:</label>
                            <div className="iinput">
                            <i className="fa fa-plane"></i> <input type="text" className="form-control" name="address" placeholder='Enter the Price' onChange={this.changeHandler} />
                        </div>
                            <label>Email: </label>
                            <div className="iinput">
                            <i className="fa fa-envelope"> </i> <input type="text" className="form-control" name="email" placeholder='Enter the Price' onChange={this.changeHandler} />
                        </div>
                        
                            <label>Password:</label>
                            <div className="iinput">
                             <i className="fa fa-lock"></i><input type="password" className="form-control" name="password" placeholder='Enter the Price' onChange={this.changeHandler} />
                        </div>
                       
                            <label>BathDate:</label>
                            <div className="iinput">
                            <i className="fa fa-calendar"></i> <input type="date" className="form-control" name="bathdate" placeholder='Enter the Price' onChange={this.changeHandler} />
                        </div>
                       
                            <label>Phone:</label>
                            <div className="iinput">
                            <i className="fa fa-phone"></i> <input type="number" className="form-control" name="phone"  placeholder='Enter the Price' onChange={this.changeHandler} />
                        </div>
                        
                            <label>Sexe:</label>
                            <div className="iinput">
                             <i className="fa fa-genderless"></i><select name="sexe" onChange={(e) => handleChange(e)} className="form-control">
                                {this.props.sexes.map(se => <option  value={se}>{se}</option>)}
                            </select>
                        </div>
                      
                            <label>Age:</label>
                            <div className="iinput">
                            <i className="fa fa-bath"></i> <input type="number" className="form-control" name="age" placeholder='Enter the Price' onChange={this.changeHandler} />
                        </div>
                        <div className="btn">
                            <button class="btn btn-success" disabled={!this.state.firstname||!this.state.phone ||!this.state.lastname||!this.state.age||!this.state.sexe||!this.state.bathdate||!this.state.address ||!this.state.email ||!this.state.password} 
                             onClick={this.addCustomer}>Save</button>
                        </div>
                </div>
                  <div className="image">
                       <img src={img} />    
                  </div>
               
              </div>
            </div>
            
        )
    }

}
AddCustomerComponent.defaultProps = {
    sexes: ['M', 'F']
}
export default AddCustomerComponent