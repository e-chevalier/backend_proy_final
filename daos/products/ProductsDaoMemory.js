import { ContenedorMemory } from "../../utils/containers/ContenedorMemory.js"

class ProductsDaoMemory extends ContenedorMemory {

    constructor(storage = []){
        super()
        this.storage = storage
    }


}

export default ProductsDaoMemory