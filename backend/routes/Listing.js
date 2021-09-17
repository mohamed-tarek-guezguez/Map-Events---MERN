const express = require('express')
const router = express.Router()

const {
    getAll,
    createListing,
    updateListing,
    deleteListing,
} = require('../controllers/Listing')

router
    .get('/listings', getAll)
    .post('/listings/create', createListing)
    .put('/listings/update/:id', updateListing)
    .delete('/listings/delete/:id', deleteListing)

module.exports = router