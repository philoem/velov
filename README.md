# Vélo'V
SIte de réservation en ligne de vélos sur la ville de Lyon.

## Comment ça fonctionne ?
Tout est sur une page avec un carroussel défilant avec les instructions pour réserver et en-dessous une carte intéractive localisant les points actualisés en temps réel pour réserver ou rapporter son vélo. 
En sélectionnant un point, un encadré pour gérer la réservation s'ouvre à côté de la carte. 
On retrouve sur cette page unique :
- [ ] un carroussel défilant mais que l'on peut contrôler avec les touches flêchées du clavier gauche et droite.
- [ ] une carte interactive Google map.
- [ ] des données en temps réelles gérant tous les points de la ville.
- [ ] un encadré de réservation avec nom, email (avec regex) et signature.
![](Capture%20d%E2%80%99%C3%A9cran%20du%202023-05-09%2014-49-03.png)


## Technos utilisées
Site écrit en POO avec javaScript ES6 de réservations de vélos à travers les différentes stations dans la ville de Lyon. Dans le cadre de mon avant dernier projet pour valider ma formation rncp 3 developpeur web.
Utilisations des API's GoogleMap et JcDecaux (en temps réel) pour la gestion de la carte de la ville.
Pour la réservation, l'utilisation de l'API Web Storage pour le stockage de réservations limitées par un compte à rebours.
Gestion de l'interface front-end.


