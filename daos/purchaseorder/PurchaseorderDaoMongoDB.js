import { ContenedorMongoDB } from '../../utils/containers/ContenedorMongoDB.js'
import * as modelPurchaseorder from '../../models/purchaseorder.js'

class PurchaseorderDaoMongoDB extends ContenedorMongoDB {

    constructor(){
        super(modelPurchaseorder.purchaseorder)
    }

}

export default PurchaseorderDaoMongoDB