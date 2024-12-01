'use strict';

const fs = require('fs');
const path = require('path');

// Charger le fichier JSON en mémoire
let playersDB = [];
const playersFilePath = path.join(__dirname, '../data/players.json');




// Charger les données depuis le fichier JSON lors du démarrage
function loadPlayers() {
  try {
    const data = fs.readFileSync(playersFilePath, 'utf8');
    playersDB = JSON.parse(data);
  } catch (err) {
    console.error("Erreur lors du chargement du fichier JSON", err);
  }
}
loadPlayers();

// Sauvegarder les données en mémoire dans le fichier JSON
function savePlayers() {
  try {
    fs.writeFileSync(playersFilePath, JSON.stringify(playersDB, null, 2), 'utf8');
  } catch (err) {
    console.error("Erreur lors de l'enregistrement du fichier JSON", err);
  }
}

/**
 * Ajouter un nouveau joueur
 *
 * body Player  (optional)
 * returns Player
 **/
exports.addPlayer = function(body) {
  return new Promise(function(resolve, reject) {
    if (!body || !body.name || !body.age || !body.teamId) {
      reject({ message: "Données manquantes ou invalides" });
      return;
    }

    // Générer un ID pour le nouveau joueur (simuler l'auto-incrémentation de l'ID)
    const newPlayer = {
      id: playersDB.length + 1, // ID basé sur le nombre d'éléments dans la "base de données"
      name: body.name,
      age: body.age,
      teamId: body.teamId
    };

    // Ajouter le joueur à la "base de données" en mémoire
    playersDB.push(newPlayer);

    // Sauvegarder les joueurs dans le fichier JSON
    savePlayers();

    resolve(newPlayer); // Renvoie le joueur ajouté
  });
};

/**
 * Supprimer un joueur
 *
 * id Integer L'ID du joueur à supprimer
 * no response value expected for this operation
 **/
exports.deletePlayer = function(id) {
  return new Promise(function(resolve, reject) {
    if (!id) {
      reject({ message: "ID du joueur est requis" });
      return;
    }

    // Recherche du joueur dans la "base de données"
    const index = playersDB.findIndex(player => player.id === id);

    if (index === -1) {
      reject({ message: "Joueur non trouvé" });
      return;
    }

    // Suppression du joueur
    playersDB.splice(index, 1);

    // Sauvegarder les joueurs dans le fichier JSON
    savePlayers();

    resolve(); // Suppression réussie
  });
};

/**
 * Récupérer un joueur par son ID
 *
 * id Integer L'ID du joueur à récupérer
 * returns Player
 **/
exports.getPlayerById = function(id) {
  return new Promise(function(resolve, reject) {
    if (!id) {
      reject({ message: "ID du joueur est requis" });
      return;
    }

    // Recherche du joueur dans la "base de données"
    const player = playersDB.find(player => player.id === id);

    if (!player) {
      reject({ message: "Joueur non trouvé" });
      return;
    }

    resolve(player); // Retourne le joueur trouvé
  });
};

/**
 * Récupérer la liste des joueurs
 *
 * returns List
 **/
exports.getPlayers = function() {
  return new Promise(function(resolve, reject) {
    if (playersDB.length === 0) {
      reject({ message: "Aucun joueur trouvé" });
      return;
    }

    resolve(playersDB); // Retourne la liste des joueurs
  });
};

/**
 * Mettre à jour un joueur
 *
 * body Player  (optional)
 * id Integer L'ID du joueur à mettre à jour
 * no response value expected for this operation
 **/
exports.updatePlayer = function(body, id) {
  return new Promise(function(resolve, reject) {
    if (!id) {
      reject({ message: "ID du joueur est requis" });
      return;
    }

    if (!body || !body.name || !body.age || !body.teamId) {
      reject({ message: "Données manquantes ou invalides" });
      return;
    }

    // Recherche du joueur dans la "base de données"
    const index = playersDB.findIndex(player => player.id === id);

    if (index === -1) {
      reject({ message: "Joueur non trouvé" });
      return;
    }

    // Mise à jour du joueur
    playersDB[index] = { ...playersDB[index], ...body };

    // Sauvegarder les joueurs dans le fichier JSON
    savePlayers();

    resolve(playersDB[index]); // Retourne le joueur mis à jour
  });
};
