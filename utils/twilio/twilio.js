import twilio from 'twilio'
import twilio_config from '../../config/twilio.js'
import logger from '../logger/winston_config.js'

const twilio_account_id = twilio_config.TWILIO_ACCOUNT_ID
const twilio_token = twilio_config.TWILIO_TOKEN
const messagingServiceSid = twilio_config.MESSAGINGSERVICESID
const fromNumberWhatsapp = twilio_config.FROMNUMBERWHATSAPP

/**
 * 
 * @param {*} type 
 * @param {*} toNumber 
 * @param {*} body 
 */
const sendMessage = async (type, toNumber, body) => {

    try {

        const twilioClient = twilio(twilio_account_id, twilio_token);
        let options = {}

        if (type === "sms") {
            options = {
                body: body,
                messagingServiceSid: messagingServiceSid,
                to: toNumber
            }
        } else {
            options = {
                body: body,
                from: fromNumberWhatsapp,
                to: `whatsapp:${toNumber}`
            }
        }


        twilioClient.messages
            .create(options)
            .then(message => logger.info(`SEND ${type} - id: ${message.sid}`))
            .done();

    } catch (error) {
        logger.error(error)
    }

}

export default sendMessage
