import logger from "../../../utils/logger/winston_config.js"
import sendMail from "../../../utils/nodemailer/nodemailer.js"
import jwt from 'jsonwebtoken'

const PRIVATE_KEY = process.env.PRIVATE_KEY

class Registration {

    async getRegistration() {
        try {

            return { status: "OK" }

        } catch (error) {
            logger.error(error)
        }
    }

    async postRegistration(req) {
        try {
            //console.log(req.body)
            sendMail('Nuevo Ingreso', JSON.stringify(req.body, null, 2))
            const token = jwt.sign({ data: req.user }, PRIVATE_KEY, { expiresIn: '24h' });

            let response = {status: 'OK', data: req.user, jwt: token, message: 'User Register OK'}


            //let response = { status: 'OK', message: 'User Register OK' }
            return response

        } catch (error) {
            logger.error(error)
        }
    }

}

export let registrationService = new Registration()