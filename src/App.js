import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ProductComponent from './components/ProductComponent';
import AddProductComponent from './components/AddProductComponent';
import UpdateProductComponent from './components/UpdateProductComponent';
import CustomerListComponent from './components/CustomerListComponent';
import AddCustomerComponent from './components/AddCustomerComponent';
import UpdateCustomerComponent from './components/UpdateCustomerComponent';
import AddCommandeComponent from './components/AddCommandeComponent';
import HeaderComponent from './components/HeaderComponent';
import LoginComponent from './components/LoginComponent';
import AddCategoryComponent from './components/AddCategoryComponent';
import TrackOrderComponent from './components/TrackOrderComponent';
import ListCommandeComponent from './components/ListCommandeComponent';
import AdminComponent from './components/AdminComponent';
import SenderEmailCustomerComponent from './components/SenderEmailCustomerComponent';
function App() {
  return (
    <div>
      <Router>
        <div className="container-fluid">
          <Switch>
          <Route path="/" exact component={LoginComponent}></Route>
           <Route path="/login" component={LoginComponent}></Route>
            <Route path="/productss" component={ProductComponent}></Route>
            <Route path="/products/:email" component={ProductComponent}></Route>
            <Route path="/addproduct"  component={AddProductComponent}></Route>
            <Route path="/editproduct/:productId"  component={UpdateProductComponent}></Route>
            <Route path="/customers"  component={CustomerListComponent}></Route>
            <Route path="/addcustomer"  component={AddCustomerComponent}></Route>
            <Route path="/editcustomer/:customerId"  component={UpdateCustomerComponent}></Route>
            <Route path="/addcommande"  component={AddCommandeComponent}></Route>
             <Route path="/addcategory"  component={AddCategoryComponent}></Route>
            <Route path="/trackorder/:customerId"  component={TrackOrderComponent}></Route>
            <Route path="/orders/:adminId" component={ListCommandeComponent}></Route>
             <Route path="/admin" component={AdminComponent}></Route>
              <Route path="/senderemail/:customerId/:adminId" component={SenderEmailCustomerComponent}></Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}
export default App;
