'use strict';

const utils = require('../utils/writer.js');
const Teams = require('../service/TeamsService');

// GET avec les liens HATEOAS
module.exports.getTeams = async function getTeams(req, res, next) {
  try {
    // Appel au service pour récupérer les équipes
    const response = await Teams.getTeams();

    // Si aucune équipe n'est trouvée, renvoyer une réponse vide ou un message
    if (response.length === 0) {
      return utils.writeJson(res, { message: "Aucune équipe trouvée" }, 404);
    }

    // Ajouter des liens HATEOAS à chaque équipe
    const teamsWithLinks = response.map(team => {
      // Construire les liens pour chaque équipe
      const links = {
        self: {
          href: `/teams/${team.id}`,
        },
        players: {
          href: `/teams/${team.id}/players`,
        }
      };

      // Retourner l'équipe avec les liens
      return { ...team, links };
    });

    // Renvoyer la réponse avec les liens HATEOAS
    utils.writeJson(res, teamsWithLinks, 200);  // Code HTTP 200 pour une requête réussie
  } catch (error) {
    console.error(error);
    utils.writeJson(res, { message: "Erreur lors de la récupération des équipes." }, 500);  // Erreur serveur
  }
};
