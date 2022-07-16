import express from 'express'
import { config as configAtlas } from './config/mongodbAtlas.js'
import { serverRoutes } from './routes/index.js'
import cookieParser from 'cookie-parser'
import logger from './utils/logger/winston_config.js'
import cors from 'cors'
import loggerMethodAndURLs from './utils/middleware/loggerMethodAndURLs.js'
import cluster from 'cluster'
import compression from 'compression'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import { Server as HttpServer } from 'http'
import { serverPassport } from './utils/passport/passport.js'
import os from 'os'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

// import twilio_config from './config/twilio.js'
// import sendMessage from './utils/twilio/twilio.js'

const app = express()

// Middlewares
app.use(compression())
app.use(cors({
    origin: '*', // Location of react app were connecting to
    credentials: true 
}))

app.use(cookieParser('secreto'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(loggerMethodAndURLs)

app.use('/uploads', express.static('uploads'))


const httpServer = new HttpServer(app)

// CONFIG SESION WITH MONGO STORE
const advanceOptions = { useNewUrlParser: true, useUnifiedTopology: true }

const DB_PASS = configAtlas.db_pass
const DB_DOMAIN = configAtlas.db_domain
const DB_NAME = configAtlas.db_name
const DB_USER = configAtlas.db_user

app.use(session({
    store: MongoStore.create({
        mongoUrl: `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_DOMAIN}/${DB_NAME}?retryWrites=true&w=majority`,
        mongoOptions: advanceOptions
    }),
    secret: 'secreto',
    saveUninitialized: false,
    resave: false,
    rolling: true,
    cookie: {
        maxAge: 600 * 1000,
        sameSite: 'none',
        secure: false
    }
}))


// CONFIG PASSPORTS
const passport = serverPassport(app)

// CONFIG SERVER ROUTERS 
serverRoutes(app, passport)
const numCPUs = os.cpus().length


const argv = yargs(hideBin(process.argv))
    .default({
        modo: 'FORK',
        puerto: process.env.PORT || 8080
    })
    .alias({
        m: 'modo',
        p: 'puerto'
    })
    .argv

const PORT = argv.puerto

logger.info(`Valor de entorno NODE_ENV: ${process.env.NODE_ENV}`);

if (argv.modo.toUpperCase() == 'CLUSTER') {

    if (cluster.isPrimary) {
        logger.info(`Master Cluster PID ${process.pid} is running.`)

        // FORK WORKER
        for (let i = 0; i < numCPUs; i++) {
            cluster.fork()
        }

        cluster.on('exit', (worker, code, signal) => {
            logger.warn(`worker ${worker.process.pid} died.`)
            cluster.fork()
        })

    } else {

        const server = httpServer.listen(PORT, (err) => {
            if (err) {
                logger.error("Error while starting server")
            } else {
                logger.info(
                    `
                    ------------------------------------------------------------
                    WORKER ${server.address().port}  Process Pid: ${process.pid}
                    Open link to http://localhost:${server.address().port}     
                    -------------------------------------------------------------
                    `
                )
            }
        })

        server.on('error', error => logger.error(`Error en servidorProcess Pid: ${process.pid}: ${error}`))
    }

} else {

    const server = httpServer.listen(PORT, (err) => {
        if (err) {
            logger.error("Error while starting server")
        } else {
            logger.info(
                `
                ------------------------------------------------------------
                Servidor http escuchando en el puerto ${server.address().port}
                Open link to http://localhost:${server.address().port}      
                -------------------------------------------------------------
                `
            )
        }
    })

    server.on('error', error => logger.error(`Error en servidor ${error}`))




    // const toNumberWhatsapp = twilio_config.TONUMBERWHATSAPP
    // const toNumberSMS = twilio_config.TONUMBERSMS
    // let bodyWhatsapp = 'Your appointment is coming up on July 21 at 3PM'
    // let bodySms = 'Su pedido ha sido recibido y se encuentra en preparacion.'


    // sendMessage('sms', toNumberSMS, bodySms)
    // sendMessage('whatsapp', toNumberWhatsapp, bodyWhatsapp)


}


