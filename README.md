# Projet 5 - Kanap - Construisez un site e-commerce en JavaScript #

### Stack:
 #### Backend: ####
 - Node.JS
 - Express JS 
 #### Frontend: ####
 - HTML
 - CSS
 - JavaScript

### Prérequis pour le backend ###

Vous aurez besoin de Node et `npm` installés localement sur votre système.

### Installation du backend ###

Clonez le repo sur votre système.
Ouvrez un terminal de commande dans le dossier `back` du projet, et exécutez `npm install`.

### Mise en route du backend ###

Pour démarrer le serveur Node.JS, dans le dossier `back` du projet, exécutez la commande `node server`.
Le serveur devrait fonctionné sur `localhost` avec le port par défaut `3000`. Si le serveur fonctionne sur un autre port, vous retrouvez le port dans la console au lancement du serveur, exemple: `Listening on port 3001`.

## Scénario

Vous êtes en poste dans une agence de développement web depuis quelques semaines maintenant. Après avoir réalisé avec succès l’intégration de quelques sites web (HTML/CSS), on vous confie une nouvelle mission.

Votre client est Kanap, une marque de canapés qui vend ses produits depuis sa boutique exclusivement. Aujourd’hui, celle-ci souhaiterait avoir une plateforme de e-commerce en plus de sa boutique physique pour vendre ses produits sur Internet.

Dans le cadre de cette mission, vous travaillez avec une équipe constituée de :

 - Corinne, le CTO de l’agence ;
 - Frank, le développeur front-end qui s’est chargé d’intégrer la maquette statique du site ;
 - Bilal, le développeur back-end qui implémente l’API à laquelle est connecté le front-end.

> Corinne vous envoie un e-mail pour vous briefer sur la mission :
> **De** : Corinne
> **À** : Vous
> **Objet** : Site e-commerce Kanap 
> 
> Hello !
> 
> Comme on en a discuté hier, voici les informations pour que tu puisses démarrer l’implémentation du site de Kanap de manière dynamique. 
> 
> Voici les différentes tâches que tu vas devoir mener à bien :
> 
> 1. Unifier les travaux déjà réalisés par l’équipe en intégrant dynamiquement les éléments de l’API dans les différentes pages web avec JavaScript. Le code du front-end et de l’API est disponible sur ce repo.
> 2. Mettre en place un plan de test d’acceptation à partir de ce template que nous avons pour habitude d’utiliser.
> 3. Pour plus de précisions, voici les spécifications techniques et fonctionnelles du projet. Tu pourras y trouver tous les détails de celui-ci, les attentes pour chaque page du site web et les détails de l’API. 
> 
> N'hésite pas à venir me voir si tu as la moindre question, ma porte est toujours ouverte.
> 
> Bonne journée,
> 
> Corinne

Un peu plus tard, Frank vous envoie un e-mail pour vous apporter quelques précisions complémentaires sur son travail :
> **De** : Frank
> **À** : Vous
> **Objet**: Maquettes statiques du site de Kanap 
> 
> Salut,
> 
> Visiblement c’est le moment pour toi de rejoindre le projet ! Je viens donc te donner quelques informations sur la partie que j’ai pu réaliser, pour t’aider lors de ton développement.

> 4 pages ont été mises en place : page d’accueil, page Produit, page Panier et la page Confirmation. Sur l’ensemble des pages, toutes les parties statiques sont en place, elles sont donc prêtes à recevoir le contenu dynamique.
> 
> Aussi, sur chaque page, un exemple de la partie dynamique est systématiquement donné ; de cette façon, tu n’as pas à t’occuper de la mise en place de la structure HTML ni du style CSS, tout est déjà fait. Tu n’as plus qu’à t’occuper d’intégrer ces éléments dynamiquement grâce à JS et l’API.
> 
> Enfin, dans le code HTML j’ai intégré des “id” dans différentes balises, cela devrait t’aider à intégrer les éléments dynamiques. Avec tout ça, normalement tu n’auras pas besoin de toucher au code HTML/CSS.
> 
> Bon développement !
> 
> Frank

Ça y est, vous avez toutes les informations pour démarrer votre projet. Bon courage !

## Compétences évaluées

1. Créer un plan de test pour une application
2. Gérer des événements JavaScript
3. Interagir avec un web service avec JavaScript
4. Valider des données issues de sources externes