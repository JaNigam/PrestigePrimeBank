import axios from 'axios'
export const ADMIN_USER_NAME_SESSION_ATTRIBUTE_NAME = "authenticatedUser";
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
    static registerSuccessfullLogin(username){
        sessionStorage.setItem(ADMIN_USER_NAME_SESSION_ATTRIBUTE_NAME,username);
        console.log(username);
    }

    static isUserLoggedIn(){
        let user= sessionStorage.getItem(ADMIN_USER_NAME_SESSION_ATTRIBUTE_NAME);
        if(user==null)
            return false;
        return true;
    }

    //SessionStorage is used to store data in browser memory in key/value pairs
    static getLoggedInUserName(){
        let user= sessionStorage.getItem(ADMIN_USER_NAME_SESSION_ATTRIBUTE_NAME);
        if(user==null)
            return '';
        return user;
    }

    static logout(){
        sessionStorage.removeItem(ADMIN_USER_NAME_SESSION_ATTRIBUTE_NAME);
    }
}
export default AdminLoginService