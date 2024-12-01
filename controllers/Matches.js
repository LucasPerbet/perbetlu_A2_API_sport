'use strict';

var utils = require('../utils/writer.js');
var Matches = require('../service/MatchesService');

// GET
module.exports.getMatches = function getMatches(req, res, next) {
  // Récupérer les matchs
  Matches.getMatches()
    .then(function(response) {
      // Si la récupération réussit, répondre avec un statut 200 (OK)
      utils.writeJson(res, response, 200);
    })
    .catch(function(error) {
      // Si une erreur survient, retourner un statut 500 avec le message d'erreur
      utils.writeJson(res, { message: "Erreur lors de la récupération des matchs : " + error.message }, 500);
    });
};
