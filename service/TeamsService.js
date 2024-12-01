'use strict';

const fs = require('fs');
const path = require('path');

// Chemin vers le fichier teams.json et players.json
const teamsFilePath = path.join(__dirname, '../data/teams.json');

// Fonction pour lire un fichier JSON
function readJSONFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
}

/**
 * Récupérer la liste des équipes
 *
 * returns List
 **/
exports.getTeams = async function() {
  try {
    // Lire les équipes depuis le fichier teams.json
    const teams = await readJSONFile(teamsFilePath);
    // Aucune action nécessaire ici, car les joueurs sont déjà associés à l'équipe dans teams.json

    // Retourner les équipes avec les joueurs associés
    return teams;
  } catch (error) {
    throw new Error('Erreur lors de la récupération des équipes : ' + error.message);
  }
};
