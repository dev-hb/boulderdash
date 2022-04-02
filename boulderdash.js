import Commons from './assets/js/commons.js';
import { Field } from './assets/js/field.js';
import {Map} from './assets/js/map.js';
import {Player} from './assets/js/player.js';
import {LevelBuilder} from './assets/js/levelbuilder.js';


class BoulderDash {
    // nouvelle partie avec un niveau
    constructor(level){
        // objets globales
        this.field = new Field('field');
        this.map = new Map(this.field, level);
        this.player = new Player(this, this.field, this.map, "player");
        this.over = document.getElementById('over');

        // initialiser le jeu
        this.score = 0;
        this.timer = 0;
        this.gems = 0;
        this.initGame();
    }

    initGame(){
        // Load splash screen
        setTimeout(() => {Commons.playSound('main_theme', true);}, 1000);
        // charger le joueur
        this.player.loadEvents();
        // affichier les stats
        this.update();
    }

    update(){
        document.getElementById('stats_gems_count').innerHTML = this.gems;
        if(this.map.currentSettings.gems.length <= 0){
            this.over.style.display = "flex";
        }
    }
}

// Créer une partie avec le premier niveau 
let game = null;

// GERER LES LIENS DE MENU

// permet de créer une nouvelle instance de jeu avec le niveau 1
let startNewGame = () => {
    game = new BoulderDash(1);
    document.getElementById('splashscreen').style.display = "none";
}
// partie terminée
let endGame = () => {
    game = null;
    setTimeout(() => {
        document.getElementById('splashscreen').style.display = "flex";
        document.getElementById('over').style.display = "none";
    }, 1000);
}

// Evenement commencer un nouveau jeu
document.querySelector("#link_startgame").addEventListener('click', startNewGame);
// retour vers la page d'accueil
document.querySelector("#back_to_splash").addEventListener('click', () => {
    document.getElementById('levelselector').style.display = "none";
});
// Page des niveau par défaut
document.querySelector("#link_levels").addEventListener('click', () => {
    document.getElementById('levelselector').style.display = "flex";
});
// Séléctionner un niveau
Array.prototype.slice.call(document.getElementsByClassName("level")).map((level) => {
    level.addEventListener('click', (e) => {
        game = new BoulderDash(parseInt(e.target.id.split('-')[1]));
        document.getElementById('levelselector').style.display = "none";
        document.getElementById('splashscreen').style.display = "none";
    });
});

// Charger un niveau
document.querySelector('#link_levelbuilder').addEventListener('click', () => {
    let builder = new LevelBuilder();
    builder.build();
});

// Pause le jeu
document.querySelector('#link_pause').addEventListener('click', () => {
    document.getElementById('splashscreen').style.display = "flex";
    document.getElementById('link_resume').style.display = "block";
    document.getElementById('link_quit').style.display = "block";
});
// Dépause le jeu
document.querySelector('#link_resume').addEventListener('click', () => {
    document.getElementById('splashscreen').style.display = "none";
    document.getElementById('link_resume').style.display = "none";
    document.getElementById('link_quit').style.display = "none";
});