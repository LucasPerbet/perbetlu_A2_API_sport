'use strict';

const utils = require('../utils/writer.js');
const Teams = require('../service/TeamsService');

// GET
module.exports.getTeams = async function getTeams(req, res, next) {
  try {
    // Appel au service pour récupérer les équipes
    const response = await Teams.getTeams();
    utils.writeJson(res, response, 200);  // Code HTTP 200 pour une requête réussie
  } catch (error) {
    console.error(error);
    utils.writeJson(res, { message: "Erreur lors de la récupération des équipes." }, 500);  // Erreur serveur
  }
};
