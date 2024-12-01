'use strict';

const utils = require('../utils/writer.js');
const Competitions = require('../service/CompetitionsService');

// GET
module.exports.getCompetitions = async function getCompetitions(req, res, next) {
  try {
    // Appel au service pour récupérer les compétitions
    const response = await Competitions.getCompetitions();
    utils.writeJson(res, response, 200);  // Code HTTP 200 pour une requête réussie
  } catch (error) {
    console.error(error);
    utils.writeJson(res, { message: "Erreur lors de la récupération des compétitions." }, 500);  // Erreur serveur
  }
};
