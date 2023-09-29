import axios from "axios";

const CUSTOMERS_REST_API_URL='http://localhost:8083/ppb/customer/';

//service class to manage REST API
class CustomerService{

    static viewTransactions(userId,startDate,endDate){
        try{
            return axios.get(CUSTOMERS_REST_API_URL + 'accounts/' + userId + '/transactions-between-dates?startDate=' + startDate + '&endDate='+ endDate);
        }
        catch(error){
            console.error('Fetch error', error);
        }
    }

    static getAccountById(userId){
        try{
            return axios.get(CUSTOMERS_REST_API_URL + userId);

        }
        catch(error){
            console.error('error fetching customer account details', error);
        }

    }

    static async addBeneficiary(beneficiary,userId) {
        try {

            const resp = await axios.post( CUSTOMERS_REST_API_URL+ 'add-beneficiary/' + userId , beneficiary);
            console.log("response", resp)
            
        }
        catch (error) {
            console.error('Error adding beneficiary: ', error);
        }
    }

    static async transferAmount(transactionDetails) {
        try {

            console.log(transactionDetails);
            const resp = await axios.post( CUSTOMERS_REST_API_URL+ 'transact', transactionDetails );
            console.log("response", resp)
            
        }
        catch (error) {
            console.error('Error transacting: ', error);
        }
    }

    static async updateInfo(userId,customer){
        try{
            return axios.put(CUSTOMERS_REST_API_URL  + userId, customer);
        }
        catch(error)
        {
            console.error("error updating information: ",error);
        }
    }



    
}
export default CustomerService;
