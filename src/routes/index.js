const {Router} = require('express')
const router = Router()
const {getUserOrCreate} = require('../controllers/UsuariosController')
const {getAllVehicles} = require('../controllers/VehiculosController')
const {getAllLocations} = require('../controllers/LugaresController')
const {createQuotation, getQuotation, getAllQuotations, editQuotation, deleteQuotation} = require('../controllers/CotizacionController')

/// users
router.post('/getUserOrCreate', getUserOrCreate)

///vehicles
router.get('/getAllVehicles', getAllVehicles)

///locations
router.get('/getAllLocations', getAllLocations)

//quotes
router.post('/createQuotation', createQuotation)
router.put('/editQuotation', editQuotation)
router.delete('/deleteQuotation/:id', deleteQuotation)
router.get('/getQuotation/:id', getQuotation)
router.get('/getAllQuotations', getAllQuotations)
module.exports = router