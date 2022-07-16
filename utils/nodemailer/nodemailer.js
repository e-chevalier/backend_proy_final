import { createTransport } from "nodemailer"
import logger from "../logger/winston_config.js"


const TEST_MAIL_GMAIL = process.env.TEST_MAIL_GMAIL
const TEST_PASS_GMAIL = process.env.TEST_PASS_GMAIL

const transport_gmail_config = {
    service: 'gmail',
    port: 587,
    auth: {
        user: TEST_MAIL_GMAIL,
        pass: TEST_PASS_GMAIL,
    }
}

const transporter = createTransport(transport_gmail_config)



const sendMail = async (subject, message) => {
    try {

        const mailOptions = {
            from: 'Servidor Node.js BackendProyFinal3',
            to: TEST_MAIL_GMAIL,
            subject: subject,
            html: message
        }

        let info = await transporter.sendMail(mailOptions)
        logger.info(info)
        logger.info(`Send email from: ${transport_config.auth.user} to: ${mailOptions.to}.`)

    } catch (error) {
        logger.error(error)
    }
}

export default sendMail

