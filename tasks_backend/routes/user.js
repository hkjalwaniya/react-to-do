import userCtrl from '../controllers/user'
import utils from '../utils/utils';

class User {
    constructor(server){
        //Register user
        server.post('/api/users/register', userCtrl.register, userCtrl.sendVerificationEmail);

        //Login user
        server.post('/api/users/login',  userCtrl.login);

        //Logout user
        server.post('/api/users/logout',  userCtrl.logout);

        //Get user profile
        server.get('/api/users/:username', utils.validateToken, userCtrl.getProfile);

        //Verify user email
        server.post('/api/users/verify-email', userCtrl.verifyEmail);
    }
}

export default User;
