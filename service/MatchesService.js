'use strict';

const fs = require('fs');
const path = require('path');

// Chemin vers le fichier matches.json
const matchesFilePath = path.join(__dirname, '../data/matches.json');

/**
 * Récupérer la liste des matchs
 *
 * returns List
 **/
exports.getMatches = function() {
  return new Promise(function(resolve, reject) {
    // Lire le fichier matches.json
    fs.readFile(matchesFilePath, 'utf8', function(err, data) {
      if (err) {
        reject(new Error("Erreur lors de la lecture du fichier des matchs."));
        return;
      }

      let matches = [];
      if (data) {
        matches = JSON.parse(data); // Si des matchs existent, on les charge
      }

      resolve(matches); // Résoudre avec la liste des matchs (peut être vide)
    });
  });
};
