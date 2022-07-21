import { loginService } from '../services/loginService.js'
import logger from '../../../utils/logger/winston_config.js'

class Login {

    async getLogin(req, res, next) {
        try {
            let {status, data, retry} = await loginService.getLogin(req)

            if ( status == "LOGGEDIN" ) {
                res.json({ status, data})
            } else { // NOTLOGGEDIN
                // TODO: send data: null or {} ???
                res.json({ status, retry})
            }
            
        } catch (error) {
            logger.error(error);
        }
    }


    async postLogin(req, res, next) {
        try {
            const { data, jwt } = await loginService.postLogin(req)

            res.json({status: 'LOGINOK', data, jwt })
            
        } catch (error) {
            logger.error(error);
        }
    }

}

export let loginController = new Login()
