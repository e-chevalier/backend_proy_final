import { ContenedorMemory } from "../../utils/containers/ContenedorMemory.js"

class CartsDaoMemory extends ContenedorMemory {

    constructor(storage = []){
        super()
        this.storage = storage
    }


}

export default CartsDaoMemory