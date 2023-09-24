import axios from 'axios'

//This service class interacts with rest api - spring boot
class AdminLoginService {
    static async login(customer) {
        try {
            console.log(customer);
            const resp = await axios.post('http://localhost:8083/ppb/admin/login', customer);
            console.log(2)
            console.log("response",resp)
            if (resp.data === true) {
                console.log("true")
                return true;
            }
            else {
                console.log("false")
                return false;
            }
        }
        catch (error) {
            console.error('Login Error:', error);
        }
    }
    
}
export default AdminLoginService