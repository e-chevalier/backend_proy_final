import logger from "../../../utils/logger/winston_config.js"

class Uploadfile {

    async postUploadfile(req) {
        try {

            const file = req.file
            if(!file) {
                const error = new Error('Please upload a File')
                error.httpStatusCode = 400
                return next(error)
            }
            
            return file

        } catch (error) {
            logger.error(error)
        }
    }

}

export let uploadfileService = new Uploadfile()