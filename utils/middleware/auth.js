//import logger from "../logger/winston_config.js";

const auth = (req, res, next) => {

    // logger.warn(req.session)
    // logger.warn(req.cookies)

    if( req.isAuthenticated()) {
        return next()
    } else {
        return res.redirect('/api/failure?status_code=401');
    }

}

export default auth