import logger from '../../../utils/logger/winston_config.js';
import { logoutService } from '../services/logoutService.js'

class Logout {

    async getLogout(req, res, next) {
        try {
            let response = await logoutService.getLogout(req)
            res.json(response)   
        } catch (error) {
            logger.error(error);
        }
    }

}

export let logoutController = new Logout()
