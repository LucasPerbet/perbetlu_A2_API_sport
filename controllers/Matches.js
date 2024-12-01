'use strict';

var utils = require('../utils/writer.js');
var Matches = require('../service/MatchesService');

// GET
module.exports.getMatches = function getMatches(req, res, next) {
  // Récupérer les matchs
  Matches.getMatches()
    .then(function(response) {
      // Si aucune compétition n'est trouvée, renvoyer une réponse vide ou un message
      if (response.length === 0) {
        return utils.writeJson(res, { message: "Aucun match trouvé" }, 404);
      }

      // Ajouter des liens HATEOAS à chaque match
      const matchesWithLinks = response.map(match => {
        // Construire les liens pour chaque match
        const links = {
          self: {
            href: `/matches/${match.id}`,
          },
          competition: {
            href: `/competitions/${match.competitionId}`,
          },
          team1: {
            href: `/teams/${match.team1Id}`,
          },
          team2: {
            href: `/teams/${match.team2Id}`,
          }
        };

        // Retourner le match avec les liens
        return { ...match, links };
      });

      // Renvoyer la réponse avec les liens HATEOAS
      utils.writeJson(res, matchesWithLinks, 200);
    })
    .catch(function(error) {
      // Si une erreur survient, retourner un statut 500 avec le message d'erreur
      utils.writeJson(res, { message: "Erreur lors de la récupération des matchs : " + error.message }, 500);
    });
};

