'use strict';

const utils = require('../utils/writer.js');
const Competitions = require('../service/CompetitionsService');

// GET
module.exports.getCompetitions = async function getCompetitions(req, res, next) {
  try {
    // Appel au service pour récupérer les compétitions
    const response = await Competitions.getCompetitions();

    // Si aucune compétition n'est trouvée, renvoyer une réponse vide ou un message
    if (response.length === 0) {
      return utils.writeJson(res, { message: "Aucune compétition trouvée" }, 404);
    }

    // Ajouter des liens HATEOAS à chaque compétition
    const competitionsWithLinks = response.map(competition => {
      // Construire les liens pour chaque compétition
      const links = {
        self: {
          href: `/competitions/${competition.id}`,
        },
        matches: {
          href: `/competitions/${competition.id}/matches`,
        }
      };

      // Retourner la compétition avec les liens
      return { ...competition, links };
    });

    // Renvoyer la réponse avec les liens HATEOAS
    utils.writeJson(res, competitionsWithLinks, 200);  // Code HTTP 200 pour une requête réussie
  } catch (error) {
    console.error(error);
    utils.writeJson(res, { message: "Erreur lors de la récupération des compétitions." }, 500);  // Erreur serveur
  }
};

