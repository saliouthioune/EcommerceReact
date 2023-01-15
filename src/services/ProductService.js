import axios from 'axios';
const EMPLOYEE_API_BASE_URL ="http://localhost:8080/getAllproducts";
class ProductService {
  
    getAllProduct() {
      return axios.get(EMPLOYEE_API_BASE_URL);
      }
      deleteProduct(productId){
        return axios.delete("http://localhost:8080/deleteproduct/"+productId);
    } 
    createProduct(product){
      return axios.post("http://localhost:8080/addproduct",product)
    }
    updateProduct(product,productId){
      return axios.put("http://localhost:8080/editproduct/"+productId,product);
    }
    getProductById(productId)
    {
        return axios.get("http://localhost:8080/getproductById/" +productId);
    }
    getAllCustomer() {
      return axios.get("http://localhost:8080/getallcustomer");
    }
    createCustomer(customer){
        return axios.post("http://localhost:8080/addcustomer",customer)
    }
    getCustomertById(customerId)
    {
        return axios.get("http://localhost:8080/getcustomer/"+customerId);
    }
    deleteCustomer(customerId){
      return axios.delete("http://localhost:8080/deletecustomer/"+customerId);
  } 
  updateCustomer(customer,customerId){
    return axios.put("http://localhost:8080/editcustomer/"+customerId,customer);
  }
  getAllCommande(){
  return axios.get("http://localhost:8080/getallcommande");
}
login(c) {
  return axios.post("http://localhost:8080/login",c);
}
createCategory(cat) {
  return axios.post("http://localhost:8080/addcategory",cat);
}
getAllCategory(){
  return axios.get("http://localhost:8080/getallcategory");
}
upload(data) {
        return axios.post("http://localhost:8080/upload",data);
    }
getCustomerByEmail(email){
   return axios.get("http://localhost:8080/getbyemail/"+email);
}
getCustomerByRoleAndEmail(role,email){
   return axios.get("http://localhost:8080/getby/"+role+"/"+email);
}
createOrder(customerId,productId){
    return axios.post("http://localhost:8080/addorder/"+customerId+"/"+productId,"");
  }
updateComStatus(comdId,comstatus){
    return axios.get("http://localhost:8080/updatecomdsatus/"+comdId+"/"+comstatus);
}
senderEmail(emaila,emailc,email){
    return axios.post("http://localhost:8080/email/"+emaila+"/"+emailc,email);
  }
  getOrderofCustomer(email){
    return axios.get("http://localhost:8080/get/"+email);
  }
  getSumoforder(customerId){
          return axios.get("http://localhost:8080/sum/"+customerId);
  }
}

export default new ProductService();