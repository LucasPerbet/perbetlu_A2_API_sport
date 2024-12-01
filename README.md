# API de Gestion de Sport Collectif

## Spécification du système

Ce projet est un système de gestion des joueurs, des équipes, des compétitions et des matchs dans un contexte de sport collectif. L'application expose une API RESTful pour effectuer des opérations CRUD (Créer, Lire, Mettre à jour, Supprimer) sur les joueurs et des Lectures sur les autres entités.

### Fonctionnalités principales :
- **Gestion des joueurs** : Récupérer la liste des joueurs, récupérer les informations d'un joueur, ajouter un joueur, modifier un joueur et supprimer un joueur.
- **Gestion des équipes** : Récupérer la liste des équipes.
- **Gestion des compétitions** : Récupérer la liste des compétitions.
- **Gestion des matchs** : Récupérer la liste des matchs.
- **HATEOAS** : Les liens HATEOAS sont intégrés pour permettre à l'API de guider l'utilisateur vers les ressources connexes.

## Instructions pour exécuter le serveur

1. **Cloner le projet** :
   ```bash
   git clone https://github.com/LucasPerbet/perbetlu_A2_API_sport
   cd perbetlu_A2_API_sport
   ```

2. **Installer les dépendances** :
   Vous devez avoir Node.js et npm installés sur votre machine. Vous pouvez installer les dépendances avec :
   ```bash
   npm install
   ```

3. **Lancer le serveur** :
   Une fois les dépendances installées, vous pouvez lancer le serveur avec la commande suivante :
   ```bash
   node index.js
   ```
   Le serveur sera accessible sur `http://localhost:8080`.


## Jeu de données utilisés

Le jeu de données utilisé est stocké dans le dossier data/ à la racine du projet dans des fichiers .JSON :

### Joueurs :
Chaque joueur contient un identifiant unique (`id`), un nom (`name`), un âge (`age`) et un numéro d'équipe (`teamId`). 
Les données sont stockées dans le fichier players.json.

Exemple :
```json
[
  {
    "id": 3,
    "name": "Michael Johnson",
    "age": 28,
    "teamId": 2
  },
  {
    "id": 4,
    "name": "Emily Davis",
    "age": 24,
    "teamId": 2
  },
]
```

### Équipes :
Chaque équipe contient un identifiant unique (`id`), un nom (`name`), et une liste de joueurs (`players`) qui sont des membres de l'équipe. Les données sont stockées dans le fichier teams.json.

Exemple :
```json
[
    {
      "id": 1,
      "name": "Équipe A",
      "players": [
        {
          "id": 1,
          "name": "John Doe",
          "age": 25,
          "teamId": 1
        },
        {
          "id": 2,
          "name": "Jane Smith",
          "age": 22,
          "teamId": 1
        }
      ]
    },
    {
      "id": 2,
      "name": "Équipe B",
      "players": [
        {
          "id": 3,
          "name": "Michael Johnson",
          "age": 28,
          "teamId": 2
        },
        {
          "id": 4,
          "name": "Emily Davis",
          "age": 24,
          "teamId": 2
        }
      ]
    },
]
```

### Compétitions :
Chaque compétition contient un identifiant unique (`id`), un nom (`name`), une date (`date`) et un tableau de teams (`teams`) qui participe à la compétition. Les données sont stockées dans le fichier competitions.json.

Exemple :
```json
[
    {
      "id": 2,
      "name": "Champions League 2024",
      "date": "2024-09-15",
      "teams": [
        {
          "id": 1,
          "name": "Équipe A",
          "players": [
            {
              "id": 1,
              "name": "John Doe",
              "age": 25,
              "teamId": 1
            },
            {
              "id": 2,
              "name": "Jane Smith",
              "age": 22,
              "teamId": 1
            }
          ]
        },
        {
          "id": 3,
          "name": "Équipe C",
          "players": [
            {
              "id": 5,
              "name": "David Wilson",
              "age": 30,
              "teamId": 3
            },
            {
              "id": 6,
              "name": "Olivia Brown",
              "age": 23,
              "teamId": 3
            }
          ]
        }
      ]
    }
]
```

### Matchs :
Chaque match contient un identifiant unique (`id`), l'identifiant de la compétition dans laquelel le match s'est déroulé (`competitionId`), l'identifiant des deux équipes qui ont joué le match (`team1Id`, `team2Id`) et le score final (`score`). Les données sont stockées dans le fichier matches.json.

Exemple :
```json
[
    {
      "id": 1,
      "competitionId": 1,
      "team1Id": 1,
      "team2Id": 2,
      "score": "2-1"
    },
    {
      "id": 2,
      "competitionId": 1,
      "team1Id": 3,
      "team2Id": 4,
      "score": "1-1"
    }
]
```

## Méthodologie suivie

### 1. Spécification OpenAPI avant le développement du serveur

La méthodologie **API-first** a été choisie pour ce projet. La spécification OpenAPI a été définie avant le développement du serveur afin de garantir une vision claire de l'API dès le départ et d'utiliser les outils de génération de serveur proposés par Swagger.

#### Pourquoi cette approche ?
- **Clarté des attentes** : Définir l'API en amont permet d'avoir une vision précise des endpoints, des données attendues et des réponses possibles avant de commencer à coder.
- **Développement simplifié** : Grâce à la documentation de l'API ainsi que la génération du squelette par Swagger, le code se résume à quelques modifications de méthodes.
- **Validation** : La spécification OpenAPI permet de valider facilement les endpoints avant même de les implémenter grâce à des outils comme Swagger UI.

Voici la réécriture de la section en prenant en compte l'utilisation du squelette généré par Swagger et les modifications apportées aux méthodes :

---

### 2. Suivi de l'implémentation serveur
Après avoir défini la spécification de l'API avec Swagger, nous avons utilisé le squelette de projet généré automatiquement par Swagger pour démarrer le développement de l'API. Ce squelette fourni les endpoints de base, les modèles de données, et la structure de code initiale, ce qui permet de gagner du temps et d'apporter seulement les modifications nécessaires pour répondre aux attentes du projet.

Ensuite, nous avons modifié les méthodes générées pour les adapter aux fonctionnalités spécifiques du projet, comme l'ajout des liens HATEOAS dans les réponses et l'implémentation des opérations CRUD sur l'entité players (Joueur). Chaque fonctionnalité a été développée et testée individuellement pour garantir que l'API répondait correctement aux attentes.

--- 

### 3. Suivi de l'implémentation du frontend
Afin de tester les différents endpoints de l'API directement dans un frontend, l'outil Swagger-ui est disponible sur http://localhost:8080/docs . L'ensemble de la spécification s'y trouve et il est possible d'y tester les endpoints directement. Cela affichera bien les données présentes dans les fichiers de données JSON.

--- 

## **Contribuer**
- Contributions et suggestions sont les bienvenues.
- Ouvrez une issue ou soumettez une pull request sur le dépôt Git.

---

## **Auteur**
Projet conçu et configuré pour le déploiement Docker par Lucas Perbet pour un projet de BUT3A. Contact : lucas.perbet@etu.univ-grenoble-alpes.fr



