import logger from "../logger/winston_config.js"

const loggerMethodAndURLs = (req, res, next) => {
    logger.info(`METHOD: ${req.method} - Resource: ${req.protocol + '://' + req.get('host') + req.originalUrl}`)
    return next()
}

export default loggerMethodAndURLs