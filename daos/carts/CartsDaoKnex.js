import { ContenedorKnex } from "../../utils/containers/ContenedorKnex.js"

class CartsDaoKnex extends ContenedorKnex {

    constructor(knex_options){
        super(knex_options, 'carts')
    }

}

export default CartsDaoKnex