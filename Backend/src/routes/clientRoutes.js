const { Router } = require("express");

const postClient = require("../controllers/Clients/postClient");
const postCompleteClientsHndls = require("../handlers/ClientsHndls/postCompleteClientsHndls");

const allClientHndls = require("../handlers/ClientsHndls/getAllClientsHndls");

const putClientBanned =require ("../handlers/ClientsHndls/putClientBannedHndls")

const clientRoutes = Router();

clientRoutes.post("/", postClient);
clientRoutes.post("/:id/complete", postCompleteClientsHndls);

clientRoutes.get("/", allClientHndls);

clientRoutes.put("/:id/banned", putClientBanned)

module.exports = clientRoutes;
