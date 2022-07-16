import logger from "../../../utils/logger/winston_config.js"

class Login {

    async getLogin(req) {

        try {
            let response = {}

            const {retry} = req.query

            if (req.isAuthenticated()) {
                logger.info("Usuario logueado")
                response = { status: "LOGGEDIN", data: req.user }
            } else {
                logger.info("Usuario no logueado")
                response = { status: "NOTLOGGEDIN", data: {}, retry: retry }
            }

            return response

        } catch (error) {
            logger.error(error);
        }

    }

    async postLogin(req) {

        try {
            
            let response = {status: 'OK', data: req.user}

            return response

        } catch (error) {
            logger.error(error);
        }

    }

}

export let loginService = new Login()