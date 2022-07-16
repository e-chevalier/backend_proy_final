import multer from 'multer'

export const serverMulter = ( app ) => {

    let storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads')
        },
        filename: (req, file, cb) => {
            cb(null, Date.now()+'-'+file.originalname)
        }
    })

    let upload = multer({storage: storage })

    return upload
}