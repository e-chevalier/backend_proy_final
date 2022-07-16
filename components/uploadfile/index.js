import express from 'express'
import { uploadfileController } from './controllers/uploadfileController.js'
import { serverMulter } from '../../utils/multer/serverMulter.js'


export const uploadfileApi = (app) => {

    let upload = serverMulter(app)
    
    let router = express.Router()
    app.use('/api/uploadfile', router)

    router.post('/', upload.single('myFile'), uploadfileController.postUploadfile)

}
