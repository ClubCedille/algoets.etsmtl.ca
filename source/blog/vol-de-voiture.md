---
title: Montréal
page-name: "Étude des vols de voitures"
background-image-url: "images/blog/vol/nombre_de_vol_de_vehicule_moteur_par_annee_hua975f8a3d854aa424a332774bd6b821d_25312_1024x0_resize_q75_box.jpg"
facebook-link :
twitter-link :
linkedin-link : https://www.linkedin.com/in/mohamed-ilias/
tags : [ "Données publique", "Montréal", "Vol"]
author : Mohamed Ilias
author-title : Co-Capitaine
author-role : Artisan de la donnée.
author-img : images/team/team-2.png
date : 1 janvier 2024
---

## Étude des vols de voitures à Montréal

[Original](https://ilias.vercel.app/p/%C3%A9tude-des-vols-de-voitures-%C3%A0-montr%C3%A9al/)  
[Substack](https://mohamedilias.substack.com/p/etude-des-vols-de-voitures-a-montreal)

Découvrez les tendances de la criminalité liée aux vols de voitures
à Montréal à travers les années. Cette étude examine les quartiers les plus touchés, les variations saisonnières, et bien plus encore.

Un article dans le journal a particulièrement attiré mon attention de manière
inattendue, révélant une réalité alarmante : le taux de vols de voitures à Montréal
atteignait des sommets déconcertants. Cette révélation m’a laissé perplexe et
intrigué à la fois. Mon esprit curieux a été instantanément piqué, et j’ai ressenti
le besoin impérieux d’explorer ce phénomène de plus près, de le décortiquer et de
comprendre ses origines.g

Dans cet article, je vais vous emmener avec moi dans cette aventure intrigante, alors
que nous plongeons dans l’univers des vols de voitures à Montréal. Nous allons
dévoiler les données, analyser les statistiques et tenter de démystifier cette
réalité complexe. Attachez-vous bien, car nous partons à la découverte de l’envers
du décor de la criminalité automobile à Montréal.

### Récoltes des données

J’ai entrepris la collecte de données en récupérant un fichier CSV exhaustif
contenant toutes les infractions criminelles à Montréal, mis à disposition par la ville. Mon objectif était de cibler spécifiquement les infractions de type “Vol de véhicule à moteur”. À ma grande surprise, j’ai trouvé pas moins de 53 964 cas enregistrés depuis l’année 2018.

<img loading="lazy" src="images/blog/vol/datas_hu3a37a876352c120fad8190baa535589b_102199_1024x0_resize_box_3.png" alt="blog" class="img-fluid rounded">
<sub><sup>Données des vols de véhicules à moteur à Montréal</sup></sub>  

### Le vol en hausse

L’un des constats les plus préoccupants réside dans la tendance constante à la hausse du vol de véhicules, qui semble résolument insensible à tout ralentissement, comme en témoigne ce graphique éloquent :  

<img loading="lazy" src="images/blog/vol/nombre_de_vol_de_vehicule_moteur_par_annee_hua975f8a3d854aa424a332774bd6b821d_25312_1024x0_resize_q75_box.jpg" alt="blog" class="img-fluid rounded">
<sub><sup> Graphique vols de véhicules à moteur par année</sup></sub>  

| Années | Vols de véhicules |
| ------ | ----------------- |
| 2015   | 4418              |
| 2016   | 4352              |
| 2017   | 4732              |
| 2018   | 4237              |
| 2019   | 4170              |
| 2020   | 4706              |
| 2021   | 6440              |
| 2022   | 9377              |
| 2023   | 11262             |

Ces chiffres révèlent une progression alarmante, suscitant des inquiétudes croissantes.

### Opératoire

De manière paradoxale, il s’avère que la majorité des vols de véhicules se produisent en plein jour. En effet, 51% de ces vols ont lieu pendant la journée, lorsque tout semble plus visible et évident. De plus, parmi les jours de la semaine, c’est le mercredi qui détient le triste record du jour où les vols sont les plus fréquents :  

| Journée    | Occurrence |
|------------|------------|
| Wednesday  | 8519       |
| Monday     | 8493       |
| Thursday   | 8334       |
| Tuesday    | 8303       |
| Friday     | 7819       |
| Saturday   | 6160       |
| Sunday     | 6066       |

<img loading="lazy" src="images/blog/vol/nombre_de_vols_de_voitures_par_jour_de_la_semaine_hu050a3e1aa8cc862be541aeb1ab26a8e0_27041_1024x0_resize_q75_box.jpg" alt="blog" class="img-fluid rounded">
<sub><sup> Graphique vols de véhicules par jour de la semaine</sup></sub>  

<img loading="lazy" src="images/blog/vol/_hu6254c031e6b6322a6c9c22760b8f0e7b_41420_0b9835fe76a5905d6537f25e2d31f198.jpg" alt="blog" class="img-fluid rounded">
<sub><sup> Graphique vols de véhicules par jour de la semaine et quart de la journée</sup></sub>  

Cette donnée surprenante met en évidence une réalité intrigante, où les vols de véhicules semblent prospérer en plein jour, défiant ainsi les attentes conventionnelles en matière de criminalité.

### Lieux

Voici une carte thermique (heatmap) des cinq endroits les plus fréquemment ciblés par les voleurs à Montréal. Il est intéressant de noter que les hôtels et les centres commerciaux sont devenus des cibles privilégiées.

<img loading="lazy" src="images/blog/vol/_hu1cded1ad0d3c40c6c28b4c5f3636bd90_61649_5f7300d0170c77a543e527b1d8de27a2.jpg" alt="blog" class="img-fluid rounded">
<sub><sup> Carte thermique des vols de véhicules à Montréal</sup></sub>  

### Un Vol Sophistiqué

Loin sont les jours où un simple trousseau de clés métalliques ou une vitre brisée suffisaient pour voler une voiture. Aujourd’hui, les voleurs ont évolué, devenant plus rusés et équipés de technologies avancées.</p>

#### Relay attack

Ils utilisent un dispositif sophistiqué pour amplifier le signal, pratiquant ce que l’on appelle l’attaque par relais.  

Dans ce type de vol, l’objectif des malfaiteurs est de tromper la voiture en lui faisant croire que la clé se trouve à proximité immédiate du véhicule, même si en réalité, la clé se trouve à plusieurs centaines de mètres de distance. Ils utilisent un amplificateur de signal pour induire en erreur la voiture, lui faisant croire que la clé est à l’intérieur du véhicule.  

Voici une vidéo capturant un vol qui ne dure que quelques secondes.

<img loading="lazy" src="images/blog/vol/S1-thatcham-vol-voiture-technique-du-relais-610114_hub5c0116b95d8273d7a7578c2c04d6e37_169962_1024x0_resize_q75_box.jpg" alt="blog" class="img-fluid rounded">
<sub><sup>Vol Voiture Technique du relai</sup></sub>  

#### PORT OBD

Le Port OBD est le port « On-Board Diagnostics » se trouvant généralement au-dessus de la pédale. C’est une interface de communication pour les systèmes de surveillance et de contrôle des véhicules. Il est également utilisé par les garages pour identifier et résoudre les défauts. Problème : Malheureusement, toute personne ayant accès à celui-ci (par exemple, un garage malveillant, un valet ou des employés de lave-auto) peut abuser du Port OBD pour créer une copie du porte-clés électronique de votre voiture ! Parfois, les voleurs utilisent la méthode du Port OBD en y injectant un code malicieux permettant de changer des configurations pour arrêter le système d’alarme et faire un clonage de la clé.

<img loading="lazy" src="images/blog/vol/odbPort_huf1cce419191bac96c0a5c7bf4c742e6f_381549_1024x0_resize_box_3.png" alt="blog" class="img-fluid rounded">
<sub><sup>Port OBD</sup></sub>  

### Conséquences

L’explosion du nombre de vols de voitures a des conséquences directes sur les propriétaires de véhicules, notamment une augmentation significative du coût de l’assurance automobile. Certaines marques et modèles sont malheureusement devenus les cibles privilégiées des voleurs. Voici le palmarès de 2022 :  

| Nº  | Marque/Modèle          | Année Modèle Volée le Plus Souvent | Nombre de Véhicules Assurés | Nombre de Vols | Fréquence de Vol (%) | Type   |
| --- | ---------------------- | ----------------------------------- | ---------------------------- | --------------- | --------------------- | ------ |
| 1   | Honda CR-V             | 2020                                | 115,895                      | 2,689           | 2.3%                  | SUV    |
| 2   | Acura RDX              | 2020                                | 15,895                       | 653             | 4.1%                  | SUV    |
| 3   | Honda Civic            | 2019                                | 224,688                      | 506             | 0.2%                  | Sedan  |
| 4   | Dodge RAM 1500 Series  | 2020                                | 79,019                       | 504             | 0.6%                  | Truck  |
| 5   | Jeep Wrangler          | 2021                                | 28,048                       | 433             | 1.5%                  | SUV    |
| 6   | Toyota RAV 4           | 2019                                | 124,357                      | 425             | 0.3%                  | SUV    |
| 7   | Jeep Grand Cherokee    | 2021                                | 22,808                       | 420             | 1.8%                  | SUV    |
| 8   | Toyota Highlander      | 2021                                | 17,386                       | 344             | 2.0%                  | SUV    |
| 9   | Ford F150 Series       | 2019                                | 91,166                       | 256             | 0.3%                  | Truck  |
| 10  | Hyundai Tucson         | 2021                                | 63,450                       | 242             | 0.4%                  | SUV    |

### Se protéger

Il est important de noter qu’aucune méthode n’est infaillible, mais l’objectif
principal est de rendre la tâche des voleurs aussi difficile que possible, les décourageant ainsi de s’attaquer à votre véhicule.

#### Verrouillez les portes et fermez complètement les fenêtres

La première étape essentielle pour vous protéger consiste à verrouiller les portes de votre véhicule et à fermer complètement les fenêtres. Ce geste simple peut considérablement ralentir un voleur.

#### Boite de farraday

Pour protéger votre clé électronique (key FOB) contre les attaques par relais, vous	pouvez utiliser une boîte de Faraday. Cette boîte bloque le signal de la clé, empêchant ainsi les voleurs d’amplifier son signal. Cette méthode constitue une défense efficace contre les tentatives d’attaque par relais et est disponible à un prix abordable, généralement autour de 25 $.  

> Amazon: $25 Boite de farraday

### OBD PORT lock

#### Pourquoi sommes-nous exposés ?

Les véhicules équipés de systèmes de démarrage sans clé (“push start”) ou d’entrée sans clé (“keyless entry”) ne disposent pas de clé mécanique pour démarrer le moteur. Ils utilisent des clés électroniques qui s’authentifient avec la voiture via un échange de données (par des signaux radio pour les systèmes sans clé ou par insertion dans le tableau de bord).

#### Comment le port est-il exploité ?

Ces véhicules conservent une copie numérique des clés dans l’unité de contrôle du moteur du véhicule (ECU). Le problème réside dans le fait que ces clés numériques peuvent être téléchargées par quiconque a accès au “PORT OBD” du véhicule, puis utilisées pour programmer une clé vierge en moins de 60 secondes.

#### Pourquoi devrais-je m’inquiéter ?

Cette clé duplicata est identique à l’originale, ce qui donne au voleur un accès total pour OUVRIR, DÉMARRER et EMPORTER le véhicule à sa convenance, souvent des jours, voire des semaines plus tard.  

Pour vous protéger contre ce type d’attaque, vous pouvez envisager de bloquer, modifier ou cacher votre port OBD. Il ne faut que quelques minutes pour rendre ces véhicules inviolables.

<img loading="lazy" src="images/blog/vol/odbPortLock_hu7d456c3806a3beac5a7b74dbff41f2f4_131441_1024x0_resize_box_3.png" alt="blog" class="img-fluid rounded">
<sub><sup>Port OBD Lock</sub></sup>

### Système de Repérage par TAG

Cette technologie implique de placer plusieurs dispositifs sans fil dans des endroits difficiles d’accès du véhicule. Chaque dispositif est autonome et émet un signal avec un code d’identification unique qui peut être lu à distance par un récepteur.  

> Prix: 400$

### Barre Antivol

Une barre antivol simple mais efficace peut ralentir un voleur et le décourager, agissant comme un moyen dissuasif.  

> Amazon: $69 Barre Antivol

### Apple tag

<img loading="lazy" src="images/blog/vol/appleTag_hud2a548186408fc92c5a56156621a921b_71579_1024x0_resize_q75_box.jpg" alt="blog" class="img-fluid rounded">

L’Apple tag est un relayeur de position, le tag émet des signaux anonymes et toute personnes possédant Un apapreil Apple passant proche du tag envoit un signal au serveur de Apple vous permettant ainsi d’avoir une position geographique du dernier repérage. Il suffit de bien le cacher dans son auto.  

Toutefois, il est recommandé de désactiver le haut-parleur à l’intérieur de l’Apple Tag pour éviter que le voleur ne le découvre et ne le désactive. En effet, Apple a mis en place ce système pour prévenir le suivi indésirable des autres utilisateurs. Imaginez la situation où quelqu’un aurait discrètement placé un Apple Tag sur vous, vous permettant ainsi d’être suivi partout consentement.

Dans le contexte des véhicules volés, une fois que le voleur a pris possession de votre voiture et qu’il détecte la présence d’un Apple Tag non associé à son compte Apple, il recevra une notification indiquant que cet Apple Tag le suit. En réaction, il pourrait ouvrir l’application “Find My iPhone” pour tenter de localiser l’Apple Tag.

Pour plus de détails: [vidéo](https://youtu.be/hiivC_4li8Q?t=62)  

> Amazon: $34 Apple Tag
