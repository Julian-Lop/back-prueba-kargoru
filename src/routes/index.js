const {Router} = require('express')
const router = Router()
const {getUserOrCreate} = require('../controllers/UsuariosController')
const {getAllVehicles} = require('../controllers/VehiculosController')
const {getAllLocations} = require('../controllers/LugaresController')
const {createQuote, getQuote, getAllQuotes, editQuote, deleteQuote} = require('../controllers/CotizacionController')

/// users
router.post('/getUserOrCreate', getUserOrCreate)

///vehicles
router.get('/getAllVehicles', getAllVehicles)

///locations
router.get('/getAllLocations', getAllLocations)

//quotes
router.post('/createQuote', createQuote)
router.put('/editQuote', editQuote)
router.delete('/deleteQuote/:id', deleteQuote)
router.get('/getQuote/:id', getQuote)
router.get('/getAllQuotes', getAllQuotes)
module.exports = router