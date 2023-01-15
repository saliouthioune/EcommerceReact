import React, { Component } from 'react'
import ProductService from '../services/ProductService'
import {Card, CardBody, Col, Container, Form, FormGroup, Row } from 'reactstrap'
class UpdateProductComponent extends Component {
    constructor(props){
        super(props)

        this.state = {
            productId: this.props.match.params.productId,
            name: '',
            price: '',
        }

        this.changeHandler = this.changeHandler.bind(this);
        this.updateProduct = this.updateProduct.bind(this);
        
    }
    componentDidMount(){
        ProductService.getProductById(this.state.productId).then( (res)=>{
            let product = res.data;
            this.setState({name: product.name,
                price: product.price   
            });
        });
    }
    updateProduct() {
        let product = {name: this.state.name, price: this.state.price};
        ProductService.updateProduct(product, this.state.productId).then( res=> {
            console.log(res);
            alert("Ok product edit success")
            this.props.history.push('/products');
        });

    }

    changeHandler = (event)=>{
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        return (
            <div>
                <p>{this.state.productId}</p>
                <Container>
                    <Row>
                        <Card>
                            <Col>
                                <h3>Update Product</h3>
                                <CardBody>
                                    <form>
                                        <div className="form-group">
                                            <label>Name:</label>
                                            <input name="name" className='form-control' value={this.state.name} onChange={this.changeHandler}/>
                                        </div>
                                        <div className="form-group">
                                            <label>Price:</label>
                                            <input name="price" className='form-control' value={this.state.price} onChange={this.changeHandler}/>
                                        </div>
                                        <button className="btn btn-success" onClick={this.updateProduct}>Save</button>
                                    </form>
                                </CardBody>
                            </Col>
                        </Card>
                    </Row>
                </Container>
            </div>
        )
    }
}
export default UpdateProductComponent