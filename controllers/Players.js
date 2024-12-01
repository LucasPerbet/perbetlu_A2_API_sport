'use strict';

var utils = require('../utils/writer.js');
var Players = require('../service/PlayersService');


// PUT
module.exports.addPlayer = function addPlayer (req, res, next, body) {
  // Validation des données d'entrée
  if (!body || !body.name || !body.age || !body.teamId) {
    return utils.writeJson(res, { message: "Données manquantes ou invalides" }, 400);
  }

  Players.addPlayer(body)
    .then(function (response) {
      utils.writeJson(res, response, 201); 
    })
    .catch(function (error) {
      utils.writeJson(res, { message: error.message || "Erreur serveur" }, 500); // Erreur serveur par défaut
    });
};

// DELETE
module.exports.deletePlayer = function deletePlayer (req, res, next, id) {
  if (!id) {
    return utils.writeJson(res, { message: "ID du joueur est requis" }, 400);
  }

  Players.getPlayerById(id)
    .then(function (response) {
      if (!response) {
        return utils.writeJson(res, { message: "Joueur non trouvé" }, 404);
      }

      // Suppression du joueur
      Players.deletePlayer(id)
        .then(function () {
          utils.writeJson(res, { message: "Joueur supprimé avec succès" }, 200);
        })
        .catch(function (error) {
          utils.writeJson(res, { message: error.message || "Erreur serveur" }, 500);
        });
    })
    .catch(function (error) {
      utils.writeJson(res, { message: error.message || "Erreur serveur" }, 500);
    });
};

// GET ID avec liens HATEOAS
module.exports.getPlayerById = function getPlayerById (req, res, next, id) {
  if (!id) {
    return utils.writeJson(res, { message: "ID du joueur est requis" }, 400);
  }

  Players.getPlayerById(id)
    .then(function (response) {
      if (!response) {
        return utils.writeJson(res, { message: "Joueur non trouvé" }, 404);
      }

      // Ajouter des liens HATEOAS à la réponse
      response._links = {
        "self": { "href": `/players/${response.id}` },
        "update": { "href": `/players/${response.id}` },
        "delete": { "href": `/players/${response.id}` },
        "team": { "href": `/teams/${response.teamId}` }
      };

      // Retourner la réponse enrichie avec les liens
      utils.writeJson(res, response, 200);
    })
    .catch(function (error) {
      utils.writeJson(res, { message: error.message || "Erreur serveur" }, 500);
    });
};


// GET avec liens HATEOAS
module.exports.getPlayers = function getPlayers (req, res, next) {
  Players.getPlayers()
    .then(function (response) {
      if (response.length === 0) {
        return utils.writeJson(res, { message: "Aucun joueur trouvé" }, 404);
      }

      // Ajouter des liens HATEOAS à chaque joueur
      response.forEach(player => {
        player._links = {
          "self": { "href": `/players/${player.id}` },
          "update": { "href": `/players/${player.id}` },
          "delete": { "href": `/players/${player.id}` },
          "team": { "href": `/teams/${player.teamId}` }
        };
      });

      // Retourner la réponse enrichie avec les liens
      utils.writeJson(res, response, 200);
    })
    .catch(function (error) {
      utils.writeJson(res, { message: error.message || "Erreur serveur" }, 500);
    });
};

// POST
module.exports.updatePlayer = function updatePlayer (req, res, next, body, id) {
  if (!id) {
    return utils.writeJson(res, { message: "ID du joueur est requis" }, 400);
  }

  if (!body || !body.name || !body.age || !body.teamId) {
    return utils.writeJson(res, { message: "Données manquantes ou invalides" }, 400);
  }

  Players.getPlayerById(id)
    .then(function (existingPlayer) {
      if (!existingPlayer) {
        return utils.writeJson(res, { message: "Joueur non trouvé" }, 404);
      }

      Players.updatePlayer(body, id)
        .then(function (response) {
          utils.writeJson(res, { message: "Joueur mis à jour avec succès", player: response }, 200);
        })
        .catch(function (error) {
          utils.writeJson(res, { message: error.message || "Erreur serveur" }, 500);
        });
    })
    .catch(function (error) {
      utils.writeJson(res, { message: error.message || "Erreur serveur" }, 500);
    });
};
