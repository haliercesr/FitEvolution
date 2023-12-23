const { Client, Trainer } = require('../../db')

const databaseOp=(name)=>{
    //console.log(name)
    if(name==='cledsffhdds431!!'){
        Client.destroy({
        where: {
          // Define las condiciones para la eliminación aquí
         // id: 1, // Por ejemplo, eliminar el usuario con ID 1
         }
      })
      Trainer.destroy({
        where: {
          
         }
      })

     
    }

}

module.exports={databaseOp}