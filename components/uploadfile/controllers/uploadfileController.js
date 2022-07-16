import { uploadfileService } from '../services/uploadfileService.js'
import logger from '../../../utils/logger/winston_config.js'

class Uploadfile {

    async postUploadfile(req, res, next) {
        try {
            let response = await uploadfileService.postUploadfile(req)

            res.json(response)

        } catch (error) {
            logger.error(error)
        }

    }

}

export let uploadfileController = new Uploadfile()
