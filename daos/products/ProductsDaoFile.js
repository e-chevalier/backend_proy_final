import { ContenedorFile } from "../../utils/containers/ContenedorFile.js"

class ProductsDaoFile extends ContenedorFile {

    constructor(){
        super('./DB/productos.json')
    }


}

export default ProductsDaoFile