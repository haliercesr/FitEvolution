const {databaseOp}=require('../../controllers/databaseOp/databaseOp')

const databaseOpHndler = async (req, res) => {

  const {name} = req.body; // Los datos actualizados se encuentran en el cuerpo de la solicitud
console.log(name)
  try {
         const response=await databaseOp(name)
   
        res.status(200).send("Registros eliminados con éxito.");
  } catch (error) {
    console.log(error.message)
    res.status(404).json({ error: error.message });

  }
};

module.exports = { databaseOpHndler };