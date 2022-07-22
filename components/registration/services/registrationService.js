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
            // { "username": "Hulk", "password": "123456", "email": "hulk@gmail.com", "firstname": "Bruce", "lastname": "Banner", "address": "La Florida 22", "phone": "+54935123412", "age": "1954-02-12" }
            let template = `<table border="1"><tr>`;
            Object.keys(req.body).forEach( key => template += `<td>${key[0].toUpperCase() + key.substring(1).toLowerCase()}</td>`);
            template += `</tr><tr>`;
            Object.values(req.body).forEach( value => template += `<td>${value}</td>`);
            template += `</tr></table>`;

            sendMail('Nuevo Ingreso', template)
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