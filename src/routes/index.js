const {Router} = require('express')
const router = Router()
const {getUserOrCreate} = require('../controllers/UsuariosController')
const {getAllVehicles} = require('../controllers/VehiculosController')
const {getAllLocations} = require('../controllers/LugaresController')

/// users
router.post('/getUserOrCreate', getUserOrCreate)

///vehicles
router.get('/getAllVehicles', getAllVehicles)

///locations
router.get('/getAllLocations', getAllLocations)
module.exports = router