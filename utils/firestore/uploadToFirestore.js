import { dataProducts as products } from '../../config/mockups_data.js'
import { db_firestore } from './firestore.js'
import logger from '../logger/winston_config.js'


const uploadToFirestore = () => {

    const db_collectionProducts = db_firestore.collection('products')

    products.forEach( prod => db_collectionProducts
        .add(prod)
        .then(data => logger.info(data.id))
        .catch(err => logger.error(err))
        .finally()
    )

}

export default uploadToFirestore