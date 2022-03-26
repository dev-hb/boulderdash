import { Field } from './assets/js/field.js';
import {Map} from './assets/js/map.js';
import {Player} from './assets/js/player.js';


class BoulderDash {
    // nouvelle partie avec un niveau
    constructor(level){
        // objets globales
        this.field = new Field('field');
        this.map = new Map(this.field, level);
        this.player = new Player(this.field, this.map, "player", 0, 0);

        // initialiser le jeu
        this.initGame();
    }

    initGame(){
        // charger le joueur
        this.player.loadEvents();
    }
}

// Créer une partie avec le premier niveau 
let game = new BoulderDash(1);