import axios from "axios";

const CUSTOMERS_REST_API_URL='http://localhost:8083/ppb/customer/accounts';

//service class to manage REST API
class AdminService{

    static getCustomers(){
        try{
            return axios.get(CUSTOMERS_REST_API_URL);
        }
        catch(error){
            console.error('Fetch error', error);
        }
    }
    // static createCustomer(customer){
    //     return axios.post(CUSTOMERS_REST_API_URL,customer);
    // }
    static getCustomerById(custId){
        return axios.get(CUSTOMERS_REST_API_URL+'/'+custId);
    }
    static updateCustomer(customer, custId){
        return axios.put(CUSTOMERS_REST_API_URL+'/'+custId,customer);
    }
    static deleteCustomer(custId){
        return axios.delete(CUSTOMERS_REST_API_URL+'/'+custId);
    }
    static validateCustomer(customer, custId){
        return axios.put(CUSTOMERS_REST_API_URL+'/'+custId,customer);
    }
}
export default AdminService;
