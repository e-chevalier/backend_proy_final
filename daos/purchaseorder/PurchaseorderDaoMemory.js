import { ContenedorMemory } from "../../utils/containers/ContenedorMemory.js"

class PurchaseorderDaoMemory extends ContenedorMemory {

    constructor(storage = []){
        super()
        this.storage = storage
    }


}

export default PurchaseorderDaoMemory