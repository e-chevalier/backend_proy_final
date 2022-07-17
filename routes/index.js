import logger from '../utils/logger/winston_config.js'
import { carritoApi } from '../components/carrito/index.js'
import { productosApi } from '../components/productos/index.js'
import { loginApi } from '../components/login/index.js'
import { logoutApi } from '../components/logout/index.js'
import { registrationApi } from '../components/registration/index.js'
import { failureApi } from '../components/failure/index.js'
import { uploadfileApi } from '../components/uploadfile/index.js'
import { chatApi } from '../components/chat/index.js'

export const serverRoutes = ( app, passport ) => {

    carritoApi(app)
    productosApi(app)
    chatApi(app)

    loginApi(app, passport)
    logoutApi(app)
    registrationApi(app, passport)
    failureApi(app)
    uploadfileApi(app)

    app.get("/", (req, res, next) => {
        res.send("Todo ok")
    })

    /**
    * Undefined endpoint
    */
    app.all('*', (req, res, next) => {
        logger.warn(`Invalid resource - METHOD: ${req.method} - Resource: ${req.protocol + '://' + req.get('host') + req.originalUrl}`)
        res.json({ error: -2, descripcion: `Ruta ${req.url} método ${req.method} no implementada.` })
    })
    
}