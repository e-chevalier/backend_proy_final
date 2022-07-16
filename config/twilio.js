import 'dotenv/config'

let twilio_config = {
    TWILIO_ACCOUNT_ID : process.env.TWILIO_ACCOUNT_ID,
    TWILIO_TOKEN : process.env.TWILIO_TOKEN,
    MESSAGINGSERVICESID : process.env.MESSAGINGSERVICESID,
    FROMNUMBERWHATSAPP: process.env.FROMNUMBERWHATSAPP,
    TONUMBERWHATSAPP : process.env.TONUMBERWHATSAPP,
    TONUMBERSMS : process.env.TONUMBERSMS
}

export default twilio_config