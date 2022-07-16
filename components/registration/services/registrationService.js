import logger from "../../../utils/logger/winston_config.js"
import sendMail from "../../../utils/nodemailer/nodemailer.js"

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
            let response = { status: 'OK', message: 'User Register OK' }
            return response

        } catch (error) {
            logger.error(error)
        }
    }

}

export let registrationService = new Registration()