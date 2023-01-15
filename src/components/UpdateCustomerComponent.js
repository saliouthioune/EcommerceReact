import React, { Component } from 'react'
import ProductService from '../services/ProductService'
import {Card, CardBody, Col, Container, Form,Row } from 'reactstrap'
class UpdateCustomerComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            customerId: this.props.match.params.customerId,
            firstname: '',
            lastname: '',
            address: '',
            phone: '',
            password: '',
            bathdate: '',
            email: '',
            age: '',
            sexe: ''

        }

        this.changeHandler = this.changeHandler.bind(this);
        this.updateCustomer = this.updateCustomer.bind(this);

    }
    componentDidMount() {
        ProductService.getCustomertById(this.state.customerId).then((res) => {
            let customer = res.data;
            this.setState({
                firstname: customer.firstname,
                lastname: customer.lastname,
                address: customer.address,
                phone: customer.phone,
                email: customer.email,
                password: customer.password,
                age: customer.age,
                bathdate: customer.bathdate,
                sexe: customer.sexe

            });
        });;
    }
    updateCustomer() {
        let customer = {
            firstname: this.state.firstname, lastname: this.state.lastname, address: this.state.address, phone: this.state.phone,
            email: this.state.email, sexe: this.state.sexe, age: this.state.age, bathdate: this.state.bathdate, password: this.state.password
        };
        ProductService.updateCustomer(customer, this.state.customerId).then(res => {
            console.log(res);
            alert("Ok product edit success")
        });

    }
    changeHandler = (event)=>{
        this.setState({ [event.target.name]: event.target.value });
    }
    render() {
        return (
            <div>
                
                <Container>

                    <Row>
                        <Card>
                            <Col>
                                <h3>Update Product</h3>
                                <CardBody>
                                    <Form>
                                        <div className="form-group">
                                            <label>FirstName:</label>
                                            <input type="text" className="form-control" name="firstname" value={this.state.firstname} placeholder='Enter the Name' onChange={this.changeHandler} />
                                        </div>
                                        <div className="form-group">
                                            <label>LastName:</label>
                                            <input type="text" className="form-control" name="lastname" value={this.state.lastname} placeholder='Enter the Price' onChange={this.changeHandler} />
                                        </div>
                                        <div className="form-group">
                                            <label>Address:</label>
                                            <input type="text" className="form-control" name="address" value={this.state.address} placeholder='Enter the Price' onChange={this.changeHandler} />
                                        </div>
                                        <div className="form-group">
                                            <label>Email</label>
                                            <input type="text" className="form-control" name="email" value={this.state.email} placeholder='Enter the Price' onChange={this.changeHandler} />
                                        </div>
                                        <div className="form-group">
                                            <label>Password:</label>
                                            <input type="password" className="form-control" name="password" value={this.state.password} placeholder='Enter the Price' onChange={this.changeHandler} />
                                        </div>
                                        <div className="form-group">
                                            <label>Sexe:</label>
                                            <input type="text" className="form-control" name="sexe" value={this.state.sexe} placeholder='Enter the Price' onChange={this.changeHandler} />
                                        </div>
                                        <div className="form-group">
                                            <label>BathDate</label>
                                            <input type="date" className="form-control" name="bathdate" value={this.state.bathdate} placeholder='Enter the Price' onChange={this.changeHandler} />
                                        </div>
                                        <div className="form-group">
                                            <label>Phone:</label>
                                            <input type="number" className="form-control" name="phone" value={this.state.phone} placeholder='Enter the Price' onChange={this.changeHandler} />
                                        </div>
                                        <div className="form-group">
                                            <label>Age:</label>
                                            <input type="number" className="form-control" name="age" value={this.state.age} placeholder='Enter the Price' onChange={this.changeHandler} />
                                        </div>
                                            <button class="btn btn-success" onClick={this.updateCustomer}>Save</button>
                                    </Form>
                                </CardBody>
                            </Col>
                        </Card>
                    </Row>
                </Container>
            </div>
        )
    }

}
export default UpdateCustomerComponent