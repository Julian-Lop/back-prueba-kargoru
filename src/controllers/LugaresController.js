const {Lugares} = require('../db.js')


exports.getAllLocations = async (req,res) => {
   try {
        const locations = await Lugares.findAll()
        if(locations.length > 0) return res.status(200).json({message:'obtenidos', lugares:locations})
        else return res.status(400).json({message:'no hay lugares'})
    } catch (error) {
        return res.status(500).json({message:error})
   }
}