import React, { Component } from 'react'
import ProductService from '../services/ProductService'
import './addProduct.css'
class AddCategoryComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: ''
        }
        this.changeHandler = this.changeHandler.bind(this);
        this.addCategory = this.addCategory.bind(this);
    }
    addCategory() {
        let cat = { name: this.state.name };
        ProductService.createCategory(cat).then(res => {
            console.log(res);
            alert("Category added successful");
        });

    }
    changeHandler = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }
    render() {
        return (
            <div className="container-fluid">
              <div className="row menu">
                <ul>
                  <li><a>Acceuil</a></li>
                  <li><a>Contact</a></li>
                  <li><a>About</a></li>
                </ul>
               </div>
            <div className="row">
                <div className="forms">
                   <form>
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" className="form-control" name="name" placeholder='Enter the Name' onChange={this.changeHandler} />
                    </div>
                    <div className="form-group btn">
                        <button class="btn btn-success" onClick={this.addCategory}>Save</button>
                    </div>
                </form>
                </div>
                <div className="container-text">
                   <p>Bonjour</p>
                </div>
            </div>
            </div>
           
        )
    }
}
export default AddCategoryComponent