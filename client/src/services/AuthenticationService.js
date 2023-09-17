import axios from 'axios'

//This service class interacts with rest api - spring boot
class AuthenticationService {
    static async login(dealer) {
        try {
            const response = await axios.post('http://localhost:8085/ims/api/loginDealer', dealer);
            if (response.data === true) {
                return true;
            }
            else {
                return false;
            }
        }
        catch (error) {
            console.error('Login Error:', error);
        }
    }

    static async registerDealer(dealer) {
        try {
            const response = await axios.post('http://localhost:8085/ims/api/register', dealer);
            return response.data;
        }
        catch (error) {
            console.error('Registration Error:', error);
        }
    }
}
export default AuthenticationService