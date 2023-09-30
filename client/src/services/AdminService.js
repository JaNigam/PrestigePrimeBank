import axios from "axios";
import AdminLoginService from "./AdminLoginService";

const CUSTOMERS_REST_API_URL = 'http://localhost:8083/ppb/customer/accounts';
// const CUSTOMERS_USERS_REST_API_URL='http://localhost:8083/ppb/customer/accounts/{accId}';
const ACCOUNTS_REST_API_URL = 'http://localhost:8083/ppb/admin';

//service class to manage REST API
class AdminService {

    static getCustomers() {
        
        try {
            return axios.get(CUSTOMERS_REST_API_URL);
        }
        catch (error) {
            console.error('Fetch error', error);
        }
    }
    static createProduct(customer) {
        return axios.post(CUSTOMERS_REST_API_URL, customer);
    }
    static getCustomerById(custId) {
        
        console.log("UPDATE CUSTOMER CUSTID",custId);
        return axios.get(CUSTOMERS_REST_API_URL + '/' + custId);
    }
    static updateCustomer(customer, custId) {
        console.log("UPDATE CUSTOMER", customer);
        const aid=AdminLoginService.getLoggedInUserName();
        console.log("aid: ",aid);
        return axios.put(ACCOUNTS_REST_API_URL + '/'+aid + '/accounts/' + custId, customer);
    }
    static deleteCustomer(custId) {
        return axios.delete(CUSTOMERS_REST_API_URL + '/' + custId);
    }
    static validateCustomer(customer, userId) {
        console.log("VALIDATE CUSTOMER", userId);

        console.log("PARSED VALUE", customer);
        const aid=AdminLoginService.getLoggedInUserName();
        console.log("aid: ",aid);
        return axios.put(ACCOUNTS_REST_API_URL + '/'+aid+'/validate-customer', customer);
    }

    static addMoneyCustomer(customer, custId) {
        console.log("ADDMONEY CUSTOMER", customer);
        customer = parseFloat(customer.balance);
        console.log("PARSED VALUE", customer);
        const aid=AdminLoginService.getLoggedInUserName();
        console.log("aid: ",aid);
        return axios.put(ACCOUNTS_REST_API_URL+'/'+aid+'/addmoney/'+custId, customer, {
            headers: {
                'Content-Type': 'application/json', // Set the Content-Type to indicate JSON data
            },
        });

    }
}
export default AdminService;
