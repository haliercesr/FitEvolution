require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_DATABASE } = process.env;
const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_DATABASE}`,
  { logging: false, native: false }
);
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Trainer, Client, Routine, Exercise, Cart } = sequelize.models;

// Aca vendrian las relaciones
Client.belongsToMany(Trainer, { through: "ClientTrainer" });
Trainer.belongsToMany(Client, { through: "ClientTrainer" });
Routine.belongsToMany(Exercise, { through: "ExerciseRoutine" });
Exercise.belongsToMany(Routine, { through: "ExerciseRoutine" });
Routine.belongsTo(Trainer);

// Nueva relación
Client.hasOne(Cart); // Un cliente tiene un carrito
Cart.belongsTo(Client); // Un carrito pertenece a un cliente
//* un entrenador puede hacer muchas rutinas, L;as rutinas pertenecen a un entrenador

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};





// require("dotenv").config();
// const { Sequelize } = require("sequelize");
// const fs = require("fs");
// const path = require("path");
// const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;
// const sequelize = new Sequelize(
//   `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/fitevolution`,
//   { logging: false, native: false }
// );
// const basename = path.basename(__filename);

// const modelDefiners = [];

// // Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
// fs.readdirSync(path.join(__dirname, "/models"))
//   .filter(
//     (file) =>
//       file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
//   )
//   .forEach((file) => {
//     modelDefiners.push(require(path.join(__dirname, "/models", file)));
//   });

// // Injectamos la conexion (sequelize) a todos los modelos
// modelDefiners.forEach((model) => model(sequelize));
// // Capitalizamos los nombres de los modelos ie: product => Product
// let entries = Object.entries(sequelize.models);
// let capsEntries = entries.map((entry) => [
//   entry[0][0].toUpperCase() + entry[0].slice(1),
//   entry[1],
// ]);
// sequelize.models = Object.fromEntries(capsEntries);

// // En sequelize.models están todos los modelos importados como propiedades
// // Para relacionarlos hacemos un destructuring
// const { Trainer, Client, Routine, Exercise } = sequelize.models;

// // Aca vendrian las relaciones
// // Product.hasMany(Reviews);s
// Client.belongsToMany(Trainer, { through: "ClientTrainer" }); //? many to many. muchos clientes y muchos entrenadores.
// Trainer.belongsToMany(Client, { through: "ClientTrainer" });
// Routine.belongsToMany(Exercise, { through: "ExerciseRoutine" });

// Exercise.belongsToMany(Routine, { through: "ExerciseRoutine" }); //? many to many. muchos clientes y muchos entrenadores.
// //!consultar mati. como relacionar la rutina con la tabla intermedia Client-Trainer

// Routine.belongsTo(Trainer); //* un entrenador puede hacer muchas rutinas, L;as rutinas pertenecen a un entrenador

// module.exports = {
//   ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
//   conn: sequelize, // para importart la conexión { conn } = require('./db.js');
// };
