import { ContenedorMemory } from "../../utils/containers/ContenedorMemory.js"

class MessagesDaoMemory extends ContenedorMemory {

    constructor(storage = []){
        super()
        this.storage = storage
    }


}

export default MessagesDaoMemory