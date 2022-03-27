import Commons from './assets/js/commons.js';
import { Field } from './assets/js/field.js';
import {Map} from './assets/js/map.js';
import {Player} from './assets/js/player.js';


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
            this.over.style.display = "block";
        }
    }
}

// Créer une partie avec le premier niveau 
let game = new BoulderDash(1);