import logger from "../../../utils/logger/winston_config.js"
import jwt from 'jsonwebtoken'

const PRIVATE_KEY = process.env.PRIVATE_KEY

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
            const token = jwt.sign({ data: req.user }, PRIVATE_KEY, { expiresIn: '24h' });

            let response = {status: 'OK', data: req.user, jwt: token}

            return response

        } catch (error) {
            logger.error(error);
        }

    }

}

export let loginService = new Login()