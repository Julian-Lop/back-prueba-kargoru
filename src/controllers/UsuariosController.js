const {Usuarios} = require('../db.js')


exports.getUserOrCreate = async (req,res) => {
    const {nombre,celular,email} = req.body
   try {
        if(!nombre || !celular || !email) return res.status(400).json({message:'faltan datos'})
        let userExist = await Usuarios.findOne({where:{email:email}})
        if(!userExist){
            const user = await Usuarios.create({
                email:email,
                nombre:nombre,
                celular:celular
            })
            return res.status(201).json({message:"creado", created:true})
        }
        userExist.set({
            email:email,
            nombre:nombre,
            celular:celular
        })
        userExist = await userExist.save()
        return res.status(201).json({message:"creado", created:true})
   } catch (error) {
        res.status(500).json({message:error})
   }
}