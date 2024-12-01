'use strict';

const fs = require('fs');
const path = require('path');

// Charger le fichier JSON en mémoire
let competitionsDB = [];
const competitionsFilePath = path.join(__dirname, '../data/competitions.json'); // Chemin relatif vers le fichier JSON

// Charger les compétitions depuis le fichier JSON lors du démarrage
function loadCompetitions() {
  try {
    const data = fs.readFileSync(competitionsFilePath, 'utf8');
    competitionsDB = JSON.parse(data);
  } catch (err) {
    console.error("Erreur lors du chargement du fichier JSON", err);
  }
}

loadCompetitions();
// Sauvegarder les compétitions en mémoire dans le fichier JSON
function saveCompetitions() {
  try {
    fs.writeFileSync(competitionsFilePath, JSON.stringify(competitionsDB, null, 2), 'utf8');
  } catch (err) {
    console.error("Erreur lors de l'enregistrement du fichier JSON", err);
  }
}
/**
 * Récupérer la liste des compétitions
 *
 * returns List
 **/
exports.getCompetitions = function() {
  return new Promise(function(resolve, reject) {
    resolve(competitionsDB); // Retourne la liste des compétitions en mémoire
  });
};
