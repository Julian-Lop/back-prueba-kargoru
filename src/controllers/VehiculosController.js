const {Vehiculos} = require('../db.js')


exports.getAllVehicles = async (req,res) => {
   try {
        const vehicles = await Vehiculos.findAll()
        if(vehicles.length > 0) return res.status(200).json({message:'obtenidos', vehiculos:vehicles})
        else return res.status(400).json({message:'no hay vehiculos'})
    } catch (error) {
        return res.status(500).json({message:error})
   }
}