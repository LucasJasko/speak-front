# Changelog

All notable changes to this project will be documented in this file.

## 0.1.0 - 2025-03-28

### <!-- 0 -->🚀 Features

- Intégration de la connexion au serveur distant via json sur la page login ([d117e62](d117e6228ec9afa7630f1886457830e53486e08c))
- Ajout d'un loader en tant qu'index du projet ([c666fe9](c666fe91c983a4f79f040786d4951f28dac988bc))
- Ajout de la bibliothèque motion pour la gestion des animation, application sur les boutons de la navbar ([872ba68](872ba682500e950adb0b50942120e64121489a89))
- Création d'un composant message et style de ce composant ([8c49e81](8c49e8110d7ced1b176ca56e8d18a4a68b93a3b2))
- Ébauche de la fenêtre add sur la base de la fenêtre agenda. Style à poursuivre ([0f3f82f](0f3f82f4f41dcd729317ffadd99fb00c7d7c8529))
- Tentative de sécurisation de la page home selon réponse serveur, à retravailler ([25736ed](25736edd9773fd7804ce89efc4cad45b12213d38))
- Création d'une route auth qui contiendra les deux méthodes, login et signin, transition à faire ([b797543](b7975431e6653fa74ccfd5619179a3d2d2555a5c))
- Création du composant signin et utilisation de la librairie motion pour le slide entre les composants ([98ec406](98ec406b66dd532fcedeefae1e3ba87d934f7b8e))
- Application de la même méthode d'affichage pour profil que pour style ([95d3bfa](95d3bfa44bd7b9fa50dbd4f5992a04af6fd8f302))
- Ajout des menu de la fenêtre profil, meilleur gestion des affichages par objet des composants profil et settings ([03d21cf](03d21cfc3ffdaaad2ba6824947b383f09db56ac1))
- Création d'une logique de fetch des messages via un fichier distant ([e5d1417](e5d1417d163de05b5e75626579349fab86e47990))
- Ajout de la structure html des menus settings, premier ébauche à sompléter par la suite ([3e6fba7](3e6fba7851f1ecd6d8b5e81e13c0ada190d2faa0))
- Essaie de requête vers serveur pour l'affichage des résultats utilisateurs dans les direct messages ([9e51609](9e5160974d8105d8d206ee057efba85ede33a42d))
- Ajout des salons avec props dans group ([2a1920e](2a1920ec24ee878c7a96940e5abc555874181666))
- Mise en place d'une drag-bar poour les résultats de recherche d'utilisateur + ajustements des affichages de réponse ([09c4f2b](09c4f2b036832b2a00ef9e620ec25c13bb45bd85))
- Création de deux fichiers test message json distinct et récupération du fichier selon id donné à la zone de message ([cbba28a](cbba28a1cd080f133e3f97ac34243b759db05712))
- Ajout d'une vérification de la taille de l'écran pour afficher les composants mobiles ([69d0d06](69d0d06d51ce211ec9e6c54abec715e02118816b))
- Mise en place de la version mobile des menus profile et settings, création d'un burger menu. ([70cf68d](70cf68d70fd5a00a55af0bada57dc80c7f16507a))
- Ajout de la mise en mémoire de la dernière interface sélectionnée pour le rendu sur les bouttons de la navbar ([97c709a](97c709ad69c554693e87c09c53951c441fe6b9dc))
- Ajout d'une flèche de déroulement des menus fenêtrés en mobile ([b12fe8f](b12fe8fccc03e19af635fa3253d3364b755a4c36))
- Ajout d'un bouton de rétractation de la sidebar pour les menus direct-message et group au format mobile ([a769ea5](a769ea5010d43504f0a19eeefc6bb1c12a3f65b9))

### <!-- 1 -->🐛 Bug Fixes

- Correction des erreurs de routing (problèmes de chemin d'accès) ([b41bbc1](b41bbc18084acab6209bad4b4ea6077983a8ed04))
- Suppression du système de vérification via variables de session serveur pour la page home. Rectification des routes dans le components nav ([e060ad1](e060ad10a2805ed3832dc0c15f0219fca089ab9f))

### <!-- 10 -->💼 Other

- Allègement des composants profile et settings, créations de composants SettingsList et ProfileList pour rendre le code plus lisible ([dd9144a](dd9144a71d6e650b76621818e5076a02cb9af92f))

### <!-- 2 -->🚜 Refactor

- Migration du projet vers une architecture Vite 5 + centralisation des anciennes versions + création d'un nouveau changelog ([ea46b2b](ea46b2b20f840e528f662725b96bed6e92eac670))
- Réagencement des routes et modification de l'arborescence pour simplifier l'accès aux channels + gestion de l'affichage des menus contextuels. ([665dcc8](665dcc8d42751db405ef623f883caf59cea3328f))

### <!-- 5 -->🎨 Styling

- Création des fichiers de style pour chaque composants et pages + association au fichier root app.css ([da65d4d](da65d4d6f38b296c8bf8193d5d78fd789c77566c))
- Mise en page de l'interface login ([b66ca5f](b66ca5ffe60ed33b72c5a57de32b0a3d92bb6e4d))
- Choix d'un loader en ligne ([7933176](7933176b55311fa27e0e69735a3b40774bed2ff5))
- Premier approche sur le style de la homepage + ajout d'une redirection conditionnelle sur la page login ([5edf542](5edf542f1c0fad044c72a8981344fd55d1a6a9c2))
- Travail sur le composant agenda, work in progress ([57f2d29](57f2d29dd8a0abe74bd2f1f696408c06e6564ecd))
- Application et ajustements du style sur le header ([741ac31](741ac31d3399f46443f0ba0d7571db1cfea7961c))
- Ajustement des fichiers, centralisation de certains composants et début du style direct-message ([4cd9d8a](4cd9d8a3b238ff037b0e2114ca4fb8ce51ae9489))
- Création d'un module messageInput et style de la zone de message ([80f69cf](80f69cf7f824ad577334fb9320424822afa44e66))
- Finalisation de l'intégration de la maquette sass d'origine à travers les diférents modules et supression du dossier style temporaire ! ([0ba2461](0ba2461fc2701b1a2226886305bc5589e15aec8d))
- Style du composant add group et rectification de l'arborescence nav qui contenait un boutton dans un boutton ([92eb845](92eb845230e718f3087bedc4bcb9a31c623d0bb3))
- Début du style pour les éléments du profil ([12a18f1](12a18f10633edfdfd58a048a082b973b92a94aea))
- Ajustements du style des menu profil ([f410802](f4108024ab8118e173b3f469152daf8ea7136866))
- Ajustements de style pour les éléments modales ([d6451c8](d6451c88b47df4ccbc6f1ae971e4c087c11da848))
- Travail sur le responsive mobile de l'appli, ajustements de la navbar et des éléments liste de group ([9e72165](9e7216516bdc5ae623668d7917a1db5706e3c380))

<!-- generated by git-cliff -->
