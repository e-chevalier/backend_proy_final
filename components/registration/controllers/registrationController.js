import { registrationService } from '../services/registrationService.js'
import logger from '../../../utils/logger/winston_config.js'

class Registration {

    async getRegistration(req, res, next) {
        try {
            await registrationService.getRegistration()
            res.render('registration')

        } catch (error) {
            logger.error(error)
        }

    }

    async postRegistration(req, res, next) {
        try {
            let response = await registrationService.postRegistration(req)

            // res.status(200).redirect('/api/login') 
            res.json(response)

        } catch (error) {
            logger.error(error)
        }

    }

}

export let registrationController = new Registration()
